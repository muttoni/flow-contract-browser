<script>
  import "../app.css";
  import ContractSearcher from '$lib/components/ContractSearcher.svelte';
  import ThemePicker from '$lib/components/ThemePicker.svelte';
  import { theme, network } from '$lib/stores';

let isSearchOpen = false;

function toggleSearch() {
  isSearchOpen = !isSearchOpen;
}
</script>

<main class="container">
  <div class="flex-center nav">
    <div class="flex-center logo-container">
      <a class="logo" href="/">
        <img style="height:45px; width:auto; min-width:134px;" src="/logo{$theme ? `-${$theme}` : ''}.png" alt="logo"/>
      </a>
      <a href="https://{ $network === 'mainnet' ? 'testnet.' : ''}contractbrowser.com" title="Switch network">
        <div class="network-badge {$network === 'mainnet' ? 'success' : 'warning'}">
          {$network}
        </div>
      </a>
      <div class="search-button-container" on:click={toggleSearch}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(162, 175, 185)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>      
      </div>
    </div>
    <div class="search-bar-container {isSearchOpen ? 'mobile' : 'desktop'}">
      <form action="/search" method="GET" data-sveltekit-reload>
        <input class="search-bar {isSearchOpen ? 'mobile' : 'desktop'}" type="search" name="query" placeholder="Search code & contracts"/>
      </form>
    </div>
  </div>


  <ContractSearcher />
  <slot></slot>
</main>

<ThemePicker />

<footer>
ContractBrowser.com | Have feedback or ideas? <a href="https://github.com/muttoni/flow-contract-browser/issues/new" target="_blank" rel="noreferrer">Let me know!</a>
</footer>
  

<style>

a:focus {
  outline: none;
  background: transparent;
  user-select: none;
}

a {
  color: inherit;
}

.nav {
  gap: 1rem;
  padding: 10px 0px;
  align-items: center;
  margin-bottom:20px;
  margin-top:10px;
}

.logo-container {
  gap: 0.5rem;
}

form {
  margin-bottom: 0;
  flex-grow:1;
}

.search-bar {
  border: none;
  border-radius: 4px !important;
  margin-bottom: 0;
  width: 100%;
}

footer {
  text-align: center;
  font-size: 0.7rem;
  margin-top: 50px;
  padding-bottom: 30px;
}

.search-button-container {
  cursor: pointer;
  align-items: center;
  display: none;
}

.search-bar-container {
  display: flex;
  align-items: center;
  width: 100%;
  flex-grow:1;
}

.search-bar-container.mobile {
  display: none;
}

.search-bar.mobile {
  width: 100%;
}

@media (max-width: 768px) {
  .nav {
    flex-direction: column;
    align-items: start;
  }

  .logo-container {
    width:100%;
  }

  .search-button-container {
    display:block;
    margin-left: auto;
    padding:10px;
  }

  .search-bar-container {
    margin-top: 0;
    justify-content: space-between;
  }

  .search-bar-container.mobile {
    display: flex;
  }

  .search-bar-container.desktop {
    display: none;
  }
}

</style>