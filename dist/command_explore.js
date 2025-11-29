//explores input location 
export async function commandExplore(state, location) {
    console.log(`Exploring ${location}...`);
    const fetchedLocation = await state.pokeAPI.fetchLocation(location);
    if (!fetchedLocation) {
        console.log(`Invalid location!`);
        return;
    }
    for (const location of fetchedLocation.pokemon_encounters) {
        console.log(location.pokemon.name);
    }
}
