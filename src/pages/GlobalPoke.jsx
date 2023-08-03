import React from "react";
import Paginacion from "./Paginacion";
import { CardPokemon } from "../Componentes/CardPokemon";


const globalPoke = (props) => {
    const { pokemons, pagina, setPagina, total, loading } = props;
  
    const lastPage = () => {
      const nextPage = Math.max(pagina - 1, 0);
     console.log(nextPage);
    };
  
    const nextPage = () => {
      const nextPage = Math.min(pagina + 1, total - 1);
      setPagina(nextPage);
    };
  
    return (
      <div>
        {loading ? (
          <div className="Cargando">Cargando.....</div>
        ) : (
          <div className="pokemon">
            {pokemons.map((pokemon) => {
              return <CardPokemon pokemon={pokemon} key={pokemon.name} />;
            })}
            <div className="Header">
              <Paginacion
                pagina={pagina + 1}
                totalPages={total}
                onLeftClick={lastPage}
                onRightClick={nextPage}
              />
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default globalPoke;