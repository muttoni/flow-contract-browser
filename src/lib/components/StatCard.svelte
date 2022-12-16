<script>
  export let number;
  export let label;
</script>
<div>
  <h1>{number}</h1>
  <span>{label}</span>
</div>

<style>
  h1 {
    margin-bottom: 5px;
    font-size: 3rem;
  }
  div {
    text-align:center;
  }
</style>