<script>
  import { Row, Col } from "sveltestrap";
  import { onMount } from "svelte";
  import "highlight.js/styles/github-dark.css";

  export /**
   * @type {{article: Article}}
   */
  let data;

  onMount(async () => {
    const shiki = await import("shiki");
    shiki.setCDN("https://unpkg.com/shiki/");
    const highlighter = await shiki.getHighlighter({
      theme: "github-dark"
    });
    [...document.querySelectorAll("pre code")].forEach((e) => {
      const [lang, ...lines] = e.innerHTML.split("\n");
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
  <Col>
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
  </Col>
</Row>
