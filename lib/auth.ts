import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
    throw new Error("Missing required environment variable: DATABASE_URL");
}

if (!process.env.BETTER_AUTH_SECRET) {
    throw new Error("Missing required environment variable: BETTER_AUTH_SECRET");
}

export const auth = betterAuth({
    database: new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    }),
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL || "https://manishtamang.com",
    trustedOrigins: ["https://manishtamang.com", "http://localhost:3000"],
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    plugins: [
        admin({
            adminEmails: [process.env.ADMIN_EMAIL || "maneshtamang833@gmail.com"]
        })
    ]
});
