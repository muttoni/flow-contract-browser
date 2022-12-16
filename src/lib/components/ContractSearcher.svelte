<script>
  import Select from 'svelte-select';
  import Item from '$lib/components/ContractPickerItem.svelte';
  import { search } from '$lib/actions';
  import { goto } from "$app/navigation";

  let loadOptions = search;
  let itemId = 'uuid';

  let handleSelect = (e) => {
    if(e.detail && e.detail.uuid) {
      goto("/" + e.detail?.uuid)
    }
  }
  
  const getOptionLabel = (option) => option.uuid;

</script>

<div class="themed">
  <Select {loadOptions} {itemId} hideEmptyState={true} placeholder=" 🔍 Search for contracts or accounts" on:input={handleSelect}>
  	<div class="item" slot="item" let:item>
      <Item {item} />
    </div>

    <div class="" slot="selection" let:selection>
      {selection.uuid}
    </div>
  </Select>
</div>
