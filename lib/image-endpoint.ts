import type { APIRoute } from "astro"

// Images are all optimised at build time, so this route never has work to do
export const GET: APIRoute = () => new Response("Not found", { status: 404 })
