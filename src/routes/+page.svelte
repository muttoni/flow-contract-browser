<script>
  import StatCard from '$lib/components/StatCard.svelte';
  import ContractTable from '$lib/components/ContractTable.svelte'
  import { timeSince } from '$lib/utils'
    import TopAccountTable from '../lib/components/TopAccountTable.svelte';
  export let data;


  // temporary, while endpoint is being prepared
  const topContracts = [
    { 
      uuid: "A.1d7e57aa55817448.NonFungibleToken",
      dependants_count: 1801,
    },
    { 
      uuid: "A.f233dcee88fe0abe.FungibleToken",
      dependants_count: 1089,
    },
    { 
      uuid: "A.1d7e57aa55817448.MetadataViews",
      dependants_count: 894,
    },
    { 
      uuid: "A.1654653399040a61.FlowToken",
      dependants_count: 179,
    },
    { 
      uuid: "A.3c5959b568896393.FUSD",
      dependants_count: 98,
    },
    { 
      uuid: "A.b78ef7afa52ff906.SwapConfig",
      dependants_count: 51,
    },
    { 
      uuid: "A.b78ef7afa52ff906.SwapInterfaces",
      dependants_count: 49,
    },
    { 
      uuid: "A.b063c16cac85dbd1.SwapFactory",
      dependants_count: 48,
    },
    { 
      uuid: "A.b78ef7afa52ff906.SwapError",
      dependants_count: 48,
    },
    { 
      uuid: "A.6a07dbeb03167a13.EmeraldPass",
      dependants_count: 24,
    }
  ]

  const topAccounts = [
    {
      address: "0x635a9971e6bdc54a",
      contracts_deployed: 83,
    },
    {
      address: "0x097bafa4e0b48eef",
      contracts_deployed: 37,
    },
    {
      address: "0x329feb3ab062d289",
      contracts_deployed: 18,
    },
    {
      address: "0x82ed1b9cba5bb1b3",
      contracts_deployed: 15,
    },
    {
      address: "0xa49cc0ee46c54bfb",
      contracts_deployed: 13,
    },
    {
      address: "0x24de869c5e40b2eb",
      contracts_deployed: 11,
    },
    {
      address: "0xb25138dbf45e5801",
      contracts_deployed: 10,
    },
    {
      address: "0x2c1a70beabf07249",
      contracts_deployed: 10,
    },
    {
      address: "0x39eeb4ee6f30fc3f",
      contracts_deployed: 10,
    },
    {
      address: "0x231cc0dbbcffc4b7",
      contracts_deployed: 10,
    }
  ]
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
    <div class="status mb-1">
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

<div>
  <h2>🔥 Top contracts</h2>
  <ContractTable contracts={topContracts} />
</div>

{#if data.latest?.length > 0}
<h2>🆕 Recently deployed contracts</h2>
<ContractTable contracts={data.latest} />
{/if}

<div>
  <h2>🐳 Top deploying accounts</h2>
  <TopAccountTable accounts={topAccounts} />
</div>

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