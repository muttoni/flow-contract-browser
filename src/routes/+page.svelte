<script>
  export let data;
</script>

{#if data.latest?.length > 0}

<h1>Latest deployed contracts</h1>

<ul>
  {#each data.latest as contract}
  <li><a href="/{contract.uuid}">{contract.uuid}</a></li>
  {/each}
</ul>
{/if}