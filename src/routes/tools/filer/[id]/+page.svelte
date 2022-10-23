<script lang="ts">
  import { Row, Col, Image, Button } from "sveltestrap";
  export let data: any;
  let href = "";
  let enabled = false;
</script>

<svelte:head>
  <title>yuimaru - Uploader</title>
  <meta name="description" content="ファイルアップローダー" />
</svelte:head>

<Row>
  <Col>
    <h1>File</h1>
    {#if data.status}
      <h2>{data.id}</h2>
      <Image
        style="max-width: min(100%, 100vw)"
        src="data:{data.type || 'image/png'};base64,{data.data}"
      />
      <div class="center">
        <Button
          download={data.id}
          color={enabled ? "success" : "secondary"}
          {href}
          id="dl"
          on:click={async () => {
            const blob = await (
              await fetch(`data:${data.type || "image/png"};base64,${data.data}`)
            ).blob();
            href = URL.createObjectURL(blob);
            enabled = true;
          }}>{enabled ? "Download" : "Create Download Link"}</Button
        >
      </div>
    {/if}
  </Col>
</Row>
