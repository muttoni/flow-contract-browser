<script>
  import StatCard from '$lib/components/StatCard.svelte';
  import ContractTable from '$lib/components/ContractTable.svelte'
  import { timeSince } from '$lib/utils'
  import { network } from '$lib/stores'
  export let data;
</script>

<svelte:head>
  <title>Flow Contract Browser</title>
  <meta property="og:title" content="Flow Contract Browser" />
</svelte:head>

<article>
  <header>
    <h2>👀 Overview of Flow Contracts on {$network}</h2>
  </header>
  <div class="grid">
    <!-- <StatCard 
      number={data?.status?.synced_height?.toLocaleString("en-US") || "Offline"}
      label="Synced Block Height" 
      /> -->
      <div class="status mb-1">
        <div>Status: <span>{data?.status?.success === true ? "✅ ONLINE" : "💤 OFFLINE"}</span> </div>
        <div>Network: <span>{data?.status?.network || "Offline"}</span></div>
        <div>Block height: <code>{data?.status?.synced_height?.toLocaleString("en-US")}</code></div>
        <div>Last updated: <span>{timeSince(new Date(data?.status?.last_sync_at + "Z"), new Date())} ago</span></div>
      </div>
      <StatCard 
        number={data?.status?.contract_amount?.toLocaleString("en-US") || "Offline"}
        label="Contracts on {import.meta.env.VITE_NETWORK}" 
      />
  </div>
  {#if $network === 'mainnet'}
  <a class="warning" href="https://testnet.contractbrowser.com/">Switch to testnet &rarr;</a>
  {:else}
  <a class="success" href="https://contractbrowser.com/">Switch to mainnet &rarr;</a>
  {/if}
</article>

<article>
  <header><h2>🔥 Top contracts</h2></header>
  <div class="table">
    <ContractTable contracts={data.top} />
  </div>
</article>

{#if data.latest?.length > 0}
<article>
  <header><h2>🆕 Recently deployed contracts</h2></header>
  <div class="table">
    <ContractTable contracts={data.latest} showDependencies={false} />
  </div>
</article>
{/if}

<style>
  .status {
    display:flex;
    flex-direction: column;
    font-weight:200;
    align-items: left;
    justify-content: center;
  }
  
  .grid {
    justify-content: center;
    
  }
</style>