<script>
  import { fade } from "svelte/transition";
  import { onDestroy } from "svelte";
  import { currencyData } from "./../helpers/store";
  import { lettersRegex, numberRegex } from "./../helpers/regex";
  // components
  import Modal from "./Modal.svelte";
  import ItemList from "./ItemList.svelte";
  // variables
  export let itemsStore;
  export let title = "";
  let items = [];
  let isModalOpen = false;
  let description;
  let price;
  let qty;
  let coinType;
  let editingIndex = -1;
  let elements = [];
  $: total = items.reduce(
    (acc, item) => item.price * item.qty * item.coinData.value + acc,
    0
  );
  // error message
  let error = "";
  let descriptionError = "";
  let priceError = "";
  let qtyError = "";

  // validate error
  function handleDescriptionInput(event) {
    const isValid = lettersRegex.test(event.target.value);

    if (!isValid) {
      descriptionError = "La descripción solo puede contener letras y espacios";
    } else {
      descriptionError = "";
    }
  }

  function handlePriceInput(event) {
    const isValid = numberRegex.test(event.target.value);

    if (!isValid) {
      priceError = "El precio solo puede contener números";
    } else {
      priceError = "";
    }
  }

  function handleQtyInput(event) {
    const isValid = numberRegex.test(event.target.value);

    if (!isValid) {
      qtyError = "La cantidad solo puede contener números";
    } else {
      qtyError = "";
    }
  }

  const validateInputData = () => {
    return (
      lettersRegex.test(description) &&
      numberRegex.test(price) &&
      numberRegex.test(qty)
    );
  };

  const handleSave = () => {
    if (!validateInputData()) {
      error = "Los datos de entrada son incorrectos";
      setTimeout(() => {
        error = "";
      }, 5000);
      return;
    }
    const inputData = {
      description,
      price,
      qty,
      coinData: elements.find((el) => el.coinType === coinType),
    };
    itemsStore.update((prevData) => [...prevData, inputData]);
    isModalOpen = false;
  };

  const handleUpdate = () => {
    if (editingIndex !== -1) {
      if (!validateInputData()) {
        error = "Los datos de entrada son incorrectos";
        setTimeout(() => {
          error = "";
        }, 5000);
        return;
      }
      const inputData = {
        description,
        price,
        qty,
        coinData: elements.find((el) => el.coinType === coinType),
      };
      itemsStore.update((prevData) =>
        prevData.map((item, i) => (i === editingIndex ? inputData : item))
      );
      isModalOpen = false;
      editingIndex = -1;
    }
  };

  const handleDelete = (index) => {
    itemsStore.update((prevData) => prevData.filter((item, i) => i !== index));
  };

  const handleModalClose = () => {
    isModalOpen = false;
  };

  const unsubscribe = itemsStore.subscribe((value) => {
    items = value;
  });

  const unsubscribe2 = currencyData.subscribe((value) => {
    elements = value;
    coinType = elements[0].coinType;
  });

  onDestroy(() => {
    unsubscribe();
    unsubscribe2();
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
      class={descriptionError && "error"}
      type="text"
      id="description"
      placeholder="Descripción..."
      bind:value={description}
      on:input={handleDescriptionInput}
    />
    {#if descriptionError}
      <p class="error-message">{descriptionError}</p>
    {/if}
    <input
      class={priceError && "error"}
      type="number"
      id="price"
      placeholder="Precio..."
      bind:value={price}
      on:input={handlePriceInput}
    />
    {#if priceError}
      <p class="error-message">{priceError}</p>
    {/if}
    <input
      class={qtyError && "error"}
      type="number"
      id="qty"
      placeholder="Cantidad..."
      bind:value={qty}
      on:input={handleQtyInput}
    />
    {#if qtyError}
      <p class="error-message">{qtyError}</p>
    {/if}
    <select id="coinData" bind:value={coinType}>
      {#each elements as el}
        <option value={el.coinType}>{el.coinType}</option>
      {/each}
    </select>
  </div>
  {#if error}
    <div class="error" transition:fade={{ duration: 500 }}>{error}</div>
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
