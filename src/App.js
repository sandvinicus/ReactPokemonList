import logo from './logo.svg';
import './App.css';
import React from 'react';
import PokemonList from './PokemonList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <PokemonList></PokemonList>
        
      </header>
    </div>
  );
}

export default App;
