<script>
import starry from '$lib/starrynight'
import { onMount } from 'svelte';
import CodeBlock from './CodeBlock.svelte';

export let code = '';
export let link = true;
export let lineNumbers = true;

$: htmlx = '';

onMount(async () => {
  htmlx = await starry.processCode(code, link);
  // Use the processed HTML
})

</script>


<CodeBlock {lineNumbers} {code}>
  {@html htmlx}
</CodeBlock>
