import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Cant use route groups because they aren't actualy reflected in the route
const isProtected = createRouteMatcher([
  '/dashboard',
  '/invoices/:invoiceId',
  '/invoices/new',
]);

export default clerkMiddleware((auth, request) => {
  if ( isProtected(request) ) {
    auth().protect();
  }
});

export const config = {
  matcher: [ '/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};