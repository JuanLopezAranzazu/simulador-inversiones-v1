<script>
  import Fixed from "./../components/Fixed.svelte";
  import Variable from "./../components/Variable.svelte";
  import CoinType from "../components/CoinType.svelte";
  import Total from "../components/Total.svelte";
  import Tabs from "../components/Tabs.svelte";
  //variables
  let items = [
    { label: "Inversión Fija", value: 1, component: Fixed },
    { label: "Inversión Variable", value: 2, component: Variable },
  ];
</script>

<div class="content-page">
  <div class="general-data">
    <CoinType />
    <Total />
  </div>
  <Tabs {items} />
</div>

<style>
  .content-page {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 16px;
  }

  .general-data {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
</style>
