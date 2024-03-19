<script>
  import { fade } from "svelte/transition";
  import { onDestroy } from "svelte";
  import { currencyData } from "./../helpers/store";
  import { lettersRegex, numberRegex } from "./../helpers/regex";
  import { LIMIT } from "./../helpers/global";
  // components
  import Modal from "./Modal.svelte";
  import ItemList2 from "./ItemList2.svelte";
  // variables
  let elements = [];
  let isModalOpen = false;
  let coinType;
  let value;
  let editingIndex = -1;
  // error
  let error = "";
  let coinTypeError = "";
  let valueError = "";

  // validate error
  function handleCoinTypeInput(event) {
    const isValid = lettersRegex.test(event.target.value);

    if (!isValid) {
      coinTypeError = "La moneda solo puede contener letras y espacios";
    } else {
      coinTypeError = "";
    }
  }

  function handleValueInput(event) {
    const isValid = numberRegex.test(event.target.value);

    if (!isValid) {
      valueError = "El valor de la moneda solo puede contener números";
    } else {
      valueError = "";
    }
  }

  const validateInputData = () => {
    return lettersRegex.test(coinType) && numberRegex.test(value);
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
      coinType,
      value,
    };
    currencyData.update((prevData) => [...prevData, inputData]);
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
        coinType,
        value,
      };
      currencyData.update((prevData) =>
        prevData.map((element, i) => (i === editingIndex ? inputData : element))
      );
      isModalOpen = false;
      editingIndex = -1;
    }
  };

  const handleDelete = (index) => {
    currencyData.update((prevData) =>
      prevData.filter((element, i) => i !== index)
    );
  };

  const handleModalClose = () => {
    isModalOpen = false;
  };

  const unsubscribe = currencyData.subscribe((value) => {
    elements = value;
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<section>
  <div class="coin-type-header">
    <h3>Gestión de monedas</h3>
  </div>

  <ItemList2
    items={elements}
    handleUpdate={(index) => {
      isModalOpen = true;
      editingIndex = index;
      const selectedItem = elements[index];
      coinType = selectedItem.coinType;
      value = selectedItem.value;
    }}
  />

  <div class="actions">
    {#if elements.length < LIMIT}
      <button
        on:click={() => {
          isModalOpen = true;
          editingIndex = -1;
        }}>+ Añadir moneda</button
      >
    {/if}
  </div>
</section>

<Modal {isModalOpen} {handleModalClose}>
  <div class="modal-header">
    <span>{editingIndex === -1 ? "Agregar" : "Editar"} Elemento</span>
    <button on:click={() => (isModalOpen = false)}>Cerrar</button>
  </div>
  <div class="content">
    <input
      class={coinTypeError && "error"}
      type="text"
      id="coinType"
      placeholder="Tipo de moneda..."
      bind:value={coinType}
      on:input={handleCoinTypeInput}
    />
    {#if coinTypeError}
      <p class="error-message">{coinTypeError}</p>
    {/if}
    <input
      class={valueError && "error"}
      type="number"
      id="value"
      placeholder="Valor..."
      bind:value
      on:input={handleValueInput}
    />
    {#if valueError}
      <p class="error-message">{valueError}</p>
    {/if}
  </div>
  {#if error}
    <div class="error" transition:fade={{ duration: 500 }}>{error}</div>
  {/if}
  <div class="modal-footer">
    <button on:click={editingIndex === -1 ? handleSave : handleUpdate}
      >{editingIndex === -1 ? "Guardar" : "Editar"}</button
    >
    {#if editingIndex !== -1}
      <button
        class="delete"
        on:click={() => {
          handleDelete(editingIndex);
          isModalOpen = false;
        }}>Eliminar</button
      >
    {/if}
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

  .coin-type-header {
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #818181;
  }

  .actions {
    display: flex;
    justify-content: center;
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
