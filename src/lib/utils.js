export function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}


export function getContractName(uuid) {
  return uuid.split(".")[2]
}
export function getContractAddress(uuid) {
  return "0x" + uuid.split(".")[1]
}

export function makeContractObjectFromUuid(uuids) {
  return uuids.map((uuid) => {
    return { uuid }
  })
}

export function parseContractImports(code) {
  const regex = /import ([A-Za-z_][A-Za-z0-9_, ]*) +from +(0x[a-f0-9]+)/gm;
  let m;

  while ((m = regex.exec(code)) !== null) {

    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    
    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
      console.log(`Found match, group ${groupIndex}: ${match}`);
    });
  }
}


export function detectAndAddAnchorLinksToAccounts(str) {
  const regex = /(0x[a-f0-9]+)/gm;
  str = str.replace(regex, '<a href="/account/$1">$1</a>')
  return str;
}