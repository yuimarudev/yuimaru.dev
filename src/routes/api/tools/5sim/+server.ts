import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ request }) => {
  return await fetch(
    "https://5sim.net/v1/guest/prices?product=" + new URL(request.url).searchParams.get("product")
  );
};
