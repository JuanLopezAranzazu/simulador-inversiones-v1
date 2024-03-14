<script>
  import "./../styles/global.css";
  // components
  import Header from "./../components/Header.svelte";
</script>

<Header />
<main>
  <slot />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    flex: 1;
    margin: 0 auto;
    max-width: var(--site-width);
    padding: 76px 16px 16px;
    gap: 16px;
  }
</style>
