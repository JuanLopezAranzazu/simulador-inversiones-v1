<script>
  // components
  import Item2 from "./Item2.svelte";
  // variables
  export let items = [];
  export let handleUpdate;
</script>

<div class="item-list">
  {#each items as item, index}
    <Item2 {item} {index} {handleUpdate} />
  {/each}
</div>

<style>
  .item-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
</style>
