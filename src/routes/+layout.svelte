<script>

  import "../app.css";
  import ContractSearcher from '$lib/components/ContractSearcher.svelte';
  import ThemePicker from '$lib/components/ThemePicker.svelte';

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