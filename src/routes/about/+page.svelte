<script lang="ts">
  import { Row, Column, Tooltip, TreeView } from "carbon-components-svelte";
  import type { TreeNode } from "carbon-components-svelte/types/TreeView/TreeView.svelte";
  import { children } from "svelte/internal";

  const tree = [
    { id: 0, text: "2008/2/22 生誕" },
    {
      id: 1,
      text: "5歳",
      children: [
        { id: 2, text: "物心がつきはじめる" },
        {
          id: 3,
          text: "パソコンに触れる",
          children: [
            {
              id: 4,
              text: "Youtubeを見た。",
              children: [
                { id: 5, text: "多分最初に見たのはめいニコニコさんの動画" },
                { id: 6, text: "これをきっかけにMinecraftを知る。" }
              ]
            }
          ]
        },
        { id: 7, text: "お引越し", children: [{ id: 8, text: "神奈川に引っ越した。" }] }
      ]
    },
    {
      id: 9,
      text: "6歳",
      children: [
        {
          id: 10,
          text: "小学校に入学する",
          children: [{ id: 11, text: "Tips: 喧嘩を売る相手は考えないと入学して早々痛い目にあうぞ" }]
        },
        {
          id: 12,
          text: "Androidタブレットを入手する",
          children: [
            {
              id: 15,
              text: "しばらくしてから破壊した。リカバリーモードに入ってたみたい（家族全員英語が読めないため敗北）"
            }
          ]
        }
      ]
    },
    {
      id: 14,
      text: "11歳",
      children: [
        {
          id: 15,
          text: "iPadを入手する",
          children: [
            {
              id: 16,
              text: "Android タブレットを破壊してからずっと暇だった"
            },
            {
              id: 17,
              text: "この頃からyuimarudayo2というハンネで活動しはじめる。とんでもないクソガキムーブをしていた記憶"
            }
          ]
        }
      ]
    },
    {
      id: 18,
      text: "13歳",
      children: [
        {
          id: 19,
          text: "JavaScriptをやりはじめる"
        },
        {
          id: 20,
          text: "中学校に入学する",
          children: [{ id: 21, text: "小学校の教訓を活かしてなんとか生き延びた" }]
        }
      ]
    },
    {
      id: 22,
      text: "14歳",
      children: [
        {
          id: 23,
          text: "スーツの人たちが家に召喚される",
          children: [
            {
              id: 24,
              text: "Tips: 来た時点で諦めろ"
            },
            {
              id: 25,
              text: "わるいことはしないほうがお得かも？"
            },
            { id: 30, text: "追記: iPadをパクられた。" }
          ]
        },
        { id: 26, text: "いろいろな言語をやりはじめる" }
      ]
    },
    {
      id: 27,
      text: "15歳",
      children: [
        { id: 28, text: "高校に合格する" },
        { id: 29, text: "今に至る" }
      ]
    }
  ] as unknown as TreeNode;
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
        <Tooltip triggerText="TypeScripter" direction="right"
          ><a href="https://www.typescriptlang.org/">TypeScript</a>使いのこと。</Tooltip
        >と<Tooltip triggerText="Rustacean" direction="right"
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

<Row>
  <Column>
    <h2>History</h2>
    <TreeView children={tree} labelText="History" />
  </Column>
</Row>
