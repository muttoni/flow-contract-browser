<script>
import { toHtml } from 'hast-util-to-html'
import { createStarryNight } from '@wooorm/starry-night'
import sourceCadence from '@wooorm/starry-night/lang/source.cadence'
import { starryNightGutter } from '$lib/gutter'
import { detectAndAddAnchorLinksToAccounts } from '$lib/utils'

export let code = '';
export let link = true;
export let lineNumbers = true;

$: htmlx = '';

$: createStarryNight([sourceCadence])
    .then((starryNight) => {
      let tree = starryNight.highlight(code, 'source.cadence');

      if(lineNumbers) {
        tree = starryNightGutter(tree)
      }

      let html = toHtml(tree)
      
      if(link) {
        html = detectAndAddAnchorLinksToAccounts(html)
      }

      htmlx = html;

    })



</script>


<pre><code class:lineNumbers>{@html htmlx}</code></pre>

<style>
  code, pre {
    color:inherit;
    position:relative;
  }

  :global(code a) {
    border-bottom: 1px dotted;
  }

  :global(code.lineNumbers .line::before) {
    content: attr(data-line-number);
    position:sticky;
    left:0;
    padding-right: 1em; /* space after numbers */
    margin-right: 5px;
    display:inline-block;
    width: 1.7rem;
    text-align: right;
    opacity: 0.2;
    user-select: none;
  }
</style>