import type { APIRoute } from "astro";
import { v4 as uuidv4 } from "uuid";

import fs from "fs";

export const POST: APIRoute = async ({ request }) => {
  const body = await request.formData();

  const sound = body.get("sound") as File;

  if (!sound) {
    return new Response(JSON.stringify({ message: "No sound uploaded!" }));
  }

  const id = uuidv4();

  const reader = sound?.stream().getReader();
  const writer = fs.createWriteStream(`./sound/${id}.wav`);

  console.log(`Uploading ${sound?.name}...`);

  const write = async () => {
    const { done, value } = await reader.read();
    if (done) {
      writer.end();
      return;
    }

    writer.write(value);
    write();
  };

  write();

  return new Response(JSON.stringify({ message: "Sound uploaded!", id: id }));
};
