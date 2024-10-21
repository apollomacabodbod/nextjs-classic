

import getData from "@/components/demo"

export default async function MockData(){


  const data = await getData()

  return (<>

    <p>Date: {data?.datetime?.toLocaleString()}</p>
    
    
  </>)
}

