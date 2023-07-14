<script lang="ts">
  import { GithubBrand } from "svelte-awesome-icons";
</script>

<svelte:head>
  <title>yuimaru</title>
  <meta name="description" content="yuimaru" />
</svelte:head>

<div class="main flex center">
  <div class="wrapper flex">
    <img src="/favicon.png" alt="yuimaru's icon" />
    <div class="flex col center">
      <p>こんにちは。ゆいまるです。</p>
      <div class="flex center">
        <a class="spec" href="https://github.com/yuimarudev"><GithubBrand color="white" size="48" /></a>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
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
