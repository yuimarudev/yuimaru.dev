import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { $object, $string, $union, Infer } from "lizod";
import { getPrisma } from "~/lib/d1.server";

const postValidator = $object({
  id: $string,
  publishedDate: $string,
  content: $string,
  title: $string,
});
const deleteValidator = $object({
  id: $string,
});
const validate = $object({
  type: $string,
  data: $union([postValidator, deleteValidator]),
  password: $string,
});

export async function action({ context, params, request }: ActionFunctionArgs) {
  const req = await request.json<Infer<typeof validate>>();
  const prisma = await getPrisma(context.cloudflare.env.D1);

  if (!validate(req))
    return new Response("fuck you", {
      status: 451,
      statusText: "sinebaka",
    });

  // TODO: いつかこれをどうにかする
  if (req.password !== context.cloudflare.env.UNKO)
    return new Response("fuck you", {
      status: 451,
      statusText: "ahosine",
    });

  if (req.type === "delete") {
    const data: Infer<typeof deleteValidator> = req.data;

    await prisma.archive.delete({ where: { id: data.id } });
  } else if (req.type === "post") {
    const data = req.data as Infer<typeof postValidator>;

    await prisma.archive.upsert({
      create: data,
      update: data,
      where: {
        id: data.id,
      },
    });
  }

  return new Response("fuck you", {
    status: 200,
  });
}
