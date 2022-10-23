<script lang="ts">
  import client from "$lib/client";
  import { onMount } from "svelte";
  import { Row, Col, Card, CardBody, CardFooter } from "sveltestrap";

  let articles: Article[] = [];

  onMount(async () => {
    articles = (
      await client.get({})
    ).contents;
  });
</script>

<svelte:head>
  <title>yuimaru - Blog</title>
  <meta name="description" content="yuimaruのBlog" />
</svelte:head>

<Row>
  <Col>
    <h1>yuimaruのブログ</h1>
    <hr>
    {#each articles as article}
      <Card color="dark">
        <CardBody><a href={"articles/" + article.id}>{article.title}</a></CardBody>
        <CardFooter>
          {
            new Intl.DateTimeFormat("ja-jp", { dateStyle: "full", timeStyle: "long" })
            .format(new Date(article.publishedAt))
          }
        </CardFooter>
      </Card>
      <hr>
    {/each}
  </Col>
</Row>
