<script lang="ts">
  import { Row, Col, FormGroup, Input, InputGroup, Button, Label } from "sveltestrap";
</script>

<svelte:head>
  <title>yuimaru - Uploader</title>
  <meta name="description" content="ファイルアップローダー" />
</svelte:head>

<Row>
  <Col>
    <h1>ファイルアップローダー</h1>
    <FormGroup>
      <Label>File</Label>
      <InputGroup>
        <Input type="file" name="File" />
      </InputGroup>
    </FormGroup>
  </Col>
</Row>
