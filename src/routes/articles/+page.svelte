<script lang="ts">
  import client from "$lib/client";
  import { onMount } from "svelte";
  import { Row, Column, ClickableTile } from "carbon-components-svelte";

  let articles: Article[] = [];

  onMount(async () => {
    articles = (await client(location.href).get({})).contents;
  });
</script>

<svelte:head>
  <title>yuimaru - Blog</title>
  <meta name="description" content="yuimaruのBlog" />
</svelte:head>

<Row>
  <Column>
    <h1>yuimaruのブログ</h1>
    <hr />
    {#each articles as article}
      <ClickableTile href={"articles/" + article.id}>
        <p>{article.title}</p>
        <footer>
          {new Intl.DateTimeFormat("ja-jp", { dateStyle: "full", timeStyle: "long" }).format(
            new Date(article.publishedAt)
          )}
        </footer>
      </ClickableTile>
      <hr />
    {/each}
  </Column>
</Row>
