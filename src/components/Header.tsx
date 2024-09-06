import Link from 'next/link';
import { UserButton, OrganizationSwitcher, SignedIn } from '@clerk/nextjs';

import Container from '@/components/Container';

const Header = async () => {
  return (
    <header className="mt-8 mb-12">
      <Container className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <p className="font-bold">
            <Link href="/dashboard">
              Invoicipedia
            </Link>
          </p>
          <SignedIn>
            <span className="text-zinc-300" aria-hidden>/</span>
            <div className="-ml-2 flex align-center">
              {/* Show hidePersonal option */}
              <OrganizationSwitcher afterCreateOrganizationUrl="/dashboard" />
            </div>
          </SignedIn>
        </div>
        <div className="h-8 flex items-center gap-4">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Container>
    </header>
  )
}

export default Header;