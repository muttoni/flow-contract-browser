<script>
  export let data;
</script>

<svelte:head>
  <title>Flow Contract Browser</title>
  <meta property="og:title" content="Flow Contract Browser" />
</svelte:head>


{#if data.latest?.length > 0}

<h2>Latest deployed contracts</h2>

<ul>
  {#each data.latest as contract}
  <li><a href="/{contract.uuid}">{contract.uuid}</a></li>
  {/each}
</ul>
{/if}

<style>
  h2 {
    margin-top: 30px;
    margin-bottom: 10px;
  }
</style>