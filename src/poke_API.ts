import { error } from "console";
import { Cache } from "./pokecache.js";

export class PokeAPI {

    private static readonly baseUrl = "https://pokeapi.co/api/v2";
    private cache: Cache;

    constructor(interval: number) {
        this.cache = new Cache(interval);
         // 5 minutes
    }

    // Example method to fetch Pokémon data
    async fetchLocations(pageURL: string|null): Promise<ShallowLocations> {
        
        const url = pageURL || `${PokeAPI.baseUrl}/location-area`; //default to first page if null

        //checks cache first
        const cached = this.cache.get<ShallowLocations>(url);
        if (cached) { return cached; }

        //if not in cache, fetch from API

        const response = await fetch(url);
        if (!response.ok) { 
            throw new Error(`Location not found`);
        }
        const data = await response.json();

        //make sure to cache the fetched data
        this.cache.add<ShallowLocations>(url, data);
        return data as ShallowLocations;
    };


    async fetchLocation(locationName: string): Promise<Locaction> {

        //check input
        if (!locationName) {
            throw new Error("Location name is required");
        }

        //check cache first
        const cached = this.cache.get<Locaction>(locationName);
        if (cached) { return cached; }

        //if not in cache, fetch from API   

        const url =  PokeAPI.baseUrl + `/location-area/${locationName}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Location ${locationName} not found`);
            
        }
        const data = await response.json();
        this.cache.add<Locaction>(locationName, data);
        return data as Locaction;

    };
    async fetchPokemon(pokemonName: string): Promise<Pokemon> {

        //check input
        if (!pokemonName) {
            throw new Error("Pokemon name is required");
        }

        //check cache first
        const cached = this.cache.get<Pokemon>(pokemonName);
        if (cached) { return cached; }

        //if not in cache, fetch from API   

        const url =  PokeAPI.baseUrl + `/pokemon/${pokemonName}`;
        const response = await fetch(url); 
        if (!response.ok) {
            throw new Error(`Pokemon ${pokemonName} not found`);
        }
        const data = await response.json();
        this.cache.add<Pokemon>(pokemonName, data);
        return data as Pokemon;

    };
};


export type ShallowLocations = {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
        name: string;
        url: string;
    }[];

};

export type Locaction = {
  encounter_method_rates: Array<{
    encounter_method: {
      name: string
      url: string
    }
    version_details: Array<{
      rate: number
      version: {
        name: string
        url: string
      }
    }>
  }>
  game_index: number
  id: number
  location: {
    name: string
    url: string
  }
  name: string
  names: Array<{
    language: {
      name: string
      url: string
    }
    name: string
  }>
  pokemon_encounters: Array<{
    pokemon: {
      name: string
      url: string
    }
    version_details: Array<{
      encounter_details: Array<{
        chance: number
        condition_values: Array<any>
        max_level: number
        method: {
          name: string
          url: string
        }
        min_level: number
      }>
      max_chance: number
      version: {
        name: string
        url: string
      }
    }>
  }>
}

export type Pokemon = {
  abilities: Array<{
    ability: {
      name: string
      url: string
    }
    is_hidden: boolean
    slot: number
  }>
  base_experience: number
  cries: {
    latest: string
    legacy: string
  }
  forms: Array<{
    name: string
    url: string
  }>
  game_indices: Array<{
    game_index: number
    version: {
      name: string
      url: string
    }
  }>
  height: number
  held_items: Array<{
    item: {
      name: string
      url: string
    }
    version_details: Array<{
      rarity: number
      version: {
        name: string
        url: string
      }
    }>
  }>
  id: number
  is_default: boolean
  location_area_encounters: string
  moves: Array<{
    move: {
      name: string
      url: string
    }
    version_group_details: Array<{
      level_learned_at: number
      move_learn_method: {
        name: string
        url: string
      }
      order?: number
      version_group: {
        name: string
        url: string
      }
    }>
  }>
  name: string
  order: number
  past_abilities: Array<{
    abilities: Array<{
      ability: any
      is_hidden: boolean
      slot: number
    }>
    generation: {
      name: string
      url: string
    }
  }>
  past_types: Array<any>
  species: {
    name: string
    url: string
  }
  sprites: {
    back_default: string
    back_female: string
    back_shiny: string
    back_shiny_female: string
    front_default: string
    front_female: string
    front_shiny: string
    front_shiny_female: string
    other: {
      dream_world: {
        front_default: string
        front_female: any
      }
      home: {
        front_default: string
        front_female: string
        front_shiny: string
        front_shiny_female: string
      }
      "official-artwork": {
        front_default: string
        front_shiny: string
      }
      showdown: {
        back_default: string
        back_female: string
        back_shiny: string
        back_shiny_female: any
        front_default: string
        front_female: string
        front_shiny: string
        front_shiny_female: string
      }
    }
    versions: {
      "generation-i": {
        "red-blue": {
          back_default: string
          back_gray: string
          back_transparent: string
          front_default: string
          front_gray: string
          front_transparent: string
        }
        yellow: {
          back_default: string
          back_gray: string
          back_transparent: string
          front_default: string
          front_gray: string
          front_transparent: string
        }
      }
      "generation-ii": {
        crystal: {
          back_default: string
          back_shiny: string
          back_shiny_transparent: string
          back_transparent: string
          front_default: string
          front_shiny: string
          front_shiny_transparent: string
          front_transparent: string
        }
        gold: {
          back_default: string
          back_shiny: string
          front_default: string
          front_shiny: string
          front_transparent: string
        }
        silver: {
          back_default: string
          back_shiny: string
          front_default: string
          front_shiny: string
          front_transparent: string
        }
      }
      "generation-iii": {
        emerald: {
          front_default: string
          front_shiny: string
        }
        "firered-leafgreen": {
          back_default: string
          back_shiny: string
          front_default: string
          front_shiny: string
        }
        "ruby-sapphire": {
          back_default: string
          back_shiny: string
          front_default: string
          front_shiny: string
        }
      }
      "generation-iv": {
        "diamond-pearl": {
          back_default: string
          back_female: string
          back_shiny: string
          back_shiny_female: string
          front_default: string
          front_female: string
          front_shiny: string
          front_shiny_female: string
        }
        "heartgold-soulsilver": {
          back_default: string
          back_female: string
          back_shiny: string
          back_shiny_female: string
          front_default: string
          front_female: string
          front_shiny: string
          front_shiny_female: string
        }
        platinum: {
          back_default: string
          back_female: string
          back_shiny: string
          back_shiny_female: string
          front_default: string
          front_female: string
          front_shiny: string
          front_shiny_female: string
        }
      }
      "generation-v": {
        "black-white": {
          animated: {
            back_default: string
            back_female: string
            back_shiny: string
            back_shiny_female: string
            front_default: string
            front_female: string
            front_shiny: string
            front_shiny_female: string
          }
          back_default: string
          back_female: string
          back_shiny: string
          back_shiny_female: string
          front_default: string
          front_female: string
          front_shiny: string
          front_shiny_female: string
        }
      }
      "generation-vi": {
        "omegaruby-alphasapphire": {
          front_default: string
          front_female: string
          front_shiny: string
          front_shiny_female: string
        }
        "x-y": {
          front_default: string
          front_female: string
          front_shiny: string
          front_shiny_female: string
        }
      }
      "generation-vii": {
        icons: {
          front_default: string
          front_female: any
        }
        "ultra-sun-ultra-moon": {
          front_default: string
          front_female: string
          front_shiny: string
          front_shiny_female: string
        }
      }
      "generation-viii": {
        icons: {
          front_default: string
          front_female: any
        }
      }
    }
  }
  stats: Array<{
    base_stat: number
    effort: number
    stat: {
      name: string
      url: string
    }
  }>
  types: Array<{
    slot: number
    type: {
      name: string
      url: string
    }
  }>
  weight: number
}
