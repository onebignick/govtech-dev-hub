import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

// add ur protected routes here
const isProtectedRoute = createRouteMatcher([""]);

export default clerkMiddleware((auth, request) => {
    if (isProtectedRoute(request)) auth().protect();
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};