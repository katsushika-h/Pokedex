import type { State } from "./state.js";
import { Pokemon } from "./poke_API.js";

export async function commandCatch(state:State, pokemonName: string): Promise<void> {

    console.log(`Throwing a Pokeball at ${pokemonName}...`)
    

    const pokemon: Pokemon = await state.pokeAPI.fetchPokemon(pokemonName);
    const catchChance: number = Math.random();
    if (catchChance * (1/pokemon.base_experience)*100 > 0.5) {
        state.pokedex[pokemon.name] = pokemon;
        console.log(`${pokemon.name} was caught!`);
    } else {
        console.log(`${pokemon.name} escaped!`);
    };
}