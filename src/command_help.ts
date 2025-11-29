import { State } from "./state.js";

export function commandHelp(state: State): void {
    console.log("Welcome to the Pokedex!");
    console.log("Usage:")
    console.log("\n");
    for (const commandName in state.commands) {
        console.log(`${state.commands[commandName].name}: ${state.commands[commandName].description}`);
    }
}