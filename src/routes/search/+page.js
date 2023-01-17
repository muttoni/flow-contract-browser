import { error } from '@sveltejs/kit';

export const ssr = false;
export const prerender = false;

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, url }) {

  try {
    const rawContractSearch = await fetch(`/api/search/${url.searchParams.get('query')}`)
    const jsonContractSearch = await rawContractSearch?.json()
    const contractResults = jsonContractSearch?.success && jsonContractSearch?.data ? jsonContractSearch.data : {}

    const rawCodeSearch = await fetch(`/api/search/code?query=${url.searchParams.get('query')}`)
    const jsonCodeSearch = await rawCodeSearch?.json()
    const codeResults = jsonCodeSearch?.success && jsonCodeSearch?.data ? jsonCodeSearch.data : {}

   
    return { 
      results: {
        contracts: contractResults,
        code: codeResults
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