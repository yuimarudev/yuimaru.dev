<script lang="ts">
  import { Row, Column, Tooltip } from "carbon-components-svelte";
</script>

<svelte:head>
  <title>yuimaru - About</title>
  <meta name="description" content="yuimaru" />
</svelte:head>

<Row>
  <Column>
    <div>
      <h1>About me</h1>
      <p>
        <Tooltip triggerText="TypeScripter"
          ><a href="https://www.typescriptlang.org/">TypeScript</a>使いのこと。</Tooltip
        >と<Tooltip triggerText="Rustacean"
          ><p>
            <a href="https://www.rust-lang.org/ja">Rust</a>使いのこと。<br />多分<a
              href="https://www.rust-lang.org/ja">Rust</a
            >の非公式マスコットFerris(蟹)が甲殻類(Crustacean)であることから来ている
          </p></Tooltip
        >になりたい
      </p>
      <p>このサイトの<a href="https://github.com/yuimarudev/yuimaru.dev">ソースコード</a></p>
      <a href="https://github.com/yuimarudev">GitHubアカウント</a>
      <p>
        このサイトは<a href="https://www.cloudflare.com/ja-jp/web-analytics/"
          >Cloudflare Analytics</a
        >によるアクセス解析をしています
      </p>
    </div>
  </Column>
</Row>
