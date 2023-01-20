<script>
  import CadenceCode from '../../lib/components/CadenceCode.svelte';
  import ContractTable from '../../lib/components/ContractTable.svelte';

  export let data;

  const contracts = data?.results?.contracts || [];
  const code = data?.results?.code || [];

  let filterBy = 'all';
</script>

<h1>Search Results for '{data?.results?.query}'</h1>

<form method="/search" data-sveltekit-reload><input type="search" name="query" placeholder="Search again in contracts and code..."/></form>


<h2>Contracts containing '{data?.results?.query}'</h2>
<ContractTable {contracts}></ContractTable>

<h2>Code snippets containing '{data?.results?.query}'</h2>
<br/>

<label for="filter">Filter by snippet type</label>
<select id="filter" required bind:value={filterBy}>
  <option value="all" selected>All types</option>
  <option value="resource">Resources</option>
  <option value="struct">Structs</option>
  <option value="interface">Interfaces</option>
  <option value="function">Functions</option>
  <option value="enum">Enums</option>
  <option value="event">Events</option>
</select>

<ul>
  {#each code.filter(i => filterBy === 'all' ? i : i.type.includes(filterBy)).slice(0,20) as snippet}
  <li>
    <div>
      <kbd>{snippet.type}</kbd>
      <a href="/code/{snippet.code_hash}">Used by {snippet.contracts_count} contracts &rarr;</a>
    </div>
    <CadenceCode code={snippet.code} lineNumbers={false}></CadenceCode>
  </li>
  {/each}
</ul>


<style>
  ul, li {
    list-style: none;
    padding:0;
    margin:0;
  }

  li {
    margin-bottom: var(--spacing);
  }

  kbd {
    margin-right: var(--spacing);
  }

  div {
    margin-bottom: var(--spacing);
  }
</style>