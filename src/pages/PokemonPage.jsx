import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../Componentes/Loader';
import { PokemonContext } from '../Context/PokemonContext';
import { primerMayuscula } from '../helper/helper';

export const PokemonPage = () => {
	const { getPokemonById } = useContext(PokemonContext);

	const [loading, setLoading] = useState(true);
	const [pokemon, setPokemon] = useState({});


	const { id } = useParams();

	const fetchPokemon = async id => {
		const data = await getPokemonById(id);
		setPokemon(data);
		setLoading(false);
	}; 

	useEffect(()=>{
		fetchPokemon(id)
	}, [])

	




	const [evolutions, setEvolution] = useState([])
	const [evolution2, setEvolution2] = useState([])
	const [imageEvolutions, setImageEvolution] = useState([])
	const [imgenEvolutions2, setImagenEveolution2] = useState([])
	const [evolutions0, setEvolutions0] = useState([])
	const [evolutionsName0, setEvolutionsName0] = useState([])


//----------------- FECH DE LOS MUÑEQUITOS------------------------//
	const fetchPokemons = async(id) =>{
	  const response = await getPokemonById(id)
	  const responseSpecies = await fetch(response.species?.url)
	  const responseJson = await responseSpecies.json();
	  const responseEvolution = await fetch(responseJson.evolution_chain?.url)
	  const responseChain = await responseEvolution.json();
	  
  
	 const Evo0 = responseChain.chain?.species.name;
	 
	 const Evo = responseChain.chain?.evolves_to[0]?.species.name;
	
	 const evulutionChain = responseChain.chain?.evolves_to[0]?.evolves_to[0]?.species.name;
	 
  
  setEvolutionsName0(Evo0)
	 fechImgPokemons(Evo0, setEvolutions0)
  
  
	 
	 setEvolution(evulutionChain)
	 fechImgPokemons(evulutionChain, setImageEvolution)
	  setPokemon(response)
	  
	   setEvolution2(Evo)
	  fechImgPokemons(Evo, setImagenEveolution2)
  
	}
//----------------- FECH DE LAS IMAGENES DE LOS BICHOS------------------------//
	const fechImgPokemons = async(id, setImage) =>{
		const baseUrl = `https://pokeapi.co/api/v2/pokemon/${id}`
		const response = await fetch(baseUrl)
	 
		const lits = await response.json()
		
		const imageEvolution = lits.sprites.front_default
	
		setImage(imageEvolution)  
	
	  } 
	  useEffect(() => {
		fetchPokemons(id);
	}, []);

	return (
		<main className='container main-pokemon'>
			{loading ? (
				<Loader />
			) : (
				<>
					<div className='header-main-pokemon'>
						<span className='number-pokemon'>#{pokemon.id}</span>
						<div className='container-img-pokemon'>
							<img
								src={pokemon.sprites.other.dream_world.front_default}
								alt={`Pokemon ${pokemon?.name}`}
							/>
						</div>

						<div className='container-info-pokemon'>
							<h1>{primerMayuscula(pokemon.name)}</h1>
							<div className='card-types info-pokemon-type'>
								{pokemon.types.map(type => (
									<span key={type.type.name} className={`${type.type.name}`}>
										{type.type.name}
									</span>
								))}
							</div>
							<div className='info-pokemon'>
								<div className='group-info'>
									<p>Altura</p>
									<span>{pokemon.height}</span>
								</div>
								<div className='group-info'>
									<p>Peso</p>
									<span>{pokemon.weight}KG</span>
								</div>
							</div>
						</div>
					</div>

					<div className='container-stats'>
						<h1>Estadísticas</h1>
						<div className='stats'>
							<div className='stat-group'>
								<span>Vida</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats[0].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Ataque</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats[1].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Defensa</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats[2].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Ataque Especial</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats[3].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Defensa Especial</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats[4].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Velocidad</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats[5].base_stat}
								</span>
								<div className='evoluciones'>
																		
								<p>{evolutionsName0}</p>
                                  <img src={evolutions0} alt="" />


                                <p>{evolution2}</p>
                                  <img src={imgenEvolutions2} alt="" />


                                <p>{evolutions}</p>
                                 <img src={imageEvolutions} alt="" />
								</div>
							</div>
						</div>
					</div>
				</>
				
			)}
		</main>
	);
};