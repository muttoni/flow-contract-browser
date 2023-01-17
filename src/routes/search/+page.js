import { error } from '@sveltejs/kit';

export const ssr = false;
export const prerender = false;

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, url }) {

  const query = url.searchParams.get('query');

  try {
    const rawContractSearch = await fetch(`/api/search/contract?query=${query}`)
    const jsonContractSearch = await rawContractSearch?.json()
    const contractResults = jsonContractSearch?.success && jsonContractSearch?.data ? jsonContractSearch.data : {}

    const rawCodeSearch = await fetch(`/api/search/code?query=${query}`)
    const jsonCodeSearch = await rawCodeSearch?.json()
    const codeResults = jsonCodeSearch?.success && jsonCodeSearch?.data ? jsonCodeSearch.data : {}

   
    return { 
      results: {
        contracts: contractResults,
        code: codeResults,
        query
      } 
    };
  } catch(e) {
    console.log(e)
    return {
      results: {
      }
    }
  }


}