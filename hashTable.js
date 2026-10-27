function isPrime(n) {
    if (n < 2) return false;

    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }

    return true;
}

function nextPrime(n) {
    while (!isPrime(n)) {
        n++;
    }

    return n;
}

class HashTable {
    constructor(initialCapacity = 11, maxLoadFactor = 1.0) {
        this.capacity = nextPrime(initialCapacity);
        this.maxLoadFactor = maxLoadFactor;
        this.table = Array.from(
            { length: this.capacity },
            () => []
        );
        this.size = 0;
    }

    _hash(key) {
        let hash = 0;

        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }

        return hash % this.capacity;
    }

    loadFactor() {
        return this.size / this.capacity;
    }

    has(key) {
        const index = this._hash(key);

        for (const entry of this.table[index]) {
            if (entry[0] === key) {
                return true;
            }
        }

        return false;
    }

    get(key) {
        const index = this._hash(key);

        for (const entry of this.table[index]) {
            if (entry[0] === key) {
                return entry[1];
            }
        }

        return undefined;
    }

    set(key, value) {
        const index = this._hash(key);
        const bucket = this.table[index];

        for (const entry of bucket) {
            if (entry[0] === key) {
                entry[1] = value;
                return;
            }
        }

        if ((this.size + 1) / this.capacity > this.maxLoadFactor) {
            this.resize();
            this.set(key, value);
            return;
        }

        bucket.push([key, value]);
        this.size++;
    }

    getSize() {
        return this.size;
    }

    delete(key) {
        const index = this._hash(key);
        const bucket = this.table[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                this.size--;
                return true;
            }
        }

        return false;
    }

    *keys() {
        for (const bucket of this.table) {
            for (const entry of bucket) {
                yield entry[0];
            }
        }
    }

    *values() {
        for (const bucket of this.table) {
            for (const entry of bucket) {
                yield entry[1];
            }
        }
    }

    *entries() {
        for (const bucket of this.table) {
            for (const entry of bucket) {
                yield entry;
            }
        }
    }

    resize() {
        const oldTable = this.table;

        this.capacity = nextPrime(this.capacity * 2);
        this.table = Array.from(
            { length: this.capacity },
            () => []
        );

        for (const bucket of oldTable) {
            for (const entry of bucket) {
                const index = this._hash(entry[0]);
                this.table[index].push(entry);
            }
        }
    }

    clear() {
        this.table = Array.from(
            { length: this.capacity },
            () => []
        );

        this.size = 0;
    }

    *[Symbol.iterator]() {
        yield* this.entries();
    }
}
