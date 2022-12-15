import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {

  let uuid = params.contract;

  const raw = await fetch(`${import.meta.env.VITE_DOMAIN}/api/contract/${uuid}`)
  const json = await raw.json()

  const contract = json.success && json.data ? json.data : {}

  return contract;

}