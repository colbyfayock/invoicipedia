'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers'
import { auth } from '@clerk/nextjs/server';
import { and, eq, isNull } from 'drizzle-orm';
import Stripe from 'stripe';

import { Invoices, Customers, Status } from '@/db/schema';
import { db } from '@/db';

const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY));

/**
 * createInvoice
 */

export async function createInvoice(formData: FormData) {
  const { userId, orgId } = auth()
  
  if ( !userId ) throw new Error('User not found');

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const description = formData.get('description') as string;
  const value = Math.floor(parseFloat(formData.get('value') as string) * 100);

  // Create a customer

  const customer = await db.insert(Customers)
    .values({
      name,
      email,
      user_id: userId,
      organization_id: orgId || null,
    }).returning({
      id: Customers.id
    });

  // Create invoice

  const results = await db.insert(Invoices)
    .values({
      user_id: userId,
      organization_id: orgId || null,
      customer_id: customer[0].id,
      description,
      status: 'open',
      value,
    }).returning({
      id: Invoices.id
    });

  redirect(`/invoices/${results[0].id}`);
}

/**
 * updateStatus
 */

export async function updateStatus(formData: FormData) {
  const { userId, orgId } = auth()
  
  if ( !userId ) throw new Error('User not found');

  const id = formData.get('id') as string;
  const status = formData.get('status') as Status;

  if ( orgId ) {
    await db.update(Invoices)
      .set({ status })
      .where(
        and(
          eq(Invoices.id, parseInt(id)),
          eq(Invoices.organization_id, orgId)
        )
      )
      .returning({
        id: Invoices.id,
        value: Invoices.value,
        status: Invoices.status,
      }); 
  } else {
    await db.update(Invoices)
      .set({ status })
      .where(
        and(
          eq(Invoices.id, parseInt(id)),
          eq(Invoices.user_id, userId),
          isNull(Invoices.organization_id)
        )
      )
      .returning({
        id: Invoices.id,
        value: Invoices.value,
        status: Invoices.status,
      }); 
  }

  revalidatePath(`/invoices/[invoiceId]`, 'page');
}


/**
 * deleteInvoice
 */

export async function deleteInvoice(formData: FormData) {
  const { userId, orgId } = auth()
  
  if ( !userId ) throw new Error('User not found');

  const id = formData.get('id') as string;

  if ( orgId ) {
    await db.delete(Invoices)
      .where(
        and(
          eq(Invoices.id, parseInt(id)),
          eq(Invoices.organization_id, orgId)
        )
      );
  } else {
    await db.delete(Invoices)
      .where(
        and(
          eq(Invoices.id, parseInt(id)),
          eq(Invoices.user_id, userId),
          isNull(Invoices.organization_id)
        )
      );
  }

  redirect('/dashboard');
}

/**
 * createPayment
 */

export async function createPayment(formData: FormData) {
  const headersList = headers();
  const origin = headersList.get('origin');
  const id = formData.get('id') as string;

  const [invoice] = await db.select({
      status: Invoices.status,
      value: Invoices.value,
    })
    .from(Invoices)
    .where(eq(Invoices.id, parseInt(id)))
    .limit(1);

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product: 'prod_IAs6jglR9ZFeCR',
          unit_amount_decimal: String(invoice.value)
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${origin}/invoices/${id}/payment?success=true`,
    cancel_url: `${origin}/invoices/${id}/payment?canceled=true`,
  });

  if ( typeof session.url !== 'string' ) {
    throw new Error('Invalid session URL.');
  }

  const statusFormData = new FormData();

  statusFormData.append('id', id)
  statusFormData.append('status', 'paid')

  await updateStatus(statusFormData);

  redirect(session.url);
}
