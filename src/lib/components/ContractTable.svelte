<script>
  //Row component is optional and only serves to render odd/even row, you can use <tr> instead.
  //Sort component is optional

  import Table, { Row } from "$lib/components/table/Table.svelte";
  import {getContractAddress, getContractName} from "$lib/utils"

  export let contracts = [];
  
  export let search = contracts?.length > 10;
  export let showDependencies = true;

  const searchLabel = `Filter ${contracts ? contracts?.length : ''} contracts...` 

  let pageCount = 0; //first page
  let pageSize = 10;

  // function onCellClick(row) {
  //   return;goto(`/${row.uuid}`)
  // }
</script>

<Table
  {pageCount}
  {pageSize}
  {search}
  rows={contracts}
  let:rows={contracts}
  labels={{ 
    empty: "No contracts to show...", 
    placeholder: searchLabel
  }}>
  <thead slot="head">
    <tr>
      <th>Contract Name</th>
      <th>Address</th>
      {#if showDependencies}
      <th>Dependants</th>
      {/if}
    </tr>
  </thead>
  <tbody>
    {#each contracts as row, index (row)}
      <Row {index}>
        <td data-label="Contract name"><a data-sveltekit-reload href="/{row.uuid}">{getContractName(row.uuid)}</a></td>
        <td data-label="Address"><span class="mono"><a data-sveltekit-reload href="/account/{getContractAddress(row.uuid)}">{getContractAddress(row.uuid)}</a></span></td>
        {#if showDependencies}
        <td data-label="Used by" class="text-end"><span class="mono">{row.dependants_count}</span></td>
        {/if}
      </Row>
    {/each}
  </tbody>
</Table>


<style>
  td {
    max-width: 250px;
    text-overflow: ellipsis;
    overflow-y: hidden;
    white-space: nowrap;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;
  }

  td::-webkit-scrollbar {
    display: none;
  }

</style>