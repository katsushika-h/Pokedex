import { ShallowLocations } from "./poke_API.js";
import { State } from "./state.js";

export async function  commandMap(state: State): Promise<void> {
    const locations: ShallowLocations = await state.pokeAPI.fetchLocations(state.nextLocationsURL);
    for (const location of locations.results) {    
        console.log(location.name);
    }
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;    
}

export async function commandMapBack(state: State): Promise<void> {
    if (state.prevLocationsURL === null) {
        console.log("you're on the first page");
        return;
    }
    const locations: ShallowLocations = await state.pokeAPI.fetchLocations(state.prevLocationsURL);
    for (const location of locations.results) { 
        console.log(location.name);
    }
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;
}