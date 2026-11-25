import { ADMIN_EMAIL } from "astro:env/server"

export const adminEmail = (ADMIN_EMAIL ?? "").toLowerCase()
