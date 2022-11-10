<script>
  import { Row, Col } from "sveltestrap";
  import { onMount } from "svelte";
  import "highlight.js/styles/github-dark.css";

  export /**
   * @type {{article: Article}}
   */
  let data;

  onMount(async () => {
    const hljs = (await import("highlight.js")).default;
    hljs.highlightAll();
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
