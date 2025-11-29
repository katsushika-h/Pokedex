export type CacheEntry<T>= { 
    createdAt: number;
    val: T;
};  

export class Cache {  


    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalID: NodeJS.Timeout| undefined = undefined;
    #interval: number; //

    #reap():void {
        const now = Date.now();
        for (const [key, entry] of this.#cache) {
            const age = now - entry.createdAt;
            if (age > this.#interval) {
                this.#cache.delete(key);
            }
            // Entries older than 5 minutes are removed
    
        };
    };
    
    // starts the reap loop, starts reap at this.#interval
    #startReapLoop(): void { 
        if (this.#reapIntervalID) {
            console.log("Reap loop already running");
            return;
        };
        this.#reapIntervalID = setInterval(()=>{
            this.#reap()
        }, this.#interval);
        }

    // stops the reap loop
    public stopReapLoop(): void{
        if (this.#reapIntervalID) {
            clearInterval(this.#reapIntervalID);
            this.#reapIntervalID = undefined;
            };
    }

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }



    add<T>(key:string, val:T): void {
        const entry: CacheEntry<T> = {
            createdAt: Date.now(),
            val: val,
        };
        this.#cache.set(key, entry);
    }
    
    get<T>(key:string): T | undefined {
        const entry = this.#cache.get(key);
        if (entry) {
            return entry.val as T;
        }
        return undefined;
    }
}