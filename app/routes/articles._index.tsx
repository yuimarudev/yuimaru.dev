import { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Card } from "~/components/Card";
import { list } from "~/lib/d1.server";
import styles from "~/styles/articles.module.css";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: "yuimaru のブログ" },
    {
      name: "description",
      content: `現在 ${data?.data.length ?? 0} 件の記事があります`,
    },
    {
      property: "og:image",
      content: "/favicon.webp",
    },
    { property: "og:url", content: "https://yuimaru.dev/articles" },
    { property: "og:site_name", content: "yuimaru" },
    { property: "og:title", content: "yuimaru のブログ" },
    { property: "og:type", content: "blog" },
    {
      name: "theme-color",
      content: "#1d9bf0",
    },
  ];
};

export async function loader({ context, request }: LoaderFunctionArgs) {
  return {
    data: await list(context.cloudflare.env.D1),
    bot:
      context.cloudflare.cf.botManagement.verifiedBot ||
      context.cloudflare.cf.botManagement.score < 20 ||
      request.headers.get("User-Agent")?.includes("curl"),
  };
}

export default function Articles() {
  const { data, bot } = useLoaderData<typeof loader>();

  if (typeof document === "undefined" || bot) {
    return (
      <div
        className={styles.ssr}
        dangerouslySetInnerHTML={{
          __html: data.flatMap((x) => ["<div>", x.content, "</div>"]).join(""),
        }}
      />
    );
  }

  return data
    .sort(
      (a, b) =>
        new Date(b.publishedDate).getTime() -
        new Date(a.publishedDate).getTime(),
    )
    .flatMap((x) => {
      const parser = new DOMParser();
      const content = parser.parseFromString(x.content, "text/html");

      return (
        <Card
          key={Math.random().toString(36).slice(2)}
          title={x.title}
          href={`./${x.id}`}
          description={(content.body.textContent ?? "").slice(0, 100)}
          date={new Date(x.publishedDate)}
        />
      );
    });
}
