import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest, type NextFetchEvent } from "next/server";

function hasClerkKeys() {
  return !!(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
    process.env.CLERK_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_CLERK_FRONTEND_API ||
    process.env.CLERK_FRONTEND_API
  );
}

export default function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (!hasClerkKeys()) {
    // No Clerk keys configured — skip middleware to keep site available.
    // This is safe for a temporary deploy; set env vars in Vercel for full auth.
    // eslint-disable-next-line no-console
    console.warn("Clerk keys missing, skipping clerk middleware");
    return NextResponse.next();
  }

  try {
    const clerk = clerkMiddleware();
    return clerk(req, ev);
  } catch (err) {
    // Avoid failing the whole request on middleware errors
    // eslint-disable-next-line no-console
    console.error("Clerk middleware error:", err);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
