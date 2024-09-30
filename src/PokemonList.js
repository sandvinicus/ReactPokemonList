import React, { useState, useEffect } from 'react';
import { ComponentPoke } from './component';

const PokemonList = () => {
  const [data, setData] = useState(null);
  const [dataImg, setDataImg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [openSections, setOpenSections] = useState({});

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
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

  const handlePokemonClick = (pokemon) => {
    fetch(pokemon.url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(dataImg => {
        setDataImg(dataImg);
        setLoading(false);
        setSelectedPokemon(dataImg);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  const toggleSection = (letter) => {
    setOpenSections(prevState => ({
      ...prevState,
      [letter]: !prevState[letter]
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Filtra i Pokémon in base al termine di ricerca
  const filteredResults = data?.results.filter(item => 
    item.name.includes(searchTerm)
  ) || [];

  // Organizza i Pokémon in base alla prima lettera del loro nome
  const groupedResults = filteredResults.reduce((acc, pokemon) => {
    const firstLetter = pokemon.name.charAt(0).toUpperCase(); // Ottieni la prima lettera
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(pokemon); // Aggiungi il Pokémon alla lettera corrispondente
    return acc;
  }, {});

  return (
    <div>
      {selectedPokemon ? (
        <ComponentPoke selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} />
      ) : (
        <div style={{ flex: '2', marginLeft: '20px' }}>
          <input 
            type="text" 
            placeholder="Search Pokémon..." 
            value={searchTerm} 
            onChange={handleSearch} 
          />
          {/* Mappa ogni lettera e crea una sezione per essa */}
          {Object.keys(groupedResults).sort().map(letter => (
            <div key={letter} >
              {/* Titolo della sezione con la lettera */}
              <h2 onClick={() => toggleSection(letter)} style={{ cursor: 'pointer' }}>
                {"- "+letter}
              </h2>
              {/* Mostra i Pokémon solo se la sezione è aperta */}
              {openSections[letter] && (
                <ul >
                  {groupedResults[letter].map((item) => (
                    <li key={item.name} onClick={() => handlePokemonClick(item)} style={{ cursor: 'pointer' }}>
                      <h3>{item.name}</h3>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PokemonList;
