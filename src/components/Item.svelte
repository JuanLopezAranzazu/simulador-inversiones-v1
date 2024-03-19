<script>
  import { truncateText } from "./../helpers/transformData";
  // variables
  export let item;
  export let index;
  export let handleDelete;
  export let handleUpdate;

  const getTotal = (item) => {
    return item.price * item.qty * item?.coinData?.value;
  };
</script>

<div class="item">
  <div class="item-content">
    <span>Descripción: {truncateText(item.description)}</span>
    <span>Precio: ${item.price.toLocaleString()}</span>
    <span>Cantidad: {item.qty}</span>
    <span>Moneda: {item?.coinData?.coinType}</span>
    <span>Total: ${getTotal(item).toLocaleString()}</span>
  </div>
  <div class="actions">
    <button on:click={handleUpdate(index)}>Editar</button>
    <button class="delete" on:click={handleDelete(index)}>Eliminar</button>
  </div>
</div>

<style>
  .item {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    align-items: center;
  }

  .item-content,
  .actions {
    display: flex;
    gap: 10px;
  }
</style>
