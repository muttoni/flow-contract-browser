<script>
  import CopyBadge from '../../../../contract-browser/src/lib/components/CopyBadge.svelte';
  import { browser } from '$app/environment'

  export let lineNumbers = true;
  export let code = '';

  let highlightedLine;
  
  
  $: if(browser && location?.hash) {
    if(location.hash && location.hash.substring(1,2) === 'L') {
      highlightedLine = parseInt(location.hash.substring(2))
    }
  }



  let lines = [...Array(code?.split('\n')?.length || 0)];
</script>

<div class="code">
  {#if lineNumbers && lines.length > 0}
  <div class="lines-container">
    <pre><code class="lines">{#each lines as _, i}<a href="#L{i+1}" class:highlighted="{i+1 === highlightedLine}"><span id="L{i+1}" data-line-number="{i+1}">{i+1}
</span></a>{/each}</code></pre>
  </div>
  {/if}
  <div class="code-container">
    <pre><code><slot></slot></code></pre>
    <div class="copy"><CopyBadge text={code} /></div>
  </div>
</div>


<style>
  .code {
    display:flex;
    flex-direction: row;
    justify-content: start;
    max-width:100%;
    align-items: stretch;
    position:relative;
  }

  a.highlighted {
    color: var(--color) !important;
    font-weight:900;
    background-color:var(--mark-background-color);
    padding: 2px 40px;
    margin-right: -40px;
    margin-left: -40px;
    text-align:right;
    border-radius:4px;
  }

  .code, .code-container, .lines-container {
    margin:0;
    padding:0;
  }

  .code-container {
    overflow:scroll;
  }

  .lines-container {
    flex-shrink: 1;
    padding:0;
    position:sticky;
    left:0;
    text-align:right;
    opacity:0.5;
  }

  .lines-container code {
    padding-left:var(--spacing);
    padding-right:var(--spacing);
    width:100%;
    color:var(--code-color);

  }

  .lines-container a {
    text-decoration: none;
    color:inherit;
    border-bottom:none;
  }

  .lines-container span:hover {
    font-weight: bold;
  }

  .copy {
    position:absolute;
    top:calc(var(--spacing)/2);
    right:calc(var(--spacing)/2);
  }

</style>