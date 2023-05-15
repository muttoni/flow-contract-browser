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

  function resetSnippetPagination() {
    snippetPaginationStart = 0;
  }
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
<select id="filter" on:change={resetSnippetPagination} required bind:value={filterBy}>
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
    <a href="/code/{snippet.code_hash}" class="search-result-link">
    <div class="search-result-container">
      <div class="search-result-header">
        <kbd>{snippet.type}</kbd>
        <span>Used by {snippet.contracts_count} contracts &rarr;</span>
        <a role="button" class="secondary" style="margin-left:auto;" href="/code/{snippet.code_hash}">View</a>
      </div>
      <div class="code-snippet-mask">
        <CadenceCode code={snippet.code} lineNumbers={false}></CadenceCode>
          {#if snippet.code.split("\n").length > 5}
          <div class="code-snippet-mask-shadow"></div>
          {/if}
        </div>
      </div>
    </a>
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
  .search-result-link {
    all:unset;
    cursor:pointer;
  }

  .search-result-container {
    border: var(--border-width) solid var(--muted-border-color);
    border-radius: 4px;
  }

  .search-result-container:hover {
    border: var(--border-width) solid var(--primary);
  }

  .search-result-header {
    padding: var(--spacing);
    align-items: center;
    display:flex;
  }

  .code-snippet-mask {
    max-height: 200px;
    overflow:hidden;
    position:relative;
  }

  .code-snippet-mask-shadow {
    position:absolute;
    bottom:0;
    left:0;
    right:0;
    height: 100px;
    background-image: linear-gradient(to bottom, transparent, var(--code-background-color));
  }
</style>