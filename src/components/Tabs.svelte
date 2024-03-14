<script>
  // variables
  export let items = [];
  export let activeTabValue = 1;

  const handleClick = (tabValue) => () => (activeTabValue = tabValue);
</script>

<div class="options">
  {#each items as item}
    <div class={activeTabValue === item.value ? "option active" : "option"}>
      <span on:click={handleClick(item.value)}>{item.label}</span>
    </div>
  {/each}
</div>

{#each items as item}
  {#if activeTabValue === item.value}
    <svelte:component this={item.component} />
  {/if}
{/each}

<style>
  .options {
    display: flex;
    justify-content: center;
    gap: 20px;
  }

  .option {
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    color: var(--color-primary);
  }

  .active {
    color: var(--color-secondary);
  }
</style>
