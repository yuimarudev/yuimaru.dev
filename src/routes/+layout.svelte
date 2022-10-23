<script lang="ts">
  import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Container } from "sveltestrap";
</script>

<Navbar color="dark" dark expand="md">
  <NavbarBrand href="/">yuimaru</NavbarBrand>
  <Nav class="ms-auto" navbar>
    <NavItem>
      <NavLink href="/about">About</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="/articles">Blog</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="/tools">Tools</NavLink>
    </NavItem>
  </Nav>
</Navbar>
<Container>
  <main>
    <slot />
  </main>
</Container>
<div class="static" />

<footer class="center fixed-bottom">
  <p>
    このサイトは<a href="https://kit.svelte.dev">SvelteKit</a>と<a href="https://sveltestrap.js.org"
      >SvelteStrap</a
    >と<a href="https://microcms.io/">microCMS</a>を使用していて、<a href="https://pages.dev"
      >Cloudflare Pages</a
    >上で動いています。
  </p>
</footer>
