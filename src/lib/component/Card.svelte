<script lang="ts">
  let isHover = false;

  export let href: string;
  export let title: string;
</script>

<div
  class="card flex {isHover ? 'hover' : ''}"
  on:mouseover={() => (isHover = true)}
  on:mouseleave={() => (isHover = false)}>
  <a {href}>
    <p class="title {isHover ? 'hover' : ''}">{title}</p>
    <div class="wrapper"><slot /></div>
  </a>
</div>

<style lang="scss">
  .card {
    width: 100%;
    background: #242424;
    height: 9em;
    border-radius: 5px;
    justify-content: space-around;
    flex-direction: column;
    margin: 1em;

    * {
      margin-left: 1em;
      margin-right: 1em;
    }
  }

  .title.hover {
    text-decoration: underline;
  }

  .card.hover {
    background-image: linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05));
  }

  .wrapper,
  p {
    color: #fff;
  }
</style>
