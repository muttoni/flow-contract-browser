import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {

  let term = params.account;

  if(term.substring(0,2) === '0x') {
    term = term.substring(2);
  }

  term = "A."+term;
  
  try {
    console.log("fetching..")
    const raw = await fetch(`${import.meta.env.VITE_DOMAIN}/api/search/${term}`)
    const json = await raw.json()
    const results = json.success && json.data.length > 0 ? json.data.sort((a,b) => b.dependants_count - a.dependants_count) : [];
    console.log(results, term)
    return { 
      contracts: results, 
      account : params.account
    }
  } catch(e) {
    console.log("Something went wrong...")
    console.log(e);
    return { contracts: [], account: params.account}
    //throw error(500, "something went wrong")
  }
}
