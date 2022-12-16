<script>
  import StatCard from '$lib/components/StatCard.svelte';
  import { timeSince } from '$lib/utils'
  export let data;
</script>

<svelte:head>
  <title>Flow Contract Browser</title>
  <meta property="og:title" content="Flow Contract Browser" />
</svelte:head>

<h2>Overview</h2>

<div class="grid">
  <!-- <StatCard 
    number={data?.status?.synced_height?.toLocaleString("en-US") || "Offline"}
    label="Synced Block Height" 
    /> -->
    <div class="status">
      <div>Status: <span>{data?.status?.success === true ? "✅ ONLINE" : "💤 OFFLINE"}</span> </div>
      <div>Network: <span>{data?.status?.network || "Offline"}</span></div>
      <div>Block height: <code>{data?.status?.synced_height?.toLocaleString("en-US")}</code></div>
      <div>Last updated: <span>{timeSince(new Date(data?.status?.last_sync_at + "Z"), new Date())} ago</span></div>
    </div>
    <StatCard 
      number={data?.status?.contract_amount?.toLocaleString("en-US") || "Offline"}
      label="Contracts on Mainnet" 
    />
</div>

<div class="grid">
  <div>
    <h2>🔥 Top contracts</h2>
    <ul>
      <li><a href="/A.1d7e57aa55817448.NonFungibleToken">A.1d7e57aa55817448.NonFungibleToken</a>
      <li><a href="/A.f233dcee88fe0abe.FungibleToken">A.f233dcee88fe0abe.FungibleToken</a>
      <li><a href="/A.1d7e57aa55817448.MetadataViews">A.1d7e57aa55817448.MetadataViews</a>
      <li><a href="/A.1654653399040a61.FlowToken">A.1654653399040a61.FlowToken</a>
      <li><a href="/A.3c5959b568896393.FUSD">A.3c5959b568896393.FUSD</a>
      <li><a href="/A.b78ef7afa52ff906.SwapConfig">A.b78ef7afa52ff906.SwapConfig</a>
      <li><a href="/A.b78ef7afa52ff906.SwapInterfaces">A.b78ef7afa52ff906.SwapInterfaces</a>
      <li><a href="/A.b063c16cac85dbd1.SwapFactory">A.b063c16cac85dbd1.SwapFactory</a>
      <li><a href="/A.b78ef7afa52ff906.SwapError">A.b78ef7afa52ff906.SwapError</a>
      <li><a href="/A.6a07dbeb03167a13.EmeraldPass">A.6a07dbeb03167a13.EmeraldPass</a>
    </ul>  
  </div>
  <div>
    <h2>Accounts with most contracts</h2>
    <ul>
      <li><a href="/account/0x635a9971e6bdc54a">0x635a9971e6bdc54a (83 deployed contracts)</a>
      <li><a href="/account/0x097bafa4e0b48eef">0x097bafa4e0b48eef (37 deployed contracts)</a>
      <li><a href="/account/0x329feb3ab062d289">0x329feb3ab062d289 (18 deployed contracts)</a>
      <li><a href="/account/0x82ed1b9cba5bb1b3">0x82ed1b9cba5bb1b3 (15 deployed contracts)</a>
      <li><a href="/account/0xa49cc0ee46c54bfb">0xa49cc0ee46c54bfb (13 deployed contracts)</a>
      <li><a href="/account/0x24de869c5e40b2eb">0x24de869c5e40b2eb (11 deployed contracts)</a>
      <li><a href="/account/0xb25138dbf45e5801">0xb25138dbf45e5801 (10 deployed contracts)</a>
      <li><a href="/account/0x2c1a70beabf07249">0x2c1a70beabf07249 (10 deployed contracts)</a>
      <li><a href="/account/0x39eeb4ee6f30fc3f">0x39eeb4ee6f30fc3f (10 deployed contracts)</a>
      <li><a href="/account/0x231cc0dbbcffc4b7">0x231cc0dbbcffc4b7 (10 deployed contracts)</a>
    </ul>
  </div>
</div>

{#if data.latest?.length > 0}

<h2>Recently deployed contracts</h2>

<ul>
  {#if data?.latest}
    {#each data.latest as contract}
    <li><a href="/{contract.uuid}">{contract.uuid}</a></li>
    {/each}
  {/if}
</ul>
{/if}


<style>
  h2 {
    margin-top: 30px;
    margin-bottom: 10px;
  }

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