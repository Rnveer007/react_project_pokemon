import axios from "axios"
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";


function App() {
  const [allTypes, setAllTypes] = useState([]);
  const [displayPokemons, setDisplayPokemons] = useState([]);
  const [displayPokemonsCopy, setDisplayPokemonscopy] = useState([])
  const [limit, setLimit] = useState(20);
  const [offset, setOffSet] = useState(0);
  const [loading, setLoading] = useState(false)


  async function fetchAllTypes() {
   try {
    const response = await axios.get("https://pokeapi.co/api/v2/type?limit=21")
    setAllTypes(response.data.results)
    
   } catch (error) {
    console.log(error)
   }
  }

  async function show20Pokemons() {
    try {
        setLoading(true)
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      const temp = response.data.results

      const promises = [];

      temp.forEach((object) => {
        promises.push(axios.get(object.url));
      })

      const temp2 = await Promise.all(promises);


      const finalData = temp2.map((obj) => obj.data)

      setDisplayPokemons((prePokemon) => {
        return [...prePokemon, ...finalData]
      });
      setDisplayPokemonscopy((prePokemon) => {
        return [...prePokemon, ...finalData]
      })

    } catch (error) {
      console.log(error)
      setLoading(false)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAllTypes() }, []);

  useEffect(() => { setLoading(true); show20Pokemons() }, [offset]);

  function handleTypeChangeOfPokemon(event) {
    try {
      setLoading(true)
      const copyPokemons = displayPokemonsCopy
      const finalCopyOfPokemons = [];

      if (event.target.value === "all") {
        setDisplayPokemons(copyPokemons);
      } else {
        copyPokemons.forEach((objects) => {
          objects.types.forEach((obj) => {
            if (obj.type.name === event.target.value) { finalCopyOfPokemons.push(objects) }
          })
        })
        setDisplayPokemons(finalCopyOfPokemons)
      }

    } catch (error) {
      console.log(error)
      setLoading(false)
    }finally{
      setLoading(false)
    }
  }



  return (
    <>

      <div className="bg-black h-full py-8">
        <h1 className="text-yellow-800 text-6xl text-center">Poke - World</h1>
        <div className="flex justify-center my-6">

          <select onChange={handleTypeChangeOfPokemon} name="" id="" className="w-30 py-2 capitalize cursor-pointer">
            <option value="" disabled>
              Filter by type
            </option>
            <option value="all">All Types</option>
            {allTypes.map((object, index) => (
              <option key={index} value={object.name} className="capitalize">
                {object.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search for Anything"
            className="w-80 py-2 pl-4 capitalize"
          />
        </div>
      </div>


      <div className="bg-gray-900 relative">

        <FaPlus
          onClick={() => setOffSet((prevOffset) => prevOffset + limit)}
          className="text-white text-xl fixed bottom-16 right-16 cursor-pointer bg-red-800 w-16 h-16 p-2 rounded-full"
        />
        <h1 className="text-white text-5xl text-center py-8">Pokemon-List</h1>


        {loading ? (
          <div>
            <h1 className=" text-center font-bold text-4xl text-white pb-12">Loading...</h1>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 items-center justify-evenly px-10">
            {displayPokemons.map((object) => (
              <div key={object.id} className="w-[22%] text-center mb-6">

                <img
                  src={object.sprites.other.dream_world.front_default}
                  className="w-full h-56"
                  alt={object.name}
                />

                <h1 className="text-white text-2xl font-bold capitalize my-2">
                  {object.name}
                </h1>

                <p className="text-white font-bold my-2 capitalize">
                  {object.types.map((obj) => obj.type.name).join(", ")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;