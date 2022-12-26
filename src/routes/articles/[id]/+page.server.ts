import client from "$lib/client";
import type { Load } from "@sveltejs/kit";

export const load: Load = async ({ params, url }) => {
  const article = await client(url.href)
    .get({
      contentId: params.id
    })
    .catch((e) => e.message);

  if (article.content)
    return {
      article
    };

  return {
    status: 400,
    article
  };
};
