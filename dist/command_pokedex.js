export async function commandPokedex(state) {
    for (const pokemonName in state.pokedex) {
        const pokemon = state.pokedex[pokemonName];
        console.log(`- ${pokemon.name}`);
    }
}
