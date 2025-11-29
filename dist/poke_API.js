import { Cache } from "./pokecache.js";
export class PokeAPI {
    static baseUrl = "https://pokeapi.co/api/v2";
    cache;
    constructor(interval) {
        this.cache = new Cache(interval);
        // 5 minutes
    }
    // Example method to fetch Pokémon data
    async fetchLocations(pageURL) {
        const url = pageURL || `${PokeAPI.baseUrl}/location-area`; //default to first page if null
        //checks cache first
        const cached = this.cache.get(url);
        if (cached) {
            return cached;
        }
        //if not in cache, fetch from API
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Location not found`);
        }
        const data = await response.json();
        //make sure to cache the fetched data
        this.cache.add(url, data);
        return data;
    }
    ;
    async fetchLocation(locationName) {
        //check input
        if (!locationName) {
            throw new Error("Location name is required");
        }
        //check cache first
        const cached = this.cache.get(locationName);
        if (cached) {
            return cached;
        }
        //if not in cache, fetch from API   
        const url = PokeAPI.baseUrl + `/location-area/${locationName}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Location ${locationName} not found`);
        }
        const data = await response.json();
        this.cache.add(locationName, data);
        return data;
    }
    ;
    async fetchPokemon(pokemonName) {
        //check input
        if (!pokemonName) {
            throw new Error("Pokemon name is required");
        }
        //check cache first
        const cached = this.cache.get(pokemonName);
        if (cached) {
            return cached;
        }
        //if not in cache, fetch from API   
        const url = PokeAPI.baseUrl + `/pokemon/${pokemonName}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Pokemon ${pokemonName} not found`);
        }
        const data = await response.json();
        this.cache.add(pokemonName, data);
        return data;
    }
    ;
}
;
