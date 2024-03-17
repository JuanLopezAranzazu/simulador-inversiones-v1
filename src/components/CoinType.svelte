<script>
  import { onMount } from "svelte";
  import { lettersRegex, numberRegex } from "./../helpers/regex";
  import { LocalStorageService } from "./../helpers/LocalStorageService";
  import { LIMIT } from "./../helpers/global";
  // components
  import Modal from "./Modal.svelte";
  import ItemList2 from "./ItemList2.svelte";
  // variables
  let elements = [];
  let isModalOpen = false;
  let coinType = "";
  let value = 0;
  let editingIndex = -1;
  let error = false;

  const reset = () => {
    coinType = "";
    value = 0;
  };

  const validateInputData = () => {
    return lettersRegex.test(coinType) && numberRegex.test(value);
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
      coinType,
      value,
    };
    elements = [...elements, inputData];
    isModalOpen = false;
    LocalStorageService.saveJSON("currencyData", elements);
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
        coinType,
        value,
      };
      elements = elements.map((element, i) =>
        i === editingIndex ? inputData : element
      );
      isModalOpen = false;
      editingIndex = -1;
      elements = [...elements];
      LocalStorageService.saveJSON("currencyData", elements);
    }
  };

  const handleDelete = (index) => {
    elements = elements.filter((element, i) => i !== index);
    LocalStorageService.saveJSON("currencyData", elements);
  };

  const handleModalClose = () => {
    isModalOpen = false;
  };

  onMount(() => {
    elements = LocalStorageService.getJSON("currencyData");
    if (elements.length === 0) {
      LocalStorageService.saveJSON("currencyData", [
        { coinType: "COP", value: 1 },
      ]);
      location.reload();
    }
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
          reset();
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
      class={error && "error"}
      type="text"
      id="coinType"
      placeholder="Tipo de moneda..."
      bind:value={coinType}
    />
    <input
      class={error && "error"}
      type="number"
      id="value"
      placeholder="Valor..."
      bind:value
    />
  </div>
  {#if error}
    <div class="error">Se ha producido un error.</div>
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
