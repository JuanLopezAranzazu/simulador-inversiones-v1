<script>
  import { onDestroy } from "svelte";
  import { itemsDataFixed, itemsDataVariable } from "./../helpers/store";
  // variables
  let totalFixed = 0;
  let totalVariable = 0;

  const getValue = (items) => {
    return items.reduce(
      (acc, item) => item.price * item.qty * item?.coinData?.value + acc,
      0
    );
  };

  const unsubscribe = itemsDataFixed.subscribe((value) => {
    totalFixed = getValue(value);
  });

  const unsubscribe2 = itemsDataVariable.subscribe((value) => {
    totalVariable = getValue(value);
  });

  onDestroy(() => {
    unsubscribe();
    unsubscribe2();
  });
</script>

<section>
  <div class="total-header">
    <h3>Totales de Inversión</h3>
  </div>
  <div class="item-list">
    <div class="item">
      <span>Total: ${(totalFixed + totalVariable).toLocaleString()}</span>
    </div>
    <div class="item">
      <span>Total Inversión Fija: ${totalFixed.toLocaleString()}</span>
    </div>
    <div class="item">
      <span>Total Inversión Variable: ${totalVariable.toLocaleString()}</span>
    </div>
  </div>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    gap: 16px;
    background-color: var(--card-color);
    padding: 16px;
    border-radius: 10px;
    height: min-content;
  }

  .total-header {
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #818181;
  }

  .item {
    display: flex;
    justify-content: center;
    background-color: var(--primary);
    color: #fff;
    border-radius: 8px;
    padding: 10px;
    align-items: center;
  }

  .item-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
</style>
