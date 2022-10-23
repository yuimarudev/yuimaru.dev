import client from "$lib/client";

export async function GET() {
  let urls = [
    {
      loc: "https://yuimaru.dev/",
      lastmod: "2022-07-09",
      priority: 1.0,
      changefreq: "monthly"
    },
    {
      loc: "https://yuimaru.dev/about",
      lastmod: "2022-07-09",
      priority: 0.8,
      changefreq: "monthly"
    },
    {
      loc: "https://yuimaru.dev/articles",
      lastmod: "2022-07-09",
      priority: 0.8,
      changefreq: "monthly"
    }
  ];

  const articles = await client.get<null>().catch(console.error);
  if (articles) {
    for (let article of articles.contents) {
      const date = new Date(article.updatedAt);
      urls.push({
        loc: "https://yuimaru.dev/articles/" + article.id,
        lastmod: [date.getFullYear(), date.getMonth().toString().padStart(2, "0"), date.getDay().toString().padStart(2, "0")].join("-"),
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
}
