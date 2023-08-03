import React, { useContext, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { PokemonContext } from '../Context/PokemonContext';
import logo from "../img/logo.png"

export const Navigation = () => {

const {onInputChange, valueSearch, onResetFrom, searchPokemons}  = useContext (PokemonContext)
 
//..................Funcion de el input buscar.........................//

  //----------El navigate me redirecciona la pagina del search con los muñequitos ------------//
  
          
const [seacrPokemons, setSearchPokemons] = useState([])
const [loading, setLoading] = useState(true)

   const onSearchSubmit = async(e) =>{
    e.preventDefault()
    const response = await searchPokemons(valueSearch)
    setSearchPokemons(response)
    setLoading(false)
   }

return (
    <> 
      <header className='container'>
        <img src={logo} alt="" className='logo' />
     
          
            
                <form onSubmit={onSearchSubmit}>
                <div className='from-group'>
                    <input 
                    type="search" 
                    name='valueSearch'
                    id=''
                    value={valueSearch}
                    onChange={onInputChange}
                    className='input-poke'
                    placeholder='Buscar pokemon'
                    />
                    <button className='btn-search'>Buscar</button>
                </div>
                </form>
                <p>{seacrPokemons.name}</p>
                {
                  seacrPokemons.sprites && (
<img src={seacrPokemons.sprites.back_default} alt="" />
                  )
                }
                
      </header>

        <Outlet />
    </>
  )
}
