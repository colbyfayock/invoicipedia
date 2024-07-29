'use client';

import { Input } from '@/components/ui/Input';
import * as Clerk from '@clerk/elements/common';
import * as SignIn from '@clerk/elements/sign-in';

export default function SignInPage() {
  return (
    <div className="grid w-full h-full flex-grow items-center justify-center px-4 sm:justify-center -mt-10">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="w-full flex-grow space-y-6 rounded-2xl border border-zinc-200 px-4 py-8 ring-1 ring-inset ring-white/5 sm:w-96 sm:px-8"
        >
          <header className="text-center">
            <h1 className="text-xl font-medium tracking-tight">Sign in to Invoicipedia</h1>
          </header>
          <Clerk.GlobalError className="block text-sm text-red-400" />
          <div className="space-y-2">
            <Clerk.Connection
              name="google"
              className="flex w-full items-center justify-center gap-x-3 rounded-md bg-blue-500 text-white px-3.5 py-1.5 text-sm font-medium shadow-[0_1px_0_0_theme(colors.white/5%)_inset,0_0_0_1px_theme(colors.white/2%)_inset] outline-none hover:bg-gradient-to-b hover:from-white/5 hover:to-white/5 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-white active:bg-gradient-to-b active:from-black/20 active:to-black/20 active:text-white/70"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 16" className="w-4" aria-hidden>
                <path
                  fill="currentColor"
                  d="M8.82 7.28v2.187h5.227c-.16 1.226-.57 2.124-1.192 2.755-.764.765-1.955 1.6-4.035 1.6-3.218 0-5.733-2.595-5.733-5.813 0-3.218 2.515-5.814 5.733-5.814 1.733 0 3.005.685 3.938 1.565l1.538-1.538C12.998.96 11.256 0 8.82 0 4.41 0 .705 3.591.705 8s3.706 8 8.115 8c2.382 0 4.178-.782 5.582-2.24 1.44-1.44 1.893-3.475 1.893-5.111 0-.507-.035-.978-.115-1.369H8.82Z"
                />
              </svg>
              Login with Google
            </Clerk.Connection>
          </div>
          
          <p className="text-center text-neutral-400">
            or
          </p>

          <Clerk.Field name="identifier">
            <Clerk.Label className="sr-only">Email</Clerk.Label>
            <Clerk.Input
              type="email"
              required
              placeholder="Email"
              className="w-full border-b border-neutral-200 bg-white pb-2 text-sm/6 text-neutral-950 outline-none placeholder:text-neutral-400 hover:border-neutral-300 focus:border-neutral-600 data-[invalid]:border-red-600 data-[invalid]:text-red-600"
              asChild
            >
              <Input />
            </Clerk.Input>
            <Clerk.FieldError className="mt-2 block text-xs text-red-600" />
          </Clerk.Field>

          <p className="text-center text-sm text-neutral-600">
            <SignIn.Passkey className="font-semibold">Continue with Passkey</SignIn.Passkey>
          </p>
          
          <p className="text-center text-xs text-neutral-400 pt-2">
            No account?{' '}
            <a
              href="/sign-up"
              className="font-medium decoration-black/20 underline-offset-4 outline-none hover:underline focus-visible:underline"
            >
              Create an account
            </a>
          </p>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
}