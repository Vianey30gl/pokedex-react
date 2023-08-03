 // ----------------- Funcion de Buscar los bichos -------------------------//
import React, { useContext } from 'react'
import { PokemonContext } from '../Context/PokemonContext'
import { useLocation } from 'react-router-dom'
import { CardPokemon } from '../Componentes/CardPokemon'

//.......... Que filtre los muñequitos con el nombre ............//


  export const SearchPage = () => {
	const location = useLocation();

	const { globalPokemons } = useContext(PokemonContext);

	const filteredPokemons = globalPokemons.map(pokemon =>
		pokemon.name.includes(location.state.toLowerCase().trim)
	);

	return (
		<div className='container'>
			<p className='p-search'>
				Se encontraron <span>{filteredPokemons.length}</span>{' '}
				resultados:
			</p>
			<div className='card-list-pokemon container'>
				{filteredPokemons.map(pokemon => (
					<CardPokemon pokemon={pokemon} key={pokemon.id} />
				))}
			</div>
		</div>
	);
};

 