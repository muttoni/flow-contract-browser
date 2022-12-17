<script>
  //Row component is optional and only serves to render odd/even row, you can use <tr> instead.
  //Sort component is optional

  import Table, { Row, Sort } from "$lib/components/table/Table.svelte";
  import { sortNumber } from "$lib/components/table/sorting.js";
  import { goto } from '$app/navigation';
  import {getContractAddress, getContractName} from "$lib/utils"

  export let accounts = [];
  export let search = accounts?.length > 25;

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
  rows={accounts}
  labels={{ empty: "No accounts to show..." }}>
  <thead slot="head">
    <tr>
      <th>Address</th>
      <th class="">Contracts Deployed</th>
    </tr>
  </thead>
  <tbody>
    {#each accounts as row, index (row)}
      <Row {index} on:click={() => onCellClick(row)}>
        <td data-label="Address"><span class="mono"><a href="/account/{row.address}">{row.address}</a></span></td>
        <td data-label="Contracts deployed" class="text-end"><span class="mono">{row.contracts_deployed}</span></td>
      </Row>
    {/each}
  </tbody>
</Table>


<style>
  .mono {
    font-family:monospace;
  }
</style>