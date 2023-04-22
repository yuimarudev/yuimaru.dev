<header class="flex">
  <div>
    <a href="/"><h2>ゆいまる</h2></a>
  </div>
  <div class="rh">
    <a href="/articles"><p>ブログ</p></a>
    <a href="/about"><p>誰？</p></a>
  </div>
</header>

<div class="main">
  <slot />
</div>

<style lang="scss">
  header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 4em;
    background-color: rgb(18, 18, 18);
    justify-content: space-between;
    align-items: center;
    * {
      margin: 0 1rem;
    }
  }

  .main {
    height: calc(100vh - 4em);
    margin-top: 4em;
  }

  a:hover {
    text-decoration: underline;
  }

  .rh {
    display: flex;
  }
</style>
