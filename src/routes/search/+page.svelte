<script>
  import CadenceCode from '../../lib/components/CadenceCode.svelte';
  import ContractTable from '../../lib/components/ContractTable.svelte';

  export let data;

  const contracts = data?.results?.contracts || [];
  const code = data?.results?.code || {};
  const snippets = code?.snippets;
  const totalSnippets = code?.total_snippets_count;

  console.log(code)

  let filterBy = 'all';
  let snippetPaginationStart = 0;
  let snippetPaginationAmount = 20;
</script>

{#if data?.results}
<h1>Search Results for '{data?.results?.query}'</h1>

<form method="/search" data-sveltekit-reload><input type="search" name="query" placeholder="Search again in contracts and code..."/></form>


<h2>Contracts containing '{data?.results?.query}'</h2>
<ContractTable {contracts}></ContractTable>

{#if snippets?.length > 0}
<h2>Code snippets containing '{data?.results?.query}' ({totalSnippets})</h2>
<br/>

<label for="filter">Filter by snippet type</label>
<select id="filter" required bind:value={filterBy}>
  <option value="all" selected>All types ({totalSnippets})</option>
  <option value="resource">Resources ({(snippets.filter(i => i.type.includes('resource'))).length})</option>
  <option value="struct">Structs ({(snippets.filter(i => i.type.includes('struct'))).length})</option>
  <option value="interface">Interfaces ({(snippets.filter(i => i.type.includes('interface'))).length})</option>
  <option value="function">Functions ({(snippets.filter(i => i.type.includes('function'))).length})</option>
  <option value="enum">Enums ({(snippets.filter(i => i.type.includes('enum'))).length})</option>
  <option value="event">Events ({(snippets.filter(i => i.type.includes('event'))).length})</option>
</select>

<ul>
  {#each snippets.filter(i => filterBy === 'all' ? i : i.type.includes(filterBy)).slice(snippetPaginationStart, snippetPaginationStart+snippetPaginationAmount) as snippet}
  <li>
    <div>
      <kbd>{snippet.type}</kbd>
      <a href="/code/{snippet.code_hash}">Used by {snippet.contracts_count} contracts &rarr;</a>
    </div>
    <CadenceCode code={snippet.code} lineNumbers={false}></CadenceCode>
  </li>
  {/each}
</ul>

<div class="d-flex">
  <button disabled="{snippetPaginationStart === 0}" on:click={()=> {snippetPaginationStart -= snippetPaginationAmount}}>Previous</button>
  &nbsp;
  <button disabled="{snippetPaginationStart + snippetPaginationAmount >= totalSnippets}" on:click={()=> {snippetPaginationStart += snippetPaginationAmount}}>Next</button>
</div>
Showing {snippetPaginationStart} - {snippetPaginationStart + snippetPaginationAmount} of {totalSnippets} 
{/if}
{:else}
<h1>Search all contracts and code</h1>
<form method="/search" data-sveltekit-reload><input type="search" name="query" placeholder="Search across all contracts and their code..."/></form>

{/if}

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