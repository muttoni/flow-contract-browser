import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {

  try {
    const rawStatus = await fetch(`/api/status`)
    const jsonStatus = await rawStatus?.json()
    const status = jsonStatus?.success && jsonStatus?.data ? jsonStatus.data : {}
    if(jsonStatus.success == true) {
      status.success = true
    }
  
    const rawLatest = await fetch(`/api/latest/10`)
    const jsonLatest = await rawLatest?.json()
    const latest = jsonLatest?.success && jsonLatest?.data ? jsonLatest.data : {}

      
    const rawTop = await fetch(`/api/top`)
    const jsonTop = await rawTop?.json()
    const top = jsonTop?.success && jsonTop?.data ? jsonTop.data : {}

    return { status, latest, top};
  } catch(e) {
    console.log(e)
    return {
      status: {},
      latest: [],
      top: [],
    }
  }


}