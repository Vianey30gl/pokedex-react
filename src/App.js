import './App.css';
import { AppRouter } from './AppRouter';
import { PokemonProvide } from './Componentes/PokemonProvide';


function App() {
  return (
    <PokemonProvide>
      <AppRouter/>
    </PokemonProvide>
  )
}

export default App;
