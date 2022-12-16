<script>
  import ContractView from '$lib/components/ContractView.svelte';
  export let data;
</script>

<svelte:head>
  <title>{data?.uuid} | Flow Contract Browser</title>
  <meta property="og:title" content="{data?.uuid} | Flow Contract Browser" />
</svelte:head>

<ContractView {...data} />