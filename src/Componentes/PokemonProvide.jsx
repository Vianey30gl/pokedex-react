import { useEffect, useState } from "react";
import { PokemonContext } from ".././Context/PokemonContext";
import { useFrom } from "../pages/useFrom";


export const PokemonProvide = ({children}) => {

   const [globalPokemons, setGlobalPokemons] = useState([])
   const [allPokemons, setAllPokemons] = useState([])
    const[offset, setOffset] = useState(0);

  //---------------------Utilizar el useFrom--------------------//
        
       const {valueSearch, onInputChange,onResetFrom} = useFrom({
        valueSearch:''
       })

  //.......................Estados de carga..........................//

       const [loading, setLoading] = useState(true)
       const [active, setActive] = useState(false)

 //------ Llamar los 20 bichitos------//
 
        const getAllPokemons = async(limit =20, offset =0 ) =>{
          const baseURL = "https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}"
          const res = await fetch (
            `${baseURL}pokemon?limit=${limit}&offset=${offset}`
            );
            const  data = await res.json();
              const promises = data.results.map(async(pokemon) =>{
                const res = await fetch(pokemon.url)
                const data = await res.json()
                return data
              })

              const results = await Promise.all(promises)
          
              setAllPokemons([...allPokemons, ...results]); 
              setLoading(false) 
     };

//----------------Llamar por ID los pokemons---------------------//

           const getPokemonById = async (id) => {
            const baseURL = "https://pokeapi.co/api/v2/"
             const res = await fetch(`${baseURL}pokemon/${id}`)
              const data = await res.json()
              console.log(data)
                 return data 
           };



        useEffect(()=>{
          getAllPokemons()
        }, [])



        const searchPokemons = async(pokemon) =>{
          const baseUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
          const response = await fetch(baseUrl)
          const lists = await response.json();
          return lists
        };
  
 
   return(
   <PokemonContext.Provider value={{
            valueSearch,
            onInputChange,
            onResetFrom,
            allPokemons,
            globalPokemons,
            getPokemonById,
            searchPokemons
    }}>
    {children}
   </PokemonContext.Provider>
   );
};
      