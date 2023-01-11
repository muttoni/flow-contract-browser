import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({params}) {

  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_BACKEND_API_KEY}`
    }
  };
  
  let res = {};

  try {
    const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/v1/contracts?order_by=dependants_count&order_by_direction=desc&limit=10`, options)
    res = await response.json()
    res.success = true;
  } catch(e) {
    console.log(e)
    res.success = false;
  }

  return json(res);
};