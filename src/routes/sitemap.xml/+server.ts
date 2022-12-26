import client from "$lib/client";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ request }) => {
  const url = new URL(request.url);
  let urls = [
    {
      loc: url.origin,
      lastmod: "2022-07-09",
      priority: 1.0,
      changefreq: "monthly"
    },
    {
      loc: url.origin + "/about",
      lastmod: "2022-07-09",
      priority: 0.8,
      changefreq: "monthly"
    },
    {
      loc: url.origin + "/articles",
      lastmod: "2022-07-09",
      priority: 0.8,
      changefreq: "monthly"
    }
  ];

  const articles = await client(request.url).get<null>().catch(console.error);
  if (articles) {
    for (let article of articles.contents) {
      const date = new Date(article.updatedAt);
      urls.push({
        loc: url.origin + "/articles/" + article.id,
        lastmod: [
          date.getFullYear(),
          date.getMonth().toString().padStart(2, "0"),
          date.getDay().toString().padStart(2, "0")
        ].join("-"),
        priority: 0.6,
        changefreq: "Monthly"
      });
    }
  }

  let child = "";
  for (let url of urls) {
    let u = "";
    for (let [k, v] of Object.entries(url)) {
      u += `<${k}>${v}</${k}>`;
    }
    child += `<url>${u}</url>`;
  }

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${child}</urlset>`,
    {
      status: 200,
      headers: {
        "Content-type": "application/xml"
      }
    }
  );
};
