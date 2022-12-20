<script>
  export let account = '';
  export let contracts = [];
  import ContractTable from './ContractTable.svelte';
</script>

<article>
  <header>
    <hgroup>
      <h2>
        <h2>{account}</h2>
        {#if contracts?.length > 5}
        <div class="claimed-badge success">
          Popular!
        </div>
        {/if}
      </h2>
    </hgroup>
  </header>
  <a role="button" class="mb-1" target="_blank" rel="noreferrer" href="https://flowview.app/account/{account}">Inspect account on FlowView.app</a>
  <div class="mb-1"> 
    <h4>Contracts deployed by <span class="mono">{account}</span></h4>
    {#if contracts?.filter((s) => s.uuid.includes(account.substring(2)))?.length > 0}
    <ContractTable contracts={contracts?.filter((s) => s.uuid.includes(account.substring(2)))}></ContractTable>
    {:else}
    No contracts owned by {account}
    {/if}
  </div>
  <!-- <div>
    <h4>Involving {account}</h4>
    {#if contracts?.filter((s) => !s.uuid.includes(account.substring(2)))?.length > 0}
    <ContractTable contracts={contracts?.filter((s) => !s.uuid.includes(account.substring(2)))}></ContractTable>
    {:else}
    No other contracts involving {account}
    {/if}
  </div>
   -->
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
  
  h2 {
    margin-bottom: 0rem;
  }
  
  h4 {
    margin-top: 40px;
    margin-bottom: 20px;
  }
</style>
