import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "https://manishtamang.com",
    plugins: [
        adminClient()
    ]
});

export const { signIn, signOut, useSession } = authClient;
