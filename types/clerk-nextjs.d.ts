declare module "@clerk/nextjs/server" {
  import type { NextFetchEvent, NextRequest } from "next/server";
  import type { NextResponse } from "next/server";

  export type MiddlewareHandler = (
    req: NextRequest,
    ev: NextFetchEvent
  ) => Promise<NextResponse> | NextResponse;

  // Minimal shim for clerkMiddleware used in middleware.ts
  export function clerkMiddleware(): MiddlewareHandler;

  // Other server helpers (used in app routes)
  export function auth(): Promise<{ userId?: string | null }> | { userId?: string | null };
  export function currentUser(): Promise<{
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    emailAddresses?: Array<{ emailAddress: string }>;
    [key: string]: any;
  } | null>;

  export default clerkMiddleware;
}

declare module "@clerk/nextjs" {
  // Lightweight client typing to avoid editor errors
  import * as React from "react";

  export const ClerkProvider: React.ComponentType<any>;
  export const SignedIn: React.ComponentType<any>;
  export const ClerkLoaded: React.ComponentType<any>;
  export const SignInButton: React.ComponentType<any>;
  export const UserButton: React.ComponentType<any>;
  export function useUser(): {
    id?: string;
    user?: {
      id?: string;
      firstName?: string;
      lastName?: string;
      emailAddresses?: Array<{ email?: string }>;
      [key: string]: any;
    } | null;
  };

  export function useAuth(): {
    isSignedIn: boolean;
    sessionId?: string;
    userId?: string;
    getToken?: (opts?: { template?: string }) => Promise<string | null>;
    signOut?: () => Promise<void>;
  };
  export default {} as any;
}
