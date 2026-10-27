
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class SLinkedList {
    constructor(iterable) {
        this.head = null;

        if (
            iterable &&
            typeof iterable[Symbol.iterator] === "function"
        ) {
            for (let val of iterable) {
                this.push_back(val);
            }
        }
    }

    push_back(value) {
        const newNode = new Node(value);

        if (!this.head) {
            this.head = newNode;
            return;
        }

        let current = this.head;

        while (current.next) {
            current = current.next;
        }

        current.next = newNode;
    }

    toArray() {
        const arr = [];
        let current = this.head;

        while (current) {
            arr.push(current.value);
            current = current.next;
        }

        return arr;
    }
}

const list = new SLinkedList();

list.push_back(10);
list.push_back(20);
list.push_back(30);

console.log(list.toArray());
