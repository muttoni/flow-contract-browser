<script>
  import CadenceCode from '$lib/components/CadenceCode.svelte';
  import CopyBadge from '$lib/components/CopyBadge.svelte';
  export let data;
</script>

<article>
  <hgroup>
    <h2>
      {data.name}
      {#if data?.dependants?.length > 5}
      <div class="claimed-badge success">
        Popular!
      </div>
      {/if}
    </h2>
    <h3>Deployed by <a href="https://flowview.app/account/{data.address}" target="_blank" rel="noreferrer">{data.address}</a></h3>
  </hgroup>
  <div class="grid">
    <div class="mb-1">
      <h3>Basic Information</h3>
      <p>
        <span class="badge-caption">UUID</span><br/><kbd>{data.uuid}</kbd> <CopyBadge text={data.uuid} />
      </p>
      <a role="button" target="_blank" rel="noreferrer" href="https://flow-view-source.com/mainnet/account/{data.address}/contract/{data.name}">View on FlowViewSource</a>
      <p class="mt-1"><span class="badge-caption">Address</span><br/><kbd>{data.address}</kbd> <CopyBadge text={data.address} />
      </p>
      <a role="button" class="" target="_blank" rel="noreferrer" href="https://flowview.app/account/{data.address}">Inspect account on FlowView.app</a>
    </div>
    <div class="">
      <h3>Dependency Information</h3>
      <p class="badge-caption">Depends on <span class="figure">{data.dependencies?.length}</span> contracts </p>
      <ul class="dep-list">
        {#if data.dependencies?.length > 0}
          {#each data.dependencies as dep}
            <li><a href="/{dep}">{dep}</a></li>
          {/each}
        {/if}
      </ul>

      <p class="badge-caption">{data.name} Is Used by  <span class="figure">{data.dependants?.length}</span> contracts </p>
      <ul class="dep-list">
        {#if data.dependants?.length > 0}
          {#each data.dependants as dep}
            <li><a href="/{dep}">{dep}</a></li>
          {/each}
        {/if}
      </ul>

      <!-- {#if data.projectName}
      <div class="project-avatar">
        <img src="{data.projectLogo}" alt="Logo" />
        <span>{data.projectName}</span>
      </div>
      <p><small>{data.projectDescription}</small></p>
      <a role="button" class="secondary" href="{data.projectUrl}">Visit Project Website</a>
      <a role="button" class="secondary outline" href="https://github.com/muttoni/flow-contract-browser/blob/main/src/lib/metadata.js">Edit Metadata</a>
      <hr>
      <span class="badge-caption">Contract Description</span>
      <p class="mb-1">{data.contractDescription}</p>

        <span class="badge-caption">Related Contracts</span>
        <ul>
          {#each data.relatedContracts as relatedContract}
            <li><a href="/{relatedContract}">{relatedContract}</a></li>
          {/each}
        </ul>

      {:else}
      <div class="empty-text">
        <small><center>No metadata available.<br/><a href="https://github.com/muttoni/flow-contract-browser/blob/main/src/lib/metadata.js">Contribute it!</center></small>
        </div>
        {/if} -->
      </div>
    </div>

    <hr>
    <h3>Contract Code <CopyBadge text={data.code}/></h3>

    <CadenceCode code={data.code} />
    
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

