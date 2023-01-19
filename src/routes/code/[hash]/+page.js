import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {

  let hash = params.hash;

  try {
    const rawHash = await fetch(`/api/search/code/${hash}`)
    const jsonHash = await rawHash.json()
    const hashObj = jsonHash?.success && jsonHash?.data ? jsonHash.data : {}

    const rawContracts = await fetch(`/api/search/code/${hash}/contracts`)
    const jsonContracts = await rawContracts.json()
    const contracts = jsonContracts?.success && jsonContracts?.data ? jsonContracts.data : {}
    return {
      contracts,
      hash,
      ...hashObj
    };
  } catch(e) {
    console.log("Something went wrong...")
    console.log(e);
    return {}
    //throw error(500, "something went wrong")
  }
}

export const ssr = false;