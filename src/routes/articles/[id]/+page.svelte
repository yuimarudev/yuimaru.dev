<script>
  import { Row, Col } from "sveltestrap";
  import { onMount } from "svelte";

  export /**
   * @type {{article: Article}}
   */
  let data;
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
