<script>
  import StatCard from '$lib/components/StatCard.svelte';
  import { timeSince } from '$lib/utils'
  export let data;
</script>

<svelte:head>
  <title>Flow Contract Browser</title>
  <meta property="og:title" content="Flow Contract Browser" />
</svelte:head>

<div class="grid">
  <StatCard 
    number={data?.status?.contract_amount?.toLocaleString("en-US") || "Offline"}
    label="Contracts" 
  />
  <StatCard 
    number={data?.status?.synced_height?.toLocaleString("en-US") || "Offline"}
    label="Synced Block Height" 
  />
</div>

<h2>Status</h2>
<div class="status">
  <div>Status: <span>{data?.status?.success === true ? "✅ ONLINE" : "💤 OFFLINE"}</span> </div>
  <div>Network: <span>{data?.status?.network || "Offline"}</span></div>
  <div>Last updated: <span>{timeSince(new Date(data?.status?.last_sync_at + "Z"), new Date())} ago</span></div>
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
    justify-content: center;;
  }


</style>