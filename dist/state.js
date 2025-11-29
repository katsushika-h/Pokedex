import readline from 'readline';
import { getCommands } from "./commands.js";
import { PokeAPI } from "./poke_API.js";
export function initState(cacheInterval) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'pokedex > '
    });
    const returnState = {
        rl,
        commands: getCommands(),
        pokeAPI: new PokeAPI(cacheInterval),
        nextLocationsURL: "https://pokeapi.co/api/v2/location-area?limit=20&offset=0",
        prevLocationsURL: null,
        pokedex: {},
    };
    return returnState;
}
