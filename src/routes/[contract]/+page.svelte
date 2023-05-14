<script>
  import ContractView from '$lib/components/ContractView.svelte';
  export let data;
</script>

<svelte:head>
  <title>{data?.name} by {data?.address} | Flow Contract Browser</title>
  <meta property="og:title" content="{data?.name} by {data?.address} | Flow Contract Browser" />
  <meta name="twitter:title" content="{data?.name} by {data?.address} | Flow Contract Browser">
  
  <meta property="og:description" content="Inspect {data?.name}, deployed by {data?.address} - browse contracts and Cadence code on the Flow Blockchain using contractbrowser.com" />
  <meta name="description" content="Inspect {data?.name}, deployed by {data?.address} - browse contracts and Cadence code on the Flow Blockchain using contractbrowser.com">
  <meta name="twitter:description" content="Inspect {data?.name}, deployed by {data?.address} - browse contracts and Cadence code on the Flow Blockchain using contractbrowser.com">
</svelte:head>

{#if data && data.uuid}
<ContractView {...data} />
{:else}
<article>
  <p>Contract not found.</p>
</article>
{/if}