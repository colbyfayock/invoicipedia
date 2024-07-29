import Link from 'next/link';
import { UserButton, OrganizationSwitcher } from '@clerk/nextjs';
import { auth, currentUser } from '@clerk/nextjs/server';

import Container from '@/components/Container';

const Header = async () => {
  const user = await currentUser();
  return (
    <header className="mt-8 mb-12">
      <Container className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <p className="font-bold">
            <Link href="/dashboard">
              Invoicipedia
            </Link>
          </p>
          {user && (
            <>
              <span className="text-zinc-300" aria-hidden>/</span>
              <div className="-ml-2 flex align-center">
                {/* Show hidePersonal option */}
                <OrganizationSwitcher afterCreateOrganizationUrl="/dashboard" />
              </div>
            </>
          )}
        </div>
        <div className="h-8 flex items-center gap-4">
          {user && <UserButton />}
        </div>
      </Container>
    </header>
  )
}

export default Header;