<script lang="ts">
  import client from "$lib/client";
  import Card from "$lib/component/Card.svelte";
  import { onMount } from "svelte";

  const formatter = new Intl.DateTimeFormat("ja-jp", { dateStyle: "full", timeStyle: "long" });
  let articles: Article[] = [];

  onMount(async () => {
    articles = (await client(location.href).get({})).contents;
  });
</script>

<svelte:head>
  <title>yuimaru - Blog</title>
  <meta name="description" content="yuimaruのBlog" />
</svelte:head>

<div class="flex center main">
  {#each articles as article}
    <Card href="articles/{article.id}" title={article.title}>
      <p>{formatter.format(new Date(article.publishedAt))}</p>
    </Card>
  {/each}
</div>

<style lang="scss">
  .main {
    margin: 8em;
    flex-direction: column;
  }
</style>
