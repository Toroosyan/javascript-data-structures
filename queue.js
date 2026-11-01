
class Queue {
    #capacity;
    #size;
    #data;
    #front;
    #back;

    constructor(capacity = 8) {
        this.#capacity = capacity;
        this.#size = 0;
        this.#data = new Array(capacity);
        this.#front = 0;
        this.#back = 0;
    }

    enqueue(elem) {
        if (this.#size === this.#capacity) {
            const newCapacity = this.#capacity * 2;
            const newData = new Array(newCapacity);

            for (let i = 0; i < this.#size; i++) {
                newData[i] = this.#data[
                    (this.#front + i) % this.#capacity
                ];
            }

            this.#data = newData;
            this.#capacity = newCapacity;
            this.#front = 0;
            this.#back = this.#size;
        }

        this.#data[this.#back] = elem;

        this.#back = (this.#back + 1) % this.#capacity;
        this.#size++;
    }

    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }

        const elem = this.#data[this.#front];

        this.#data[this.#front] = undefined;

        this.#front = (this.#front + 1) % this.#capacity;
        this.#size--;

        if (this.#size === 0) {
            this.#front = 0;
            this.#back = 0;
        }

        return elem;
    }

    get size() {
        return this.#size;
    }

    get_front() {
        if (this.isEmpty()) return undefined;

        return this.#data[this.#front];
    }

    get_back() {
        if (this.isEmpty()) return undefined;

        const index = (this.#back - 1 + this.#capacity) % this.#capacity;

        return this.#data[index];
    }

    print() {
        console.log([...this]);
    }

    isEmpty() {
        return this.#size === 0;
    }

    *[Symbol.iterator]() {
        for (let i = 0; i < this.#size; i++) {
            yield this.#data[
                (this.#front + i) % this.#capacity
            ];
        }
    }
}

// Testing

const queue = new Queue(3);

queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);

queue.print();
// [10, 20, 30]

console.log(queue.size);
// 3

console.log(queue.get_front());
// 10

console.log(queue.get_back());
// 30

console.log(queue.dequeue());
// 10

queue.print();
// [20, 30]

queue.enqueue(40);
queue.enqueue(50);

queue.print();
// [20, 30, 40, 50]

console.log(queue.dequeue());
// 20

console.log(queue.size);
// 3

console.log(queue.isEmpty());
// false

for (const elem of queue) {
    console.log(elem);
}
// 30
// 40
// 50
/* 
enqueue()   O(1)*
dequeue()	O(1)
size	    O(1)
get_front()	O(1)
get_back()	O(1)
isEmpty()	O(1)
print()	    O(n)
Iterator	O(n) */