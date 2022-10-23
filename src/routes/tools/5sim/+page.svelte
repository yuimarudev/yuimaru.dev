<script lang="ts">
  import {
    Row,
    Col,
    Input,
    FormGroup,
    Label,
    Card,
    CardHeader,
    CardBody,
    Button
  } from "sveltestrap";

  const blackCount = [0, 1000, 2000];
  let product: string = "";
  let results: any[] = [];
  let amount = 5;
  const checkOnclick = async () => {
    const r = await (
      await fetch("/api/tools/5sim?product=" + product, {
        mode: "cors"
      })
    ).text();
    if (r?.match("incorrect")) return alert("incorrect product");
    const res = JSON.parse(r)[product];
    results = list(res, +amount) as Object[];
  };

  function list(res: any, i: number) {
    const arr = new Set();
    while (arr.size < i) {
      let result;
      for (let country in res) {
        for (let channelId in res[country]) {
          const channel = res[country][channelId];
          if (!channel) continue;
          if (blackCount.includes(channel.count)) continue;
          if (!result)
            result = {
              country,
              channelId,
              ...channel
            };
          if (result.cost > channel.cost) {
            result = Object.create({
              country,
              channelId,
              ...channel
            });
            delete res[country][channelId];
          }
        }
      }
      arr.add(result);
    }
    return [...arr];
  }
</script>

<svelte:head>
  <title>yuimaru - 5sim checker</title>
  <meta name="description" content="5simの最安値チェッカー" />
</svelte:head>

<Row>
  <Col>
    <h1>5sim checker</h1>
    <FormGroup>
      <Label>Amount</Label>
      <Input on:keypress={(e) => e.charCode === 13 ? checkOnclick() : null} class="bg-dark text-light" type="number" bind:value={amount} />
      <Label>Product</Label>
      <Input on:keypress={(e) => e.charCode === 13 ? checkOnclick() : null} class="bg-dark text-light" bind:value={product} />
      <hr />
      <Button on:click={checkOnclick} color="success">Check</Button>
    </FormGroup>
    <hr />
    {#each results as result, i}
      <Card color="dark">
        <CardHeader>{product}で{i + 1}番目に安い</CardHeader>
        <CardBody
          >{result.country}のチャネル{result.channelId}です。値段は{result.cost}ロシアルーブルで在庫数が{result.count}個です。</CardBody
        >
      </Card>
      <hr />
    {/each}
  </Col>
</Row>