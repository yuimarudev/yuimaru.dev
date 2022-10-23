<script lang="ts">
  import { Row, Col, Card, CardHeader, CardLink, CardBody } from "sveltestrap";

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
  <Col>
    <h1>Tools</h1>
    <p>適当に作ったものを置きます</p>
    {#each tools as tool}
      <Card color="dark">
        <CardHeader><CardLink href={tool.href}>{tool.name}</CardLink></CardHeader>
        <CardBody>{tool.description}</CardBody>
      </Card>
      <hr />
    {/each}
  </Col>
</Row>
