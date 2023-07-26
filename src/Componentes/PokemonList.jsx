import React, { useContext } from 'react'
import { CardPokemon } from'./CardPokemon'
import { PokemonContext } from '../Context/PokemonContext'

export const PokemonList = () => {

const {allPokemons} = useContext(PokemonContext)


  return (
    <>
     <div className="card-list-pokemon contaner">
           {allPokemons.map(pokemon => (
           <CardPokemon pokemon={pokemon} key={pokemon.id} />
           ))}
     </div>
     </>
  );
}
