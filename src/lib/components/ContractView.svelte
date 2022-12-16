<script>
  import CadenceCode from '$lib/components/CadenceCode.svelte';
  import CopyBadge from '$lib/components/CopyBadge.svelte';
  
  export let name = '';
  export let dependants = [];
  export let dependencies = [];
  export let address = '0x';
  export let uuid;
  export let code;

  let viewAllDependants = false;
  let depFilter = '';

  $: depFilteredResults = dependants?.filter(x => x.toLowerCase().includes(depFilter.toLowerCase()))
</script>

<article>
  <hgroup>
    <h2>
      {name}
      {#if dependants?.length > 5}
      <div class="claimed-badge success">
        Popular!
      </div>
      {/if}
    </h2>
    <h3>Deployed by <a href="/account/{address}">{address}</a></h3>
  </hgroup>
  <div class="grid">
    <div class="mb-1">
      <h3>Basic Information</h3>
      <p>
        <span class="badge-caption">UUID</span><br/><kbd>{uuid}</kbd> <CopyBadge text={uuid} />
      </p>
      <a role="button" target="_blank" rel="noreferrer" href="https://flow-view-source.com/mainnet/account/{address}/contract/{name}">View on FlowViewSource</a>
      <p class="mt-1"><span class="badge-caption">Address</span><br/><kbd>{address}</kbd> <CopyBadge text={address} />
      </p>
      <a role="button" class="" target="_blank" rel="noreferrer" href="https://flowview.app/account/{address}">Inspect account on FlowView.app</a>
    </div>
    <div class="">
      <h3>Dependency Information</h3>
      <p class="badge-caption">Depends on <span class="figure">{dependencies?.length}</span> contracts </p>
      <ul class="dep-list">
        {#if dependencies?.length > 0}
          {#each dependencies as dep}
            <li><a href="/{dep}">{dep}</a></li>
          {/each}
        {/if}
      </ul>

      <p class="badge-caption">{name} Is Used by  <span class="figure">{dependants?.length}</span> contracts </p>
      {#if dependants?.length > 20}
        <input type="text" bind:value={depFilter} placeholder="Filter...">
      {/if}
      <ul class="dep-list">
        {#if dependants?.length > 0 && viewAllDependants === false}
          {#each depFilteredResults as dep, i}
            {#if i < 50}
            <li><a href="/{dep}">{dep}</a></li>
            {/if}
          {/each}
          {#if dependants.length >= 50}
            <li>... and {dependants.length - Math.min(50, depFilteredResults.length)} more.</li> <button on:click={() => viewAllDependants = true}>Load all</button>
          {/if}
        {/if}

        {#if dependants?.length > 0 && viewAllDependants === true}
          {#each dependants as dep}
            <li><a href="/{dep}">{dep}</a></li>
          {/each}
        {/if}
      </ul>

      <!-- {#if projectName}
      <div class="project-avatar">
        <img src="{projectLogo}" alt="Logo" />
        <span>{projectName}</span>
      </div>
      <p><small>{projectDescription}</small></p>
      <a role="button" class="secondary" href="{projectUrl}">Visit Project Website</a>
      <a role="button" class="secondary outline" href="https://github.com/muttoni/flow-contract-browser/blob/main/src/lib/metajs">Edit Metadata</a>
      <hr>
      <span class="badge-caption">Contract Description</span>
      <p class="mb-1">{contractDescription}</p>

        <span class="badge-caption">Related Contracts</span>
        <ul>
          {#each relatedContracts as relatedContract}
            <li><a href="/{relatedContract}">{relatedContract}</a></li>
          {/each}
        </ul>

      {:else}
      <div class="empty-text">
        <small><center>No metadata available.<br/><a href="https://github.com/muttoni/flow-contract-browser/blob/main/src/lib/metajs">Contribute it!</center></small>
        </div>
        {/if} -->
      </div>
    </div>

    <hr>
    <h3 class="mt-1">Contract Code <CopyBadge text={code}/></h3>

    <CadenceCode code={code} />
    
  </article>
  
  <style>
    
    h2 {
      display:flex;
      justify-content: start;
      vertical-align: middle;
      align-items: center;
    }
    .badge-caption {
      font-size: 0.7rem;
      text-transform: uppercase;
    }
    .claimed-badge {
      margin-left:1rem;
      padding: 0.15rem 0.5rem;
      border: 1px solid var(--green);
      border-radius: 100px;
      color: var(--green);
      font-size: 0.7rem;
      display:inline-block;
    }

    .success {
      color: var(--green);
    }

    .dep-list {
      font-size:0.8rem;
    }

    h3 {
      margin-bottom: 0.8rem;
    }

    .figure {
      font-weight:bold;
    }
  </style>

