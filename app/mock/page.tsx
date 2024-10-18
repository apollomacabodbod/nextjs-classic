"use client"

import AddData from "@/components/addData";

export default function Getdata(){

  const formData = new FormData();

  formData.append("product", "Macbook Air")


  return (
    <>

      <p>test</p>
      <button className="border border-[#50B498] px-6" onClick={(e) => AddData(formData)} >click me</button>
    
    
    </>


  )
}