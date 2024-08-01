import { Suspense } from 'react';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { auth, } from '@clerk/nextjs/server';
import { eq, and, isNull, count } from 'drizzle-orm'

import { db } from '@/db';
import { Invoices, Customers } from '@/db/schema';
import { cn } from '@/lib/utils';
import { AVAILABLE_STATUSES } from '@/data/invoices';

import { Badge } from '@/components/ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import Container from '@/components/Container';
import Pagination from '@/components/Pagination';

const INVOICES_PER_PAGE = 5;

export default async function Dashboard({ searchParams }: { searchParams: { page: string | undefined } }) {
  const { page } = searchParams;
  const currentPage = typeof page === 'string' ? parseInt(page) : 1;
  const queryOffset = typeof currentPage === 'number' ? (currentPage - 1 ) * INVOICES_PER_PAGE : 0;

  const { userId, orgId } = auth();

  if ( !userId ) return null;

  let result;

  if ( orgId ) {
    result = await db.select().from(Invoices)
      .innerJoin(Customers, eq(Invoices.customer_id, Customers.id))
      .where(eq(Invoices.organization_id, orgId))
      .limit(INVOICES_PER_PAGE)
      .offset(queryOffset);
  } else {
    result = await db.select().from(Invoices)
      .innerJoin(Customers, eq(Invoices.customer_id, Customers.id))
      .where(
        and(
          eq(Invoices.user_id, userId),
          isNull(Invoices.organization_id)
        )
      )
      .limit(INVOICES_PER_PAGE)
      .offset(queryOffset);
  }

  const invoices = result?.map(({ invoices, customers}) => {
    return {
      ...invoices,
      customer: customers
    }
  });

  return (
    <Container>
      <div className="flex justify-between items-center w-full mb-6">
        <h2 className="text-3xl font-semibold">
          Invoices
        </h2>
        <ul>
          <li>
            <Link href="/invoices/new" className="flex items-center gap-2 text-sm hover:text-blue-500">
              <PlusCircle className="w-4 h-4" />
              Create Invoice
            </Link>
          </li>
        </ul>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="hidden sm:table-cell">Status</TableHead>
            <TableHead className="text-right">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices?.map(invoice => {
            const status = AVAILABLE_STATUSES.find(status => status.id === invoice.status);
            return (
              <TableRow key={invoice.id}>
                <TableCell className="hidden md:table-cell p-0">
                  <Link href={`/invoices/${invoice.id}`} className="block p-4">
                    { new Date(invoice.create_ts).toLocaleDateString() }
                  </Link>
                </TableCell>
                <TableCell className="p-0">
                  <Link href={`/invoices/${invoice.id}`} className="block p-4">
                    <p className="font-medium">
                      { invoice.customer.name }
                    </p>
                  </Link>
                </TableCell>
                <TableCell className="p-0">
                  <Link href={`/invoices/${invoice.id}`} className="block p-4">
                    <p className="text-muted-foreground">
                      { invoice.customer.email }
                    </p>
                  </Link>
                </TableCell>
                <TableCell className="hidden sm:table-cell p-0">
                  <Link href={`/invoices/${invoice.id}`} className="block p-4">
                    <Badge
                      className={cn(
                        "text-xs",
                        status?.id === 'open' && 'bg-blue-600',
                        status?.id === 'paid' && 'bg-green-600',
                        status?.id === 'void' && 'bg-zinc-700',
                        status?.id === 'uncollectible' && 'bg-red-600',
                      )}
                    >
                      { status?.label || 'Unknown' }
                    </Badge>
                  </Link>
                </TableCell>
                <TableCell className="text-right p-0">
                  <Link href={`/invoices/${invoice.id}`} className="block p-4">
                    ${ invoice.value / 100 }
                  </Link>
                </TableCell>
              </TableRow>
            )
          })}
          {invoices && invoices.length % INVOICES_PER_PAGE !== 0 && [...new Array(INVOICES_PER_PAGE - invoices.length)].map((_, index) => {
            return (
              <TableRow key={index} className="border-transparent bg-transparent hover:bg-transparent" aria-hidden>
                <TableCell className="hidden md:table-cell p-0">&nbsp;</TableCell>
                <TableCell className="p-4">&nbsp; </TableCell>
                <TableCell className="p-4">&nbsp;</TableCell>
                <TableCell className="hidden sm:table-cell p-4">
                  <Badge className={"text-xs invisible"}>&nbsp;</Badge>
                </TableCell>
                <TableCell className="text-right p-4">&nbsp;</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      <Suspense fallback={<div className="text-transparent">Loading Pagination</div>}>
        <Pagination
          className="mt-8"
          path="/dashboard"
          itemsPerPage={INVOICES_PER_PAGE}
          currentPage={currentPage}
          getCount={async () => {
            let invoicesCount;

            if ( orgId ) {
              invoicesCount = await db.select({ count: count() })
                .from(Invoices)
                .where(eq(Invoices.organization_id, orgId));
            } else {
              invoicesCount = await db.select({ count: count() })
                .from(Invoices)
                .where(
                  and(
                    eq(Invoices.user_id, userId),
                    isNull(Invoices.organization_id)
                  )
                );
            }

            return invoicesCount[0].count;
          }}
        />
      </Suspense>
    </Container>
  );
}
