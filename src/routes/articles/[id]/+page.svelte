<script lang="ts">
  import { Row, Column } from "carbon-components-svelte";
  import { onMount } from "svelte";
  export let data: { article: Article };

  onMount(async () => {
    const shiki = await import("shiki");
    shiki.setCDN("https://unpkg.com/shiki/");

    const langs = [...document.querySelectorAll("pre code")].map((e) => e.innerHTML.split("\n")[0]);
    const highlighter = await shiki.getHighlighter({
      theme: "github-dark",
      // @ts-ignore
      langs
    });

    document.querySelectorAll<HTMLPreElement>("pre code").forEach((e) => {
      const [lang, ...lines] = e.innerText.split("\n");
      const code = lines.join("\n");
      e.innerHTML = highlighter.codeToHtml(code, lang);
    });
  });
</script>

<svelte:head>
  <title>{data.article.title} - yuimaru</title>
  <meta name="description" content="yuimaruのBlog" />
</svelte:head>

<Row>
  <Column>
    <h1>{data.article.title}</h1>
    <p>
      {data.article.publishedAt
        ? new Intl.DateTimeFormat("ja-jp", { dateStyle: "full", timeStyle: "long" }).format(
            new Date(data.article.publishedAt)
          )
        : ""}
    </p>
    <hr />
    <div id="content">
      {@html data.article.content}
    </div>
  </Column>
</Row>
