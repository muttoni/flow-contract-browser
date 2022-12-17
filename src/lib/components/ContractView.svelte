<script>
  import CadenceCode from '$lib/components/CadenceCode.svelte';
  import CopyBadge from '$lib/components/CopyBadge.svelte';
  import ContractTable from './ContractTable.svelte';
  import { makeContractObjectFromUuid } from '$lib/utils';
  
  export let name = '';
  export let dependants = [];
  export let dependencies = [];
  export let address = '0x';
  export let uuid;
  export let code;

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
        <a role="button" class="mt-05 mb-1 outline block" target="_blank" rel="noreferrer" href="/account/{address}">All contracts involving {address} &rarr;</a>
      </div>
      <div class="mb-1">
        <p class="badge-caption">Import <CopyBadge text="import {name} from {address}" /></p>
        <CadenceCode code="import {name} from {address}" />
      </div>
    </div>

    <div class="">
      <h3>Dependency Information</h3>

      <p class="badge-caption">Depends on <span class="figure">{dependencies?.length}</span> contracts </p>
      {#if dependencies?.length > 0}
      <ContractTable contracts={makeContractObjectFromUuid([...dependencies])} showDependencies={false}></ContractTable>
      {/if}

      <p class="badge-caption">{name} Is Used by  <span class="figure">{dependants?.length}</span> contracts </p>
      {#if dependants?.length}
      <ContractTable contracts={makeContractObjectFromUuid([...dependants])} showDependencies={false}></ContractTable>
      {/if}
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

    h3 {
      margin-bottom: 0.8rem;
    }

    .figure {
      font-weight:bold;
    }

    kbd {
      max-width: 350px;
      text-overflow: ellipsis;
      overflow-y:hidden;
      white-space: nowrap;
    }
  </style>

