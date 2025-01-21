import axios from "axios"
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";


function App() {
  const [allTypes, setAllTypes] = useState([]);
  const [displayPokemons, setDisplayPokemons] = useState([]);

  async function fetchAllTypes() {
    const response = await axios.get("https://pokeapi.co/api/v2/type?limit=21")
    setAllTypes(response.data.results)
  }

  async function show20Pokemons() {

    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0");
    const temp = response.data.results

    const promises = [];
    const finalData = [];
    temp.forEach((object) => {
      promises.push(axios.get(object.url));
    })

    const temp2 = await Promise.all(promises);


    temp2.forEach(obj => {
      finalData.push(obj.data)
    })
    console.log(finalData)
    setDisplayPokemons(finalData);
  }



  useEffect(() => { fetchAllTypes() }, [])

  useEffect(() => { show20Pokemons() }, [])

  return (
    <>
      <div className="bg-black h-full py-8">
     
        <h1 className="text-yellow-800 text-6xl text-center">Poke - World</h1>
        <div className="flex justify-center my-6">
          <select name="" id="" className="w-30 py-2 capitalize">
            <option value="" disabled>Filter by type</option>
            <option value="all">All Types</option>
            {
              allTypes.map((object, index) => {
                return (
                  <option key={index} value={object.name} className="capitalize">{object.name}</option>
                )
              })
            }</select>
          <input type="text" placeholder="Search for Anything" className="w-80 py-2 pl-4 capi" />
        </div>
      </div>

      <div className="bg-gray-900	relative">
      <FaPlus className="text-white text-xl absolute bottom-16 right-16 cursor-pointer	bg-red-800 w-16 h-16 p-2 rounded-full" />
        <h1 className="text-white text-5xl text-center py-8">Pokemon-List</h1>
        <div className="flex flex-wrap gap-4 items-center justify-evenly px-10">
          {
            displayPokemons.map((object) => {
              return (
                <div key={object.id} className="w-[22%] text-center mb-6">
                  <img src={object.sprites.other.dream_world.front_default} className="w-full h-56" />
                  <h1 className="text-white text-2xl font-bold capitalize my-2">{object.name}</h1>
                  <p className="text-white font-bold my-2 capitalize"> {object.types.map(obj => obj.type.name).toString()}</p>
                </div>
              )

            })
          }
        </div>
      </div>
    </>
  )
}

export default App
