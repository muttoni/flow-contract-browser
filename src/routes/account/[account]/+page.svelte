<script>
  import AccountView from '$lib/components/AccountView.svelte';
  export let data;
</script>

<svelte:head>
  <title>Contracts involving {data?.account} | Flow Contract Browser</title>
  <meta property="og:title" content="Contracts involving {data?.account} | Flow Contract Browser" />

</svelte:head>

<AccountView {...data} />