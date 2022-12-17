<script>
  //Row component is optional and only serves to render odd/even row, you can use <tr> instead.
  //Sort component is optional

  import Table, { Row, Sort } from "$lib/components/table/Table.svelte";
  import { sortNumber } from "$lib/components/table/sorting.js";
  import { goto } from '$app/navigation';
  import {getContractAddress, getContractName} from "$lib/utils"

  export let contracts = [];
  export let search = contracts?.length > 25;

  let pageCount = 0; //first page
  let pageSize = 25;


  function onCellClick(row) {
    return;goto(`/${row.uuid}`)
  }

  function onSortNumber(event) {
    event.detail.rows = sortNumber(
      event.detail.rows,
      event.detail.dir,
      event.detail.key
    );
  }
</script>

<Table
  {pageCount}
  {pageSize}
  {search}
  rows={contracts}
  labels={{ empty: "No contracts to show..." }}>
  <thead slot="head">
    <tr>
      <th>Contract Name</th>
      <th>Address</th>
      <th>Dependants</th>
    </tr>
  </thead>
  <tbody>
    {#each contracts as row, index (row)}
      <Row {index} on:click={() => onCellClick(row)}>
        <td data-label="Contract name"><a href="/{row.uuid}">{getContractName(row.uuid)}</a></td>
        <td data-label="Address"><span class="mono"><a href="/account/{getContractAddress(row.uuid)}">{getContractAddress(row.uuid)}</a></span></td>
        <td data-label="Used by" class="text-end"><span class="mono">{row.dependants_count}</span></td>
      </Row>
    {/each}
  </tbody>
</Table>


<style>
  .mono {
    font-family:monospace;
  }
</style>