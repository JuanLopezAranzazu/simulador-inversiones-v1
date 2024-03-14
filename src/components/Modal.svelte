<script>
  // variables
  export let isOpen = false;
</script>

{#if isOpen}
  <div class="modal">
    <div class="modal-content">
      <slot />
    </div>
  </div>
{/if}

<style>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    overflow: auto;
  }
</style>