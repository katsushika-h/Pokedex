import readline from 'readline';
import { State } from './state.js';

export function commandExit(State: State): void {
    console.log("Closing the Pokedex... Goodbye!");
    State.rl.close();
    process.exit(0);
}