<script>
  import Select from 'svelte-select';
  import Item from '$lib/components/ContractPickerItem.svelte';
  import { activeContract } from '$lib/stores';
  import { search } from '$lib/actions';
  import { goto } from "$app/navigation";

  let loadOptions = search;
  let itemId = 'uuid';

  let handleSelect = (e) => {
    $activeContract = e.detail
    goto("/" + e.detail.uuid)
  }
  
  const getOptionLabel = (option) => option.uuid;

</script>

<div class="themed">
  <Select {loadOptions} {itemId} value={$activeContract} hideEmptyState={true} {getOptionLabel} placeholder=" 🔍 Search for Contracts" on:input={handleSelect} isVirtualList={true}>
  	<div class="item" slot="item" let:item let:index>
      <Item {item} />
    </div>

    <div class="" slot="selection" let:selection>
      {selection.uuid}
    </div>
  </Select>
</div>


<style>

</style>
