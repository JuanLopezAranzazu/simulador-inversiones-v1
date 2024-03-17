<script>
  // components
  import Item from "./Item.svelte";
  // variables
  export let items = [];
  export let handleDelete;
  export let handleUpdate;
</script>

<div class="item-list">
  {#each items as item, index}
    <Item {item} {index} {handleDelete} {handleUpdate} />
  {/each}
</div>

<style>
  .item-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
</style>
