<script>
  import AccountView from '$lib/components/AccountView.svelte';
  export let data;
</script>

<svelte:head>
  <title>Contracts deployed by {data?.account} | Flow Contract Browser</title>
  <meta property="og:title" content="Contracts involving {data?.account} | Flow Contract Browser" />

</svelte:head>

{#if data}
<AccountView {...data} />
{:else}
<article>
  <p>Could not connect to the database.</p>
</article>
{/if}