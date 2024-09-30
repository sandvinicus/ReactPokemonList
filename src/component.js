export function ComponentPoke({selectedPokemon, setSelectedPokemon}){
return  <div className="pokemon-details">
<h2>{selectedPokemon.name}</h2>
<img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
<p>Type: {selectedPokemon.types.map(type => type.type.name).join(', ')}</p>
<p>HP: {selectedPokemon.stats.find(stat => stat.stat.name === 'hp').base_stat}</p>
<p>Attack: {selectedPokemon.stats.find(stat => stat.stat.name === 'attack').base_stat}</p>
<p>Defense: {selectedPokemon.stats.find(stat => stat.stat.name === 'defense').base_stat}</p>
<button onClick={() => setSelectedPokemon(null)}>Close</button>
</div>
}