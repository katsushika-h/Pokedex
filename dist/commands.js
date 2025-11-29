import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';
import { commandMap, commandMapBack } from './command_map.js';
import { commandExplore } from './command_explore.js';
import { commandCatch } from './command_catch.js';
import { commandInspect } from './command_inspect.js';
export function getCommands() {
    return {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Lists all available commands",
            callback: commandHelp
            // can add more commands here   
        },
        map: {
            name: "map",
            description: "Lists 20 locations from the PokeAPI",
            callback: commandMap,
        },
        mapb: {
            name: "mapb",
            description: "Lists previous 20 locations from the PokeAPI",
            callback: commandMapBack,
        },
        explore: {
            name: "explore",
            description: "Explores a given location",
            callback: commandExplore,
        },
        catch: {
            name: "catch",
            description: "Attempts to catch a given pokemon",
            callback: commandCatch,
        },
        inspect: {
            name: "inspect",
            description: "Inspects a caught pokemon",
            callback: commandInspect,
        },
    };
}
