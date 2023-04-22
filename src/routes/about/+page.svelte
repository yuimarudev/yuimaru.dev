<script>
  import Card from "$lib/component/Card.svelte";
</script>

<div class="flex main">
  <h2>About me</h2>
  <p>ゆいまるです。最近は専らフロントエンドをやっています。</p>
  <p>最近特に力を入れているものとしては、<a href="https://github.com/identmous/identmous">Identmous</a>があります。</p>
  <h2>Skills</h2>
  <div class="flex center">
    <Card href="https://doc.rust-jp.rs/book-ja/" title="Rust">
      <p>なんもわからん。ボローチェッカーと戦っている。</p>
    </Card>
    <Card href="https://tc39.es/ecma262/multipage/" title="JavaScript">
      <p>ちょっとできる。最近はTypeScriptを使うけど・・・</p>
    </Card>
    <Card href="https://svelte.jp" title="Svelte">
      <p>なんもわからん。学習中。</p>
    </Card>
    <Card href="https://chromium.googlesource.com/chromiumos/third_party/hdctools/+/HEAD/docs/ccd.md" title="Chromebookを破壊">
      <p>Linuxを入れたりなど。Google許さん。</p>
    </Card>
  </div>
</div>

<style>
  .main {
    flex-direction: column;
    margin: 1rem;
  }
</style>