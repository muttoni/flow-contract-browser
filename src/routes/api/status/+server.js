import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({fetch}) {

  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_BACKEND_API_KEY}`
    }
  };
  
  let res = {};

  try {
    const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/v1/status`, options)
    res = await response.json()
    res.success = true;
  } catch(e) {
    console.log(e)
    res.success = false;
  }

  return json(res);
};