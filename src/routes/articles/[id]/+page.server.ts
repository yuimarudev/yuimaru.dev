import client from "$lib/client";

export async function load({ params }: { params: Record<string, string> }): Promise<Object> {
  const article = await client
    .get({
      contentId: params.id
    })
    .catch((e) => e.message);

  if (article.content)
    return {
      article
    };

  return {
    status: 400
  };
}
