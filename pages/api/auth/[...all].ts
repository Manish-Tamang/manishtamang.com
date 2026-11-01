import type { APIRoute } from "astro"
import { auth } from "@/lib/auth"

export const prerender = false

export const ALL: APIRoute = ({ request }) => auth.handler(request)
