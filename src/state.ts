import { createInterface, type Interface } from "readline";
import readline from 'readline';
import { getCommands } from "./commands.js";
import { PokeAPI } from "./poke_API.js";
import { Pokemon } from "./poke_API.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => void;
};

export type State = {

    rl: Interface;
    commands: Record<string, CLICommand>;
    pokeAPI: PokeAPI;
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;
    pokedex: Record<string, Pokemon>;
    // You can add more properties as needed
};

export function initState(cacheInterval:number): State {
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