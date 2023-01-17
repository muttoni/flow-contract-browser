<script>
  import "../app.css";
  import ContractSearcher from '$lib/components/ContractSearcher.svelte';
  import ThemePicker from '$lib/components/ThemePicker.svelte';
</script>

<nav class="container-fluid">
  <ul>
    <li><h1 class="logo"><a href="/"><img src="/logo.png" alt="logo"/><span class="flow">flow</span><span class="light-text">Contract Browser</span></a></h1></li>
  </ul>
  <ul class="grow">
    <li>
      <form action="/search" method="GET" data-sveltekit-reload><input type="search" name="query" placeholder="Search code & contracts"/></form>
    </li>
  </ul>
</nav>

<main class="container">
  <ContractSearcher />
  <slot></slot>
</main>

<ThemePicker />

<footer>
ContractBrowser.com | Have feedback or ideas? <a href="https://github.com/muttoni/flow-contract-browser/issues/new" target="_blank" rel="noreferrer">Let me know!</a>
</footer>
  

<style>


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
  
  a {
    color: inherit;
  }

  .logo {
    white-space: nowrap;
  }

  nav.container-fluid {
    align-items:center;
    gap:40px;
  }

  nav form {
    margin-bottom:0;
  }

  .grow {
    flex-grow:1;
  }

  .grow input {
    width:100%;
  }

  nav ul.grow {
    justify-content: end;
  }

  .light-text {
    font-weight: 100;
    font-size: 1.8rem;
    text-transform: uppercase;
    letter-spacing: normal;
  }

  nav {
    margin-bottom:20px;
  }

  h1 {
    margin:0;

  }
  @media (max-width:730px){

    .flow {
      display:none
    }
  
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