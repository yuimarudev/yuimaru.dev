<script lang="ts">
  import Card from "$lib/component/Card.svelte";

  const tools = [
    {
      name: "5sim checker",
      href: "/tools/5sim",
      description: "5simの最安値チェッカー"
    }
  ];
</script>

<svelte:head>
  <title>yuimaru - Tools</title>
  <meta name="description" content="yuimaruの道具箱" />
</svelte:head>

<div class="flex">
    <h1>Tools</h1>
    <p>適当に作ったものを置きます</p>
    <hr />
    {#each tools as tool}
      <Card href="articles/{tool.href}" title={tool.name}>
        <p>{tool.description}</p>
      </Card>
      <hr />
    {/each}
</div>
