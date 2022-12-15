<script>
	export let item = undefined;	
</script>

<div class="customItem">
    <div class="customItem_title">
      <div class="customItem_name">{item.uuid}</div>
      <div class="customItem_tagline">Used by {item.dependants_count} contracts | Imports {item.dependencies_count} contracts</div> 
    </div>
</div>