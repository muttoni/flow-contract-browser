<script>
import { toHtml } from 'hast-util-to-html'
import { createStarryNight } from '@wooorm/starry-night'
import sourceCadence from '@wooorm/starry-night/lang/source.cadence'
import { detectAndAddAnchorLinksToAccounts } from '$lib/utils'

export let code = '';

$: htmlx = '';

$: createStarryNight([sourceCadence])
    .then((starryNight) => {
      const tree = starryNight.highlight(code, 'source.cadence')
      htmlx = detectAndAddAnchorLinksToAccounts(toHtml(tree))
    })



</script>


<pre><code>{@html htmlx}</code></pre>

<style>
  code, pre {
    color:inherit;
  }

  :global(code a) {
    border-bottom: 1px dotted;
  }
</style>