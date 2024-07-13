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

  const pythonAPI = import.meta.env.PYTHON_API + "/enhance-voice/";
  const formData = new FormData();
  formData.append("sound", sound);

  const response = await fetch(pythonAPI, {
    method: "POST",
    body: formData,
  });

  const enhancedSound = await response.blob();

  console.log(enhancedSound);

  if (!enhancedSound) {
    return new Response(
      JSON.stringify({ message: "Sound enhancement failed!" })
    );
  }

  const enhancedWriter = fs.createWriteStream(`./converted/${id}.wav`);
  const enhancedReader = enhancedSound.stream().getReader();

  const enhancedWrite = async () => {
    const { done, value } = await enhancedReader.read();
    if (done) {
      enhancedWriter.end();
      return;
    }

    enhancedWriter.write(value);
    enhancedWrite();
  };

  enhancedWrite();

  return new Response(JSON.stringify({ message: "Sound uploaded!", id: id }));
};
