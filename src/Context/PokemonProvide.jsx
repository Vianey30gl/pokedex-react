import { useEffect, useState } from "react";
import { PokemonContext } from "./PokemonContext";
import { useFrom } from "../pages/useFrom";

export const PokemonProvide = ({ children }) => {

  const [allPokemons, setAllPokemons] = useState([]);
	const [globalPokemons, setGlobalPokemons] = useState([]);
	const [offset, setOffset] = useState(0);

  //---------UseFrom pa' psasr los muñequitos a la app---------//
        const {valueSearch,onInputChange,onResetFrom} = useFrom({
          valueSearch: ''

        })

  //----Estados----//
  const [loading, setLoading] = useState(true)
  const [active, setactive] = useState(false)

//--------- 20 pokemones Api ----------//
      const getAllPokemons = async (limit = 20) =>{
         const baseURL = 'https://pokeapi.co/api/v2/'

         const res = await fetch (`${baseURL}pokemon?limit=${limit}&offset=${offset}`)
         const data = await res.json();

         const promises = data.results.map(async(pokemon) =>{
            const res = await fetch(pokemon.url)
            const data = await res.json()
            return data
         })
        const resultado = await Promise.all(promises)


        setAllPokemons([...allPokemons, ...resultado]);
        setLoading(false);
         
        }
       
        //----------Todos los muñequitos----------//
          const getglobalPokemones = async() =>{
            const baseURL = 'https://pokeapi.co/api/v2/'

         const res = await fetch (`${baseURL}pokemon?limit=100000&offset=0`)
         const data = await res.json();

         const promises = data.results.map(async(pokemon) =>{
            const res = await fetch(pokemon.url)
            const data = await res.json()
            return data
         })
        const resultado = await Promise.all(promises)
            getglobalPokemones(resultado)
            setLoading(false)
         
          }
      //------------- Tomar el muñequito y mostar info -------------//
          const getPokemonByID = async(id) =>{
            const baseURL = 'https://pokeapi.co/api/v2/'

            const res = await fetch(`${baseURL}pokemon/${id}`)
            const data = await res.json()
            return data
          }




     useEffect(() => {
        getAllPokemons()
     }, [])

     useEffect(() => {
      getglobalPokemones()
     },[])


  return (
          <PokemonContext.Provider value={{
                 valueSearch,
                 onInputChange,
                 onResetFrom,
                 getAllPokemons,
                 getglobalPokemones,
                 getPokemonByID
          }}>
            {children}
          </PokemonContext.Provider>
  );
  
};

