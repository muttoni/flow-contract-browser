<script>
  import CadenceCode from '$lib/components/CadenceCode.svelte';
  import CopyBadge from '$lib/components/CopyBadge.svelte';
  import ContractTable from './ContractTable.svelte';
  import { network } from '$lib/stores';
  import { makeContractObjectFromUuid } from '$lib/utils';
  import { getDependants, getDependencies, getDeployments} from '$lib/actions';
  import DeploymentTable from './DeploymentTable.svelte';
  
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
        <a role="button" class="mt-05 block" target="_blank" rel="noreferrer" href="https://f.dnz.dev/{address}/{name}">View on f.dnz.dev</a>
      </div>
      <div class="mb-1">
        <p class="badge-caption">Address <CopyBadge text={address} /></p>
        <kbd>{address}</kbd>
        <a role="button" class="mt-05 block" target="_blank" rel="noreferrer" href="https://{ $network === 'testnet' ? 'testnet.' : ''}flowview.app/account/{address}">Inspect account on FlowView.app</a>
        <a role="button" class="mt-05 mb-1 outline block" target="_blank" rel="noreferrer" data-sveltekit-reload href="/account/{address}">All contracts involving {address} &rarr;</a>
      </div>
      <div class="mb-1">
        <p class="badge-caption">Add to your contract <CopyBadge text="import {name} from {address}" /></p>
        <CadenceCode code="import {name} from {address}" link={false} lineNumbers={false} />
      </div>

      <h3><span class="figure">Contract History</h3>
        {#await getDeployments(uuid)}
        <p class="badge-caption">Loading deployment history...</p>
        {:then deploymentsObject}
        {#if deploymentsObject?.data?.deployments?.length > 0}
        <DeploymentTable deployments={deploymentsObject.data.deployments} ></DeploymentTable>
        {:else}
        <p class="mt-1">
          Could not find any deployment history for this contract. <br/><br/>
        </p>     
        {/if}
        {#if $network === 'testnet'}
        <p class="badge-caption"><strong>Note</strong>: Testnet events are only synced from Jan 1, 2023</p>
        {/if}
        {:catch error}
        <p class="badge-caption">Could not get deployment history.</p>
        {/await}
    </div>

    <div class="">
      <h3>Depends on <span class="figure">{dependencies_count}</span> contracts </h3>
      {#await getDependencies(uuid)}
      <p class="badge-caption">Loading dependencies...</p>
      {:then dependencyObject}
      {#if dependencyObject?.data.dependencies?.length > 0}
      <ContractTable contracts={makeContractObjectFromUuid([...dependencyObject?.data.dependencies])} showDependencies={false}></ContractTable>
      {:else}
      <p class="badge-caption">This contract has no dependencies.</p>
      {/if}
      {:catch error}
      <p class="badge-caption">Could not load dependencies.</p>
      {/await}

      <h3><span class="figure">Imported by {dependants_count}</span> contracts</h3>
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

