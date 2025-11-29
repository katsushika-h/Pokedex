import type { State } from "./state.js";
import { Locaction } from "./poke_API.js";


//explores input location 
export async function commandExplore(state:State, location: string): Promise<void> {

    
    console.log(`Exploring ${location}...`);
    const fetchedLocation: Locaction = await state.pokeAPI.fetchLocation(location);
    if (!fetchedLocation) {
        console.log(`Invalid location!`);
        return;
    }

    for (const location of fetchedLocation.pokemon_encounters) {
        console.log(location.pokemon.name);
        }


    }
