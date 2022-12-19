<script>
  import ContractView from '$lib/components/ContractView.svelte';
  export let data;
</script>

<svelte:head>
  <title>{data?.name} by {data?.address} | Flow Contract Browser</title>
  <meta property="og:title" content="{data?.uuid} | Flow Contract Browser" />
</svelte:head>

{#if data && data.uuid}
<ContractView {...data} />
{:else}
<article>
  <p>Could not connect to the database</p>
</article>
{/if}