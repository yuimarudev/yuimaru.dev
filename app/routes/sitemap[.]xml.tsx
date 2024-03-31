import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { list } from "~/lib/d1.server";

export async function loader({ request, context }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const urls = [
    {
      loc: url.origin,
      lastmod: "2024-03-31",
      priority: 1.0,
      changefreq: "monthly",
    },
    {
      loc: `${url.origin}/about`,
      lastmod: "2024-03-31",
      priority: 0.6,
      changefreq: "monthly",
    },
    {
      loc: `${url.origin}/articles`,
      lastmod: "2024-03-31",
      priority: 0.6,
      changefreq: "monthly",
    },
  ];
  const articles = await list(context.cloudflare.env.D1);

  for (const article of articles) {
    const date = new Date(article.publishedDate);

    urls.push({
      loc: `${url.origin}/articles/${article.id}`,
      lastmod: [
        date.getFullYear(),
        date.getMonth().toString().padStart(2, "0"),
        date.getDay().toString().padStart(2, "0"),
      ].join("-"),
      priority: 0.8,
      changefreq: "Monthly",
    });
  }

  let child = "";

  for (const url of urls) {
    let u = "";

    for (const [k, v] of Object.entries(url)) {
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
        "Content-type": "application/xml",
      },
    },
  );
}
