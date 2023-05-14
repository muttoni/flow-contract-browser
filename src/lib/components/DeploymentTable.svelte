<script>
  //Row component is optional and only serves to render odd/even row, you can use <tr> instead.
  //Sort component is optional

  import Table, { Row } from "$lib/components/table/Table.svelte";

  export let deployments = [];

  console.log(deployments)
  
  export let search = deployments?.length > 10;

  // const searchLabel = `Filter ${contracts ? contracts?.length : ''} contracts...` 
  const searchLabel = `Filter deployments...` 

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
  rows={deployments}
  let:rows={deployments}
  labels={{ 
    empty: "No deployment history to show...", 
    placeholder: searchLabel
  }}>
  <thead slot="head">
    <tr>
      <th>Event</th>
      <th>Block</th>
      <th>Date</th>
    </tr>
  </thead>
  <tbody>
    {#each deployments as row, index (row)}
      <Row {index}>
        <td data-label="Event">{row.type}</td>
        <td data-label="Block"><span class="mono"><a data-sveltekit-reload href="https://f.dnz.dev/{row.tx_id}">{row.block_height} 🔗</a></span></td>
        <td data-label="Date">{new Date(row.block_timestamp).toLocaleDateString()}</td>
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

  .muted {
    color:var(--muted-color);
    display:none;
  }

  @media screen and (max-width: 520px) {
    .hideable {
      display:none;
    }
    .muted {
      display:block;
    }
  }

</style>