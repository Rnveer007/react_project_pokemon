import axios from "axios"
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
      <div>
        <h1>Poke - World</h1>
        <div>
          <select name="" id="">
            <option value="" disabled>Filter by type</option>
            <option value="all">All Types</option>
            {
              allTypes.map((object, index) => {
                return (
                  <option className="capitalize" key={index} value={object.name}>{object.name}</option>
                )
              })
            }</select>
          <input type="text" placeholder="Search for Anything" />
        </div>
      </div>

      <div>
        <h1>Pokemon list</h1>
        <div>
          {
            displayPokemons.map((object) => {
              return (
                <div key={object.id}>
                  <img src={object.sprites.other.dream_world.front_default} alt="" />
                  <h1>{object.name}</h1>
                  <p> {object.types.map(obj => obj.type.name).toString()}</p>
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
