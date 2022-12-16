<script>
export let account = '';
export let contracts = [];
</script>

<article>
  <hgroup>
    <h2>
      <h2><span class="muted">0x</span>{account}</h2>
      {#if contracts?.length > 5}
      <div class="claimed-badge success">
        Popular!
      </div>
      {/if}
    </h2>
  </hgroup>
  <a role="button" class="mb-1" target="_blank" rel="noreferrer" href="https://flowview.app/account/{account}">Inspect account on FlowView.app</a>
  <div class="mb-1 grid">
    <div>
      <h3>Owned by {account}</h3>
      <ul class="dep-list">
        {#if contracts?.filter((s) => s.uuid.includes(account))?.length > 0}
          {#each contracts?.filter((s) => s.uuid.includes(account)) as c}
            <li><a href="/{c.uuid}">{c.uuid}</a></li>
          {/each}
        {:else}
          No contracts owned by {account}
        {/if}
      </ul>
    </div>
    <div>
      <h3>Involving {account}</h3>
      <ul class="dep-list">
        {#if contracts?.filter((s) => !s.uuid.includes(account))?.length > 0}
          {#each contracts?.filter((s) => !s.uuid.includes(account)) as c}
            <li><a href="/{c.uuid}">{c.uuid}</a></li>
          {/each}
        {:else}
          No contracts involving {account}
        {/if}
      </ul>
    </div>
    </div>
  </article>
  
  <style>
    
    h2 {
      display:flex;
      justify-content: start;
      vertical-align: middle;
      align-items: center;
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

    h2 {
      margin-bottom: 0rem;
    }

    .muted {
      opacity:0.5;
    }
  </style>
