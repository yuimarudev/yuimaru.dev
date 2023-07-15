<script lang="ts">
  import { onMount } from "svelte";
  import { GithubBrand } from "svelte-awesome-icons";
  import { loadDefaultJapaneseParser } from "budoux";
  let isChrome = false;

  onMount(async () => {
    const parser = loadDefaultJapaneseParser();
    isChrome = /Chrome\/[0-9.]+/.test(navigator.userAgent);

    document.querySelectorAll<HTMLParagraphElement>("p").forEach((e) => {
      parser.applyElement(e);
    });
  });
</script>

<svelte:head>
  <title>yuimaru</title>
  <meta name="description" content="yuimaru" />
</svelte:head>

<div>
  <div class="main flex center">
    <div class="wrapper flex">
      <img src="/favicon.webp" alt="yuimaru's icon" height="128" width="128" />
      <div class="flex col center">
        <p>こんにちは。ゆいまるです。</p>
        <div class="flex center">
          <a class="spec" href="https://github.com/yuimarudev"
            ><GithubBrand color="white" size="48" /></a>
        </div>
      </div>
    </div>
  </div>

  <div class="favorite">
    <h2>すきなもの</h2>
    <div class="container">
      <h3>ガラスの花と壊す世界</h3>
      <p class="budoux">
        とっても面白い作品で、かなり気に入っています。曲も結構好みで、「夢の蕾」「センダンライフ」がお気に入りです。原案の「D.backup」という作品も読んでみたい。金銭的余裕が出来るまで販売終了しないことを願っています。
      </p>
    </div>
    <div class="container">
      <h3>鳩羽つぐ</h3>
      <p class="budoux">
        可愛いので全人類一回は見ろ。多分 Edanoue の人たちはロリコンだと思う。うん。
      </p>
    </div>
    <div class="container">
      <h3>スローループ</h3>
      <p class="budoux">ひよりがめちゃくちゃ可愛いので全人類一回は見ろ。</p>
    </div>
    <div class="container">
      <h3>チェス</h3>
      <p class="budoux">
        結構好きなんですが、とても弱いです。強くなれるように頑張りたいな〜と思っている。
      </p>
    </div>
    <div class="container">
      <h3>ポーカー</h3>
      <p class="budoux">同上</p>
    </div>
  </div>

  <div class="margin {isChrome ? 'chrome' : ''}">
    <div class="footer"><p class="foot-text">あなたはChrome/Blinkを使用しています。やめませんか？</p></div>
  </div>
</div>

<style lang="scss">
  // fuck chrome!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  .margin.chrome {
    display: block;
    height: 5vh;
  }

  .margin {
    display: none;
  }

  .footer {
    position: fixed;
    display: flex;
    width: 100vw;
    height: 4em;
    justify-content: center;
    align-items: center;
    left: 0;
    bottom: 0;
    right: 0;
    border: solid 1px #0288d1;
    background-color: #242424;
  }

  .favorite {
    margin: 5vh 10vw;
    display: flex;
    flex-direction: column;
    border: solid 1px #0288d1;
    border-radius: 12px;

    .container {
      margin-left: 2em;
      margin-right: 2em;
      border-top: solid 1px #0288d1;
    }

    .budoux {
      margin-left: 1.5em;
    }

    * {
      margin: 1em;
    }
  }

  .main {
    height: 100vh;
  }

  img {
    height: 128px;
    border-radius: 999999px;
    margin: 1em;
  }

  .wrapper {
    height: min(20em, 100vh);
    width: min(40em, 95vw);
    background-color: #242424;
    border-radius: 12px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #0288d1;
  }
</style>
