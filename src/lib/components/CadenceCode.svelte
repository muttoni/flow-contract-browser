<!-- <script>
  import cadenceHighlighter from '$lib/cadencehighlighter'
  import { onMount } from 'svelte';
  import CodeBlock from './CodeBlock.svelte';
  
  export let code = '';
  export let link = true;
  export let lineNumbers = true;
  
  $: htmlx = '';
  
  onMount(async () => {
    htmlx = await cadenceHighlighter.processCode(code, link);
  })
</script>


<CodeBlock {lineNumbers} {code}>
  {@html htmlx}
</CodeBlock> -->


<script>
  import { toHtml } from 'hast-util-to-html'
  import { createStarryNight } from '@wooorm/starry-night'
  import sourceCadence from '@wooorm/starry-night/lang/source.cadence'
  import { detectAndAddAnchorLinksToAccounts } from '$lib/utils'
  import CodeBlock from './CodeBlock.svelte';
  
  export let code = '';
  export let link = true;
  export let lineNumbers = true;
  
  $: htmlx = '';
  
  function myWasm(){
    return new URL('/onig.wasm', window.location.href);
  }
  $: createStarryNight([sourceCadence], {getOnigurumaUrlFetch: myWasm})
  .then((starryNight) => {
    let tree = starryNight.highlight(code, 'source.cadence');
    
    let html = toHtml(tree)
    
    if(link) {
      html = detectAndAddAnchorLinksToAccounts(html)
    }
    
    htmlx = html;
    
  })
  
  
  
</script>


<CodeBlock {lineNumbers} {code}>
  {@html htmlx}
  <!-- {code} -->
</CodeBlock>