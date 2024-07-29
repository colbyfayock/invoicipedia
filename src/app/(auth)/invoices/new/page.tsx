"use client";

import Link from 'next/link';
import { SyntheticEvent, startTransition, useState } from 'react';

import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';
import Container from '@/components/Container';
import SubmitButton from '@/components/SubmitButton';

import { createInvoice } from '@/app/actions';

export default function InvoiceNew() {
  const [state, setState] = useState('ready');

  // https://github.com/facebook/react/pull/29019
  
  function handleOnSubmit(event: SyntheticEvent) {
    event.preventDefault();

    if ( state === 'pending' ) return;

    setState('pending');
      
    startTransition(async () => {
      const target = event.target as HTMLFormElement;
      const formData = new FormData(target);

      await createInvoice(formData);
    });
  }

  return (
    <Container>
      <p className="text-sm font-semibold hover:text-blue-600 mb-2">
        <Link href="/dashboard">Invoices</Link>
      </p>

      <h2 className="flex items-center gap-4 text-3xl font-semibold mb-12">
        Create a New Invoice
      </h2>

      <form
        className="grid gap-4 max-w-xs"
        action={createInvoice}
        onSubmit={handleOnSubmit}
      >
        <div>
          <Label htmlFor="name" className="block mb-2">Billing Name</Label>
          <Input id="name" name="name" type="text" />
        </div>
        <div>
          <Label htmlFor="email" className="block mb-2">Billing Email</Label>
          <Input id="email" name="email" type="email" />
        </div>
        <div>
          <Label htmlFor="value" className="block mb-2">Value</Label>
          <Input id="value" name="value" type="text" />
        </div>
        <div>
          <Label htmlFor="description" className="block mb-2">Description</Label>
          <Textarea id="description" name="description" />
        </div>
        <SubmitButton />
      </form>
    </Container>
  );
}
