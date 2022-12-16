import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {

  let term = params.account;

  if(term.substring(0,2) === '0x') {
    term = term.substring(2);
  }
  
  try {
    const raw = await fetch(`${import.meta.env.VITE_DOMAIN}/api/search/${term}`)
    const json = await raw.json()
    const results = json.success && json.data.length > 0 ? json.data.sort((a,b) => b.dependants_count - a.dependants_count) : [];
    return { 
      contracts: results, 
      account : term
    }
  } catch(e) {
    console.log("Something went wrong...")
    console.log(e);
    //throw error(500, "something went wrong")
  }
}