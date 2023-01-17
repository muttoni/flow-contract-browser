<script>
  import CadenceCode from '../../lib/components/CadenceCode.svelte';
  import ContractTable from '../../lib/components/ContractTable.svelte';

  export let data;

  const contracts = data?.results?.contracts;
  const code = data?.results?.code;
</script>

<h1>Search Results</h1>

<form method="/search" data-sveltekit-reload><input type="search" name="query" placeholder="Search again..."/></form>


<h2>Top {contracts.length} Contracts</h2>
<ContractTable {contracts}></ContractTable>

<h2>Top {Math.min(20, code.length)} Code Snippets</h2>

<ul>
  {#each code.slice(0,20) as snippet}
  <li>
    <kbd>{snippet.type}</kbd>
    <span>Used by {snippet.contracts_count} contracts</span>
    <CadenceCode code={snippet.code}></CadenceCode>
  </li>
  {/each}
</ul>


<style>
  ul, li {
    list-style: none;
    padding:0;
    margin:0;
  }

  span {
    margin-left: 20px;
  }
</style>