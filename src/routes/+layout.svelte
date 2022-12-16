<script>

  import "../app.css";
  import { onMount } from 'svelte';
  import { theme } from '$lib/stores';
  import ContractSearcher from '../lib/components/ContractSearcher.svelte';

  let toggleTheme;

  onMount(() => {
    let html = document.querySelector("html");
    html.setAttribute("data-theme", $theme);

    toggleTheme = () => {
      let newTheme = $theme === "light" ? "dark" : "light";
      $theme = newTheme;
      html.setAttribute("data-theme", $theme);
    };
  });
</script>


<main class="container">
  
 <a href="/">
    <div class="logo">
      <img src="/logo.png" alt="logo"/>
      <h1>flow <span class="light-text">Contract Browser</span></h1>
    </div>
  </a>
  <ContractSearcher />
  <slot></slot>
</main>

  <a class="theme-toggle" href="/" on:click|preventDefault={toggleTheme}>
    {#if $theme === "light"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-moon-fill"
        viewBox="0 0 16 16">
        <path
          d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
      </svg>
    {:else}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-sun-fill"
        viewBox="0 0 16 16">
        <path
          d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
      </svg>
    {/if}
  </a>

<footer>
ContractBrowser.com | Have feedback or ideas? <a href="https://github.com/muttoni/flow-contract-browser/issues/new" target="_blank" rel="noreferrer">Let me know!</a>
</footer>
  

<style>

  .theme-toggle {
    padding: 0;
    height: 45px;
    width: 45px;
    background-color: var(--primary-focus);
    border-top-left-radius: 50%;
    display: inline-block;
    text-align: center;
    justify-content: center;
    display: flex;
    vertical-align: middle;
    align-items: center;
    position:fixed;
    right: 0;
    bottom:0;
  }

  img {
    margin-right: 1rem;
    height:60px;
    width: 60px;
  }

  a:focus{
    outline:none;
    background:transparent;
    user-select: none;
  }

  .light-text {
    font-weight: 100;
    font-size: 1.8rem;
    text-transform: uppercase;
    letter-spacing: normal;
  }

  .logo {
    display:flex;
    align-items: center;
    padding: 20px 0px;
  }

  h1 {
    margin:0;

  }
  @media (max-width:730px){
  
    h1 {
      font-size: 1.5rem;
    }

    .light-text {
      font-size: 1.2rem;
    }

    img {
      height: 40px;
      width: 40px;
    }
  }

  footer {
    text-align:center;
    font-size: 0.6rem;
    padding-bottom: 30px;
  }

</style>