
class Node {
    constructor(data, next = null, prev = null) {
        this.data = data;
        this.next = next;
        this.prev = prev;
    }
}

class DList {
    constructor(iterables = []) {
        this.head = null;
        this.tail = null;
        this._size = 0;

        for (const elem of iterables) {
            this.push_back(elem);
        }
    }

    static fromArray(arr) {
        return new DList(arr);
    }

    get size() {
        return this._size;
    }

    clear() {
        this.head = null;
        this.tail = null;
        this._size = 0;
    }

    push_back(elem) {
        const node = new Node(elem);

        if (this.isEmpty()) {
            this.head = node;
            this.tail = node;
        } else {
            node.prev = this.tail;
            this.tail.next = node;
            this.tail = node;
        }

        this._size++;
    }

    push_front(elem) {
        const node = new Node(elem);

        if (this.isEmpty()) {
            this.head = node;
            this.tail = node;
        } else {
            node.next = this.head;
            this.head.prev = node;
            this.head = node;
        }

        this._size++;
    }

    pop_back() {
        if (this.isEmpty()) return undefined;

        const value = this.tail.data;

        if (this._size === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
        }

        this._size--;
        return value;
    }

    pop_front() {
        if (this.isEmpty()) return undefined;

        const value = this.head.data;

        if (this._size === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
            this.head.prev = null;
        }

        this._size--;
        return value;
    }

    toArray() {
        const arr = [];

        for (const elem of this) {
            arr.push(elem);
        }

        return arr;
    }

    front() {
        return this.head ? this.head.data : undefined;
    }

    back() {
        return this.tail ? this.tail.data : undefined;
    }

    isEmpty() {
        return this._size === 0;
    }

    at(index) {
        if (index < 0 || index >= this._size) {
            return undefined;
        }

        let current;

        if (index < this._size / 2) {
            current = this.head;

            for (let i = 0; i < index; i++) {
                current = current.next;
            }
        } else {
            current = this.tail;

            for (let i = this._size - 1; i > index; i--) {
                current = current.prev;
            }
        }

        return current.data;
    }

    insert(index, value) {
        if (index < 0 || index > this._size) {
            return false;
        }

        if (index === 0) {
            this.push_front(value);
            return true;
        }

        if (index === this._size) {
            this.push_back(value);
            return true;
        }

        let current = this.head;

        for (let i = 0; i < index; i++) {
            current = current.next;
        }

        const node = new Node(value, current, current.prev);

        current.prev.next = node;
        current.prev = node;

        this._size++;
        return true;
    }

    erase(index) {
        if (index < 0 || index >= this._size) {
            return undefined;
        }

        if (index === 0) {
            return this.pop_front();
        }

        if (index === this._size - 1) {
            return this.pop_back();
        }

        let current = this.head;

        for (let i = 0; i < index; i++) {
            current = current.next;
        }

        current.prev.next = current.next;
        current.next.prev = current.prev;

        this._size--;

        return current.data;
    }

    reverse() {
        let current = this.head;

        while (current !== null) {
            const temp = current.next;

            current.next = current.prev;
            current.prev = temp;

            current = temp;
        }

        const temp = this.head;
        this.head = this.tail;
        this.tail = temp;
    }

    merge(list) {
        if (list === this || list.isEmpty()) return;

        for (const elem of list) {
            this.push_back(elem);
        }
    }

    remove(value) {
        let current = this.head;
        let removed = 0;

        while (current !== null) {
            const next = current.next;

            if (current.data === value) {
                if (current === this.head) {
                    this.pop_front();
                } else if (current === this.tail) {
                    this.pop_back();
                } else {
                    current.prev.next = current.next;
                    current.next.prev = current.prev;
                    this._size--;
                }

                removed++;
            }

            current = next;
        }

        return removed;
    }

    sort(cmp = (a, b) => a - b) {
        function mergeSort(arr) {
            if (arr.length <= 1) return arr;

            const mid = Math.floor(arr.length / 2);

            const left = mergeSort(arr.slice(0, mid));
            const right = mergeSort(arr.slice(mid));

            return merge(left, right);
        }

        function merge(left, right) {
            const result = [];

            let i = 0;
            let j = 0;

            while (i < left.length && j < right.length) {
                if (cmp(left[i], right[j]) <= 0) {
                    result.push(left[i++]);
                } else {
                    result.push(right[j++]);
                }
            }

            while (i < left.length) {
                result.push(left[i++]);
            }

            while (j < right.length) {
                result.push(right[j++]);
            }

            return result;
        }

        const sorted = mergeSort(this.toArray());

        this.clear();

        for (const elem of sorted) {
            this.push_back(elem);
        }
    }

    *[Symbol.iterator]() {
        let current = this.head;

        while (current !== null) {
            yield current.data;
            current = current.next;
        }
    }
}

const list = new DList();

list.push_back(10);
list.push_back(20);
list.push_back(30);

console.log(list.toArray());
// [10, 20, 30]

list.push_front(5);

console.log(list.toArray());
// [5, 10, 20, 30]

console.log(list.size);
// 4

console.log(list.front());
// 5

console.log(list.back());
// 30

console.log(list.at(2));
// 20

list.insert(2, 15);

console.log(list.toArray());
// [5, 10, 15, 20, 30]

list.erase(2);

console.log(list.toArray());
// [5, 10, 20, 30]

list.pop_back();

console.log(list.toArray());
// [5, 10, 20]

list.pop_front();

console.log(list.toArray());
// [10, 20]

list.reverse();

console.log(list.toArray());
// [20, 10]

list.push_back(5);
list.push_back(30);

list.sort();

console.log(list.toArray());
// [5, 10, 20, 30]

list.remove(20);

console.log(list.toArray());
// [5, 10, 30]

// Iterator
for (const value of list) {
    console.log(value);
}
/*Time complexity
push_back()	    O(1)
push_front()	O(1)
pop_back()	    O(1)
pop_front()  	O(1)
front()     	O(1)
back()	        O(1)
isEmpty()	    O(1)
get size	    O(1)
*/ 

/* at()	    O(n)
insert()	O(n)
erase()	    O(n)
reverse()	O(n)
remove()	O(n)
toArray()	O(n)
merge()	    O(m)
sort()	    O(n log n)
*/  