<script>
  import Select from 'svelte-select';
  import Item from '$lib/components/ContractPickerItem.svelte';
  import { search } from '$lib/actions';
  // import { goto } from "$app/navigation";

  let loadOptions = search;
  let itemId = 'uuid';

  let handleSelect = (e) => {
    if(e.detail && e.detail.uuid && window) {
      window.location.href= "/"+ e.detail.uuid;
    }
  }

  let filterText;

</script>

<div class="themed">
  <Select bind:filterText={filterText} {loadOptions} {itemId} hideEmptyState={false} placeholder=" 🔍 Search for contracts or accounts" on:input={handleSelect}>
  	<div class="item" slot="item" let:item>
      <Item {item} />
    </div>

    <div class="" slot="selection" let:selection>
      {selection.uuid}
    </div>

    <svelte:fragment slot="empty">
      <div class="empty">
        {#if filterText?.length < 3}
          <small>Please type at least 3 characters.</small>
        {:else}
          <span>No results found.</span>
        {/if}
      </div>
    </svelte:fragment>  
  </Select>
</div>


<style>
  .empty {
    padding: 30px;
    text-align: center;
  }
</style>