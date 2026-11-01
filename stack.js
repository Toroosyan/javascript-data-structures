// //stack using array
// class Stack {
//     #capacity;
//     #size;
//     #data;

//     constructor(initialCapacity = 16) {
//         this.#capacity = initialCapacity;
//         this.#size = 0;
//         this.#data = new Array(initialCapacity);
//     }

//     isEmpty() {
//         return this.#size === 0;
//     }

//     get size() {
//         return this.#size;
//     }

//     push(elem) {
//         if (this.#size === this.#capacity) {
//             this.#capacity *= 2;

//             const newData = new Array(this.#capacity);

//             for (let i = 0; i < this.#size; i++) {
//                 newData[i] = this.#data[i];
//             }

//             this.#data = newData;
//         }

//         this.#data[this.#size] = elem;
//         this.#size++;
//     }

//     pop() {
//         if (this.isEmpty()) return undefined;

//         this.#size--;

//         const elem = this.#data[this.#size];
//         this.#data[this.#size] = undefined;

//         return elem;
//     }

//     clear() {
//         this.#data = new Array(this.#capacity);
//         this.#size = 0;
//     }

//     *[Symbol.iterator]() {
//         for (let i = this.#size - 1; i >= 0; i--) {
//             yield this.#data[i];
//         }
//     }
// }

// // Testing

// const stack = new Stack();

// stack.push(10);
// stack.push(20);
// stack.push(30);

// console.log([...stack]); // [30, 20, 10]
// console.log(stack.pop()); // 30
// console.log(stack.size); // 2

// stack.clear();

// console.log(stack.isEmpty()); // true
/* 
push()	    O(1)*
pop()   	O(1)	
isEmpty()	O(1)
size	    O(1)	
clear()	    O(n)
Iterator	O(n)*/



//stack using linked list

class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class Stack {
    #top;
    #size;

    constructor() {
        this.#top = null;
        this.#size = 0;
    }

    isEmpty() {
        return this.#size === 0;
    }

    get size() {
        return this.#size;
    }

    push(elem) {
        const node = new Node(elem, this.#top);

        this.#top = node;
        this.#size++;
    }

    pop() {
        if (this.isEmpty()) return undefined;

        const elem = this.#top.data;

        this.#top = this.#top.next;
        this.#size--;

        return elem;
    }

    clear() {
        this.#top = null;
        this.#size = 0;
    }

    *[Symbol.iterator]() {
        let current = this.#top;

        while (current !== null) {
            yield current.data;
            current = current.next;
        }
    }
}

// Testing

const stack = new Stack();

stack.push(10);
stack.push(20);
stack.push(30);

console.log([...stack]); // [30, 20, 10]
console.log(stack.pop()); // 30
console.log(stack.size); // 2

stack.clear();

console.log(stack.isEmpty()); // true
/*
push()	     O(1)
pop()	     O(1)
isEmpty()	 O(1)
size	     O(1)
clear()	     O(1)
Iterator	 O(n) */