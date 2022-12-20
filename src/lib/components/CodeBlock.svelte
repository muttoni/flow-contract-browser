<script>
  export let lineNumbers = true;
  export let code = '';

  let lines = [...Array(code?.split('\n')?.length || 0)];
</script>

<div class="code">
  {#if lineNumbers && lines.length > 0}
  <div class="lines-container">
    <pre><code class="lines">{#each lines as _, i}<span id="#{i+1}" data-line-number="{i+1}">{i+1}
</span>{/each}</code></pre>
  </div>
  {/if}
  <div class="code-container">
    <pre><code><slot></slot></code></pre>
  </div>
</div>


<style>
  .code {
    display:flex;
    flex-direction: row;
    justify-content: start;
    max-width:100%;
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
    padding-left:calc(var(--spacing));
    padding-right:calc(var(--spacing));
    width:100%;
    color:var(--code-color);

  }

</style>