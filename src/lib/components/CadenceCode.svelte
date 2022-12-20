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

$: createStarryNight([sourceCadence])
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
</CodeBlock>
