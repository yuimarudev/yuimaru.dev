<script lang="ts">
  import "carbon-components-svelte/css/g100.css";
  import {
    Content,
    Header,
    HeaderNav,
    HeaderNavItem,
    SkipToContent,
    SideNav,
    SideNavItems,
    SideNavLink
  } from "carbon-components-svelte";

  let isSideNavOpen = false;
</script>

<Header persistentHamburgerMenu expandedByDefault company="yuimaru" bind:isSideNavOpen>
  <svelte:fragment slot="skip-to-content">
    <SkipToContent />
  </svelte:fragment>
  <HeaderNav>
    <HeaderNavItem href="/" text="Home" />
    <HeaderNavItem href="/about" text="About" />
    <HeaderNavItem href="/articles" text="Blog" />
    <HeaderNavItem href="/tools" text="Tool" />
  </HeaderNav>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
  <SideNavItems>
    <SideNavLink href="/" text="Home" />
    <SideNavLink href="/about" text="About" />
    <SideNavLink href="/articles" text="Blog" />
    <SideNavLink href="/tools" text="Tool" />
  </SideNavItems>
</SideNav>

<Content>
  <slot />
</Content>

<div class="padding" />

<footer>
  <p>
    このサイトは
    <a href="https://kit.svelte.dev">SvelteKit</a>
    と
    <a href="https://unko.js.org">unko</a>
    と
    <a href="https://microcms.io/">microCMS</a>
    を使用していて、
    <a href="https://pages.dev">Cloudflare Pages</a>
    上で動いています。
  </p>
</footer>

<!--
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
-->
<style lang="scss">
  .padding {
    padding-bottom: 5rem;
  }

  footer {
    border-top: 1px solid #ffffff;
    padding: 1rem;
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    text-align: center;
  }
</style>
