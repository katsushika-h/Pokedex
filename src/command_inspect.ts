import {State} from "./state.js";
import { Pokemon } from "./poke_API.js";

export async function commandInspect(state:State, pokemonName: string): Promise<void> {
    
    if (!state.pokedex[pokemonName]) {
        console.log(`you have not caught that pokemon`);
        return;
    }

    const pokemon: Pokemon = state.pokedex[pokemonName];

    console.log(`Name: ${pokemon.name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);
    console.log(`Stats:`);
    for (const stat of pokemon.stats) {
        console.log(`  ${stat.stat.name}: ${stat.base_stat}`);
    }
    console.log(`Types:`);
    for (const type of pokemon.types) {
        console.log(`  ${type.type.name}`);
    }
}