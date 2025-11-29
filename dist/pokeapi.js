export class PokeAPI {
    static baseUrl;
    constructor() {
        // Initialization code if needed
    }
    // Example method to fetch Pokémon data
    async fetchLocations(pageURL) {
        const pageLimit = 20;
        const pageOffset = 0;
        if (!pageURL) {
            pageURL = `${PokeAPI.baseUrl}/location-area?limit=${pageLimit}&offset=${pageOffset}`;
        }
        const response = await fetch(pageURL);
        if (!response.ok) {
            throw new Error(`Location not found`);
        }
        const data = await response.json();
        return data;
    }
}
