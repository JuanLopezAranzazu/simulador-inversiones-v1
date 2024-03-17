<script>
  import { truncateText } from "./../helpers/transformData";
  // variables
  export let item;
  export let index;
  export let handleUpdate;
</script>

<div class="item" on:click={handleUpdate(index)}>
  <div class="item-content">
    <span>{truncateText(item.coinType)}: ${item.value.toLocaleString()}</span>
  </div>
</div>

<style>
  .item {
    display: flex;
    justify-content: center;
    background-color: #fca311;
    color: #fff;
    border-radius: 8px;
    padding: 10px;
    align-items: center;
    cursor: pointer;
  }

  .item:hover {
    background-color: #ca7d00;
  }

  .item-content {
    display: flex;
    gap: 10px;
  }
</style>
