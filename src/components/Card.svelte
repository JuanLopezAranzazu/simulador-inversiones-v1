<script>
  import { onMount } from "svelte";
  import { LocalStorageService } from "./../helpers/LocalStorageService";
  import { lettersRegex, numberRegex } from "./../helpers/regex";
  // components
  import Modal from "./Modal.svelte";
  import ItemList from "./ItemList.svelte";
  // variables
  export let key = "";
  export let title = "";
  let items = [];
  let isModalOpen = false;
  let description = "";
  let price = 0;
  let qty = 1;
  let coinType = "";
  let editingIndex = -1;
  let error = false;
  let elements = [];
  $: total = items.reduce(
    (acc, item) => item.price * item.qty * item.coinData.value + acc,
    0
  );
  
  const reset = () => {
    description = "";
    price = 0;
    qty = 1;
    coinType = elements[0].coinType;
  };

  const validateInputData = () => {
    return (
      lettersRegex.test(description) &&
      numberRegex.test(price) &&
      numberRegex.test(qty)
    );
  };

  const handleSave = () => {
    if (!validateInputData()) {
      error = true;
      setTimeout(() => {
        error = false;
      }, 5000);
      return;
    }
    const inputData = {
      description,
      price,
      qty,
      coinData: elements.find((el) => el.coinType === coinType),
    };
    items = [...items, inputData];
    isModalOpen = false;
    LocalStorageService.saveJSON(key, items);
  };

  const handleUpdate = () => {
    if (editingIndex !== -1) {
      if (!validateInputData()) {
        error = true;
        setTimeout(() => {
          error = false;
        }, 5000);
        return;
      }
      const inputData = {
        description,
        price,
        qty,
        coinData: elements.find((el) => el.coinType === coinType),
      };
      items = items.map((item, i) => (i === editingIndex ? inputData : item));
      isModalOpen = false;
      editingIndex = -1;
      items = [...items];
      LocalStorageService.saveJSON(key, items);
    }
  };

  const handleDelete = (index) => {
    items = items.filter((item, i) => i !== index);
    LocalStorageService.saveJSON(key, items);
  };

  const handleModalClose = () => {
    isModalOpen = false;
  };

  onMount(() => {
    items = LocalStorageService.getJSON(key);
    elements = LocalStorageService.getJSON("currencyData");
  });
</script>

<section>
  <div class="card-header">
    <h3>{title}</h3>
  </div>

  <div class="actions">
    <span>Total Inversión: ${total.toLocaleString()} pesos colombianos</span>
    <button
      on:click={() => {
        isModalOpen = true;
        editingIndex = -1;
        reset();
      }}>+ Añadir elemento</button
    >
  </div>

  <ItemList
    {items}
    {handleDelete}
    handleUpdate={(index) => {
      isModalOpen = true;
      editingIndex = index;
      const selectedItem = items[index];
      description = selectedItem.description;
      price = selectedItem.price;
      qty = selectedItem.qty;
      coinType = selectedItem.coinData.coinType;
    }}
  />
</section>

<Modal {isModalOpen} {handleModalClose}>
  <div class="modal-header">
    <span>{editingIndex === -1 ? "Agregar" : "Editar"} Item</span>
    <button on:click={() => (isModalOpen = false)}>Cerrar</button>
  </div>
  <div class="content">
    <input
      class={error && "error"}
      type="text"
      id="description"
      placeholder="Descripción..."
      bind:value={description}
    />
    <input
      class={error && "error"}
      type="number"
      id="price"
      placeholder="Precio..."
      bind:value={price}
    />
    <input
      class={error && "error"}
      type="number"
      id="qty"
      placeholder="Cantidad..."
      bind:value={qty}
    />
    <select class={error && "error"} id="coinData" bind:value={coinType}>
      {#each elements as el}
        <option value={el.coinType}>{el.coinType}</option>
      {/each}
    </select>
  </div>
  {#if error}
    <div class="error">Se ha producido un error.</div>
  {/if}
  <div class="modal-footer">
    <button on:click={editingIndex === -1 ? handleSave : handleUpdate}
      >{editingIndex === -1 ? "Guardar" : "Editar"}</button
    >
  </div>
</Modal>

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

  .card-header {
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #818181;
  }

  .actions {
    display: flex;
    justify-content: space-between;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex: 1;
    width: 400px;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 16px;
  }
</style>
