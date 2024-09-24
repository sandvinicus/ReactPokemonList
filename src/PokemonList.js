import React, { useState, useEffect } from 'react';

const PokemonList = () => {
  const [data, setData] = useState(null);
  const [dataImg, setDataImg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState(null);


  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        const fetchDetails = data.results.map(item =>
          fetch(item.url)
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
        );

        return Promise.all(fetchDetails); 
      })
      .then(results => {
        setDataImg(results); 
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);


  const handleSearch = (event) => {
    setSearchTerm(event.target.value); 
  };
  const filteredResults = data?.results.filter(item => 
    item.name.includes(searchTerm) 
  ) || [];

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;


  

  return (
    <div>
    
    
    {selectedPokemon ? ( 
        
      <div className="pokemon-details">
        <h2>{selectedPokemon.name}</h2>
        <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
        <p>Type: {selectedPokemon.types.map(type => type.type.name).join(', ')}</p>
        <p>HP: {selectedPokemon.stats.find(stat => stat.stat.name === 'hp').base_stat}</p>
        <p>Attack: {selectedPokemon.stats.find(stat => stat.stat.name === 'attack').base_stat}</p>
        <p>Defense: {selectedPokemon.stats.find(stat => stat.stat.name === 'defense').base_stat}</p>
        <button onClick={() => setSelectedPokemon(null)}>Close</button>
      </div>
    ) : (
        
      <ul>
        <input 
      type="text" 
      placeholder="Search Pokémon..." 
      value={searchTerm} 
      onChange={handleSearch} 
    />
        {filteredResults.map((item, index) => (
          <li key={item.name} onClick={() => handlePokemonClick(dataImg[index])} style={{ cursor: 'pointer' }}>
            <h3>{item.name}</h3>
            {dataImg.find(dataimg => dataimg.name === item.name) && <img src={dataImg.find(dataimg => dataimg.name === item.name).sprites.front_default} alt={item.name} />}
          </li>
        ))}
      </ul>
    )}
    
    
  </div>
  );}
export default PokemonList;
