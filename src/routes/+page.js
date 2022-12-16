import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {

  const rawStatus = await fetch(`/api/status`)
  const jsonStatus = await rawStatus.json()
  const status = jsonStatus.success && jsonStatus.data ? jsonStatus.data : {}
  if(jsonStatus.success = true) {
    status.success = true
  }

  const rawLatest = await fetch(`/api/latest`)
  const jsonLatest = await rawLatest.json()
  const latest = jsonLatest.success && jsonLatest.data ? jsonLatest.data : {}

  return { status, latest};

}