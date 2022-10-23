import type { RequestHandler } from "@sveltejs/kit";
import { nanoid } from "nanoid";

const request: RequestHandler = async ({ request, platform }) => {
  const badRequest = new Response("false", { status: 400 });
  switch (request.method) {
    case "GET":
      let object = await platform.env.filer.get(new URL(request.url).searchParams.get("id") ?? "");
      return object
        ? new Response(
            JSON.stringify({
              data: btoa(arrayBufferToBinaryString(await object.arrayBuffer())),
              type: object.httpMetadata?.contentType
            })
          )
        : badRequest;
    case "PUT":
      if (parseInt(request.headers.get("Content-Length") ?? (5e8).toString()) > 5e7)
        return badRequest;
      const id = nanoid(8) + request.headers.get("X-Content-Name")?.match(/\..+/);
      const res = await platform.env.filer.put(id, request.body, {
        httpMetadata: { contentType: request.headers.get("Content-Type") || "image/png" }
      });
      return new Response(res.key);
  }
  return new Response();
};

export const GET = request;
export const POST = request;

function arrayBufferToBinaryString(arrayBuffer: ArrayBuffer) {
  let binaryString = "";
  const bytes = new Uint8Array(arrayBuffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binaryString += String.fromCharCode(bytes[i]);
  }
  return binaryString;
}
