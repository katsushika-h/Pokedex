import { State } from "./state";    
import { Pokemon } from "./poke_API";

export async function commandPokedex(state:State): Promise<void> {
    
    for (const pokemonName in state.pokedex) {
        const pokemon: Pokemon = state.pokedex[pokemonName];
        console.log(`- ${pokemon.name}`);
    }

}