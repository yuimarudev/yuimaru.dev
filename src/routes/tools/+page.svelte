<script lang="ts">
  import { Row, Column, ClickableTile } from "carbon-components-svelte";

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

<Row>
  <Column>
    <h1>Tools</h1>
    <p>適当に作ったものを置きます</p>
    <hr />
    {#each tools as tool}
      <ClickableTile href={tool.href}>
        <p>{tool.name}</p>
        <footer>{tool.description}</footer>
      </ClickableTile>
      <hr />
    {/each}
  </Column>
</Row>
