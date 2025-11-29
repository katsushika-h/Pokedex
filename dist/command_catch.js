export async function commandCatch(state, pokemonName) {
    console.log(`Throwing a Pokeball at ${pokemonName}...`);
    const pokemon = await state.pokeAPI.fetchPokemon(pokemonName);
    const catchChance = Math.random();
    if (catchChance * (1 / pokemon.base_experience) * 100 > 0.5) {
        state.pokedex[pokemon.name] = pokemon;
        console.log(`${pokemon.name} was caught!`);
    }
    else {
        console.log(`${pokemon.name} escaped!`);
    }
    ;
}
