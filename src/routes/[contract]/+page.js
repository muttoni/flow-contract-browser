import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {

  let uuid = params.contract;

  try {
    const raw = await fetch(`/api/contract/${uuid}`)
    const json = await raw.json()
    const contract = json.success && json.data ? json.data : {}
    return contract;
  } catch(e) {
    console.log(e);
    //throw error(500, "something went wrong")
  }


}