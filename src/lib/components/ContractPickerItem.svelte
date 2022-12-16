<script>
	export let item = undefined;	
</script>

<div class="customItem">
  <div class="customItem_name">{item.uuid}</div>
  <div class="customItem_tagline">Used by {item.dependants_count} contracts</div> 
</div>

<style>
  .customItem {
    cursor: default;
    display:flex;
    flex-direction: row;
    gap: 20px;
    height: 80px;
  }

  .customItem_tagline {
    font-size: 0.8rem;
    opacity:0.5;
  }
</style>