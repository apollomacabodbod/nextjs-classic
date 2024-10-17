import getData from "@/components/demo";

export default async function  Page() {

  const data = await getData() 

  const { first_name } = data 


  return (
    <div>
      <h1>Firstname: {first_name}</h1>
      <p></p>
    </div>
  );
}
