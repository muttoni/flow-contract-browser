import { readable, writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

export const activeContract = writable(null);
export const fullTextSearch = writable(false);
export const isLoadingDB = writable(false);
export const activeContractWithMetadata = derived(activeContract, $activeContract => {
  if($activeContract) {
    let metadata = METADATA[$activeContract.location]
    if(metadata) {
      return { ...$activeContract, ...metadata}
    } else {
      return $activeContract
    }
  } else {
    return $activeContract
  }
})
export const theme = persistentWritable('dark');

// Make any writable store persistent.
export function persistentWritable(key, defaultValue) {
  // Create a writable store.
  const { subscribe, set, update } = writable();

  let storedValue;
  // Get stored value.
  if (browser) {
    storedValue = localStorage.getItem(key);
  }

  // Determine resolved value.
  const resolvedValue = (storedValue === null) ? defaultValue : storedValue;

  // Set resolved value.
  set(resolvedValue);

  // Subscribe to changes.
  subscribe(value => {
    // Store the new value.
    if (browser) {
      localStorage.setItem(key, value);
    }
  });

  return { subscribe, set, update };
}
// export const contractMetadata = derived