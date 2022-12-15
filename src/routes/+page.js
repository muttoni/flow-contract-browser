import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {

  const raw = await fetch(`/api/latest`)
  const json = await raw.json()

  const latest = json.success && json.data ? json.data : {}

  return { latest};

}