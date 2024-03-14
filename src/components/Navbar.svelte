<script>
  //variables
  export let links = [];
</script>

<nav>
  {#each links as link}
    <a href={link.url} class="link">
      <svelte:component this={link.component} />
      {link.text}
    </a>
  {/each}
</nav>

<style>
  nav {
    display: flex;
    gap: 20px;
  }

  .link {
    display: flex;
    gap: 5px;
    align-items: center;
  }
</style>
