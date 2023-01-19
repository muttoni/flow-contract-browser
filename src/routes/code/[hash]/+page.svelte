<script>
  import ContractView from '$lib/components/ContractView.svelte';
    import CadenceCode from '../../../lib/components/CadenceCode.svelte';
    import ContractTable from '../../../lib/components/ContractTable.svelte';
  export let data;
</script>

<svelte:head>
  <title>Contracts using this code snippet | Flow Contract Browser</title>
  <meta property="og:title" content="{data?.hash} | Flow Contract Browser" />
</svelte:head>

{#if data && data.hash}
<h1><kbd>{data.type}</kbd></h1>
<CadenceCode code={data.code} />

<h2>Contracts that use this code</h2>
<ContractTable contracts={data.contracts} />
{:else}
<article>
  <p>Could not connect to the database</p>
</article>
{/if}