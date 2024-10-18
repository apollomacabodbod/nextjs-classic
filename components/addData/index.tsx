"use server"

export default async function AddData(e: FormData){
   
  const product = e.get("product")?.toString()

  console.log(product)

}