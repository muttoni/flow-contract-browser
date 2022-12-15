export async function search(term) {
  const raw = await fetch(`${import.meta.env.VITE_DOMAIN}/api/search/${term}`)
  const json = await raw.json()
  const results = json.success && json.data.length > 0 ? json.data.sort((a,b) => b.dependants_count - a.dependants_count) : [];
  return results
}