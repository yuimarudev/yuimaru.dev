import { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { toHtml } from "hast-util-to-html";
import { toHast } from "mdast-util-to-hast";
import { Suspense, useEffect, useState } from "react";
import { remark } from "remark";
import { Highlighter, getHighlighter } from "shiki/bundle/web";
import diff from "shiki/langs/diff.mjs";
import rust from "shiki/langs/rust.mjs";
import { TextWrapper } from "~/components/TextWrapper";
import { article } from "~/lib/d1.server";
import { __throw } from "~/lib/utils";
import styles from "~/styles/articles.module.css";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: `${data?.data.title} - yuimaru のブログ` },
    {
      name: "description",
      content: `${data?.data.content.slice(0, 30)}...`,
    },
    {
      name: "og:image",
      content: `/articles/${data?.data.id}/og.png`,
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "theme-color",
      content: "#1d9bf0",
    },
  ];
};

export async function loader({ context, request, params }: LoaderFunctionArgs) {
  return {
    data:
      (await article(context.cloudflare.env.D1, params.id ?? "none")) ??
      __throw(new Error("article not found")),
    bot:
      context.cloudflare.cf.botManagement.verifiedBot ||
      context.cloudflare.cf.botManagement.score < 20 ||
      request.headers.get("User-Agent")?.includes("curl"),
  };
}

export default function Article() {
  const { data, bot } = useLoaderData<typeof loader>();

  if (typeof document === "undefined" || bot) {
    return (
      <div
        className={styles.ssr}
        dangerouslySetInnerHTML={{
          __html: data.content,
        }}
      />
    );
  }

  const article = remark().parse(data.content);
  const elements: JSX.Element[] = [];

  for (const child of article.children) {
    switch (child.type) {
      case "text":
        if (!child.value.trim()) continue;

        elements.push(
          <p>
            <TextWrapper>{child.value}</TextWrapper>
          </p>,
        );
        break;

      case "code":
        elements.push(
          <div className={styles.code}>
            <Suspense fallback={<p> (...Loading) </p>}>
              <CodeBlock lang={child.lang}>{child.value}</CodeBlock>
            </Suspense>
          </div>,
        );
        break;

      case "paragraph": {
        const es = [];

        for (const c of child.children) {
          switch (c.type) {
            case "text":
              es.push(<TextWrapper>{c.value}</TextWrapper>);
              break;

            case "link": {
              const parsed = new DOMParser().parseFromString(
                toHtml(toHast(c)),
                "text/html",
              );

              if (!parsed.textContent) {
                es.push(
                  <span
                    dangerouslySetInnerHTML={{ __html: toHtml(toHast(c)) }}
                  />,
                );
                break;
              }

              es.push(
                <a href={c.url}>
                  <TextWrapper>{parsed.body.textContent ?? ""}</TextWrapper>
                </a>,
              );
              break;
            }

            default:
              es.push(
                <div
                  style={{ display: "inline" }}
                  dangerouslySetInnerHTML={{ __html: toHtml(toHast(c)) }}
                />,
              );
              break;
          }
        }

        elements.push(
          <div>
            {es}
            <br />
          </div>,
        );
        break;
      }

      default:
        elements.push(
          <div dangerouslySetInnerHTML={{ __html: toHtml(toHast(child)) }} />,
        );
        break;
    }
  }

  return (
    <div>
      <h1>
        <TextWrapper>{data.title}</TextWrapper>
      </h1>
      <div className={styles.article_wrapper}>
        <time dateTime={data.publishedDate}>
          <TextWrapper>
            {Intl.DateTimeFormat("ja-jp", {
              dateStyle: "long",
              timeStyle: "long",
            }).format(new Date(data.publishedDate))}
          </TextWrapper>
        </time>
        <TextWrapper>yuimaruのブログ</TextWrapper>
      </div>
      <hr />
      <article>{elements}</article>
    </div>
  );
}

let highlighter: Highlighter;

function CodeBlock({
  children,
  lang,
}: { children: string; lang?: string | null }) {
  const [__html, setHtml] = useState("");

  useEffect(() => {
    (async () => {
      if (!highlighter) {
        highlighter = await getHighlighter({
          langs: lang ? [lang === "rust" ? rust : lang, diff] : [diff],
          themes: ["github-dark"],
        });
      }

      if (lang && !highlighter.getLoadedLanguages().includes(lang)) {
        // @ts-ignore
        await highlighter.loadLanguage(lang);
      }

      setHtml(
        highlighter.codeToHtml(children, {
          lang: lang ?? "diff",
          theme: "github-dark",
        }),
      );
    })();
  }, [lang, children]);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html,
      }}
    />
  );
}
