<script>
import { toHtml } from 'hast-util-to-html'
import { createStarryNight } from '@wooorm/starry-night'
import sourceCadence from '@wooorm/starry-night/lang/source.cadence'

export let code = '';

$: htmlx = '';

const starryNight = createStarryNight([sourceCadence])
  .then((starryNight) => {
    const tree = starryNight.highlight(code, 'source.cadence')
    htmlx = toHtml(tree)
  })

</script>


<pre><code>{@html htmlx}</code></pre>

<style>
  code, kbd, pre {
    color:inherit;
  }
</style>