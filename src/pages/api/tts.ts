import type { APIRoute } from "astro";
import fs from "fs";
import uuid from "uuid";
import { default as tts } from "@shofipwk/tiktok-tts";

export const POST: APIRoute = async ({ request }) => {
  const { text } = await request.json();

  const id = uuid.v4();

  tts.config(import.meta.env.TTS_SESSION);

  const response = await tts.save(`./sound/${id}.wav`, text);

  const writer = fs.createWriteStream(`./sound/${id}.wav`);
  const reader = response.body?.getReader();

  if (!reader) {
    return new Response(
      JSON.stringify({ message: "No sound generated!", status: 500 })
    );
  }

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
  // return written wav file
  return new Response(new Blob([fs.readFileSync(`./sound/${id}.wav`)]));
};
