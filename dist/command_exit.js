export function commandExit(State) {
    console.log("Closing the Pokedex... Goodbye!");
    State.rl.close();
    process.exit(0);
}
