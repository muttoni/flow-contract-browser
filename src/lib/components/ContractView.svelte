<script>
  import CadenceCode from '$lib/components/CadenceCode.svelte';
  import CopyBadge from '$lib/components/CopyBadge.svelte';
  import ContractTable from './ContractTable.svelte';
  import { makeContractObjectFromUuid } from '$lib/utils';
  import { getDependants, getDependencies} from '$lib/actions';
  
  export let name = '';
  export let address = '0x';
  export let dependants_count = 0;
  export let dependencies_count = 0;
  export let uuid;
  export let code;

</script>

<article>
  <header>
    <hgroup>
      <h2>
        {name}
        {#if dependants_count > 5}
        <div class="claimed-badge success">
          Popular!
        </div>
        {/if}
      </h2>
      <h3>Deployed by <a data-sveltekit-reload href="/account/{address}">{address}</a></h3>
    </hgroup>
  </header>

  <div class="grid">
    <div>
      <div class="mb-1">
        <h3>Basic Information</h3>
        <p class="badge-caption">Location <CopyBadge text={uuid} /></p>
        <kbd>{uuid}</kbd>
        <a role="button" class="mt-05 block" target="_blank" rel="noreferrer" href="https://flow-view-source.com/mainnet/account/{address}/contract/{name}">View on FlowViewSource</a>
      </div>
      <div class="mb-1">
        <p class="badge-caption">Address <CopyBadge text={address} /></p>
        <kbd>{address}</kbd>
        <a role="button" class="mt-05 block" target="_blank" rel="noreferrer" href="https://flowview.app/account/{address}">Inspect account on FlowView.app</a>
        <a role="button" class="mt-05 mb-1 outline block" target="_blank" rel="noreferrer" data-sveltekit-reload href="/account/{address}">All contracts involving {address} &rarr;</a>
      </div>
      <div class="mb-1">
        <p class="badge-caption">Import <CopyBadge text="import {name} from {address}" /></p>
        <CadenceCode code="import {name} from {address}" link={false} lineNumbers={false} />
      </div>
    </div>

    <div class="">
      <h3>Dependency Information</h3>

      <p class="badge-caption">Depends on <span class="figure">{dependencies_count}</span> contracts </p>
      {#await getDependencies(uuid)}
      <p class="badge-caption">Loading dependencies...</p>
      {:then dependencyObject}
      {#if dependencyObject?.data.dependencies?.length > 0}
      <ContractTable contracts={makeContractObjectFromUuid([...dependencyObject?.data.dependencies])} showDependencies={false}></ContractTable>
      {/if}
      {:catch error}
      <p class="badge-caption">Could not load dependencies.</p>
      {/await}

      <p class="badge-caption">{name} is used by <span class="figure">{dependants_count}</span> contracts </p>
      {#await getDependants(uuid)}
      <p class="badge-caption">Loading dependants...</p>
      {:then dependantsObject}
      {#if dependantsObject?.data.dependants?.length > 0}
      <ContractTable contracts={makeContractObjectFromUuid([...dependantsObject?.data.dependants])} showDependencies={false}></ContractTable>
      {/if}
      {:catch error}
      <p class="badge-caption">Could not load dependants.</p>
      {/await}

      </div>
    </div>

    <hr>
    
    
  </article>
  <article>
    <header>
      <h2>Contract Code <CopyBadge text={code}/></h2>
    </header>
    <CadenceCode code={code} />
  </article>
  <style>
    
    h2 {
      display:flex;
      justify-content: start;
      vertical-align: middle;
      align-items: center;
      gap: 10px;
    }

    hgroup {
      margin-bottom:0;
    }
    .badge-caption {
      font-size: 0.7rem;
      margin-top:1.5rem;
      text-transform: uppercase;
    }
    .claimed-badge {
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

    .figure {
      font-weight:bold;
    }

    kbd {
      max-width: 100%;
      text-overflow: ellipsis;
      overflow-y:hidden;
      white-space: nowrap;
    }
  </style>

