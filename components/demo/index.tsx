export default async function getData() {
  const res = await fetch('https://random-data-api.com/api/v2/users', { cache: 'no-store' })
  return res.json()
}


//test2
//test3