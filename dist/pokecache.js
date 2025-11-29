export class Cache {
    #cache = new Map();
    #reapIntervalID = undefined;
    #interval; //
    #reap() {
        const now = Date.now();
        for (const [key, entry] of this.#cache) {
            const age = now - entry.createdAt;
            if (age > this.#interval) {
                this.#cache.delete(key);
            }
            // Entries older than 5 minutes are removed
        }
        ;
    }
    ;
    // starts the reap loop, starts reap at this.#interval
    #startReapLoop() {
        if (this.#reapIntervalID) {
            console.log("Reap loop already running");
            return;
        }
        ;
        this.#reapIntervalID = setInterval(() => {
            this.#reap();
        }, this.#interval);
    }
    // stops the reap loop
    stopReapLoop() {
        if (this.#reapIntervalID) {
            clearInterval(this.#reapIntervalID);
            this.#reapIntervalID = undefined;
        }
        ;
    }
    constructor(interval) {
        this.#interval = interval;
        this.#startReapLoop();
    }
    add(key, val) {
        const entry = {
            createdAt: Date.now(),
            val: val,
        };
        this.#cache.set(key, entry);
    }
    get(key) {
        const entry = this.#cache.get(key);
        if (entry) {
            return entry.val;
        }
        return undefined;
    }
}
