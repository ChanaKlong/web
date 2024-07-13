import type { APIRoute } from "astro";

import fs from "fs";

export const GET: APIRoute = async ({ request }) => {
  const params = new URL(request.url).searchParams;
  const fileId = params.get("id");

  const file = fs.readFileSync(`./sound/${fileId}.wav`);

  return new Response(file);
};
