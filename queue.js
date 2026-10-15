function Queue() {
    this.dataStore = [];
    this.enqueue = enqueue;
    this.dequeue = dequeue;
    this.front = front;
    this.back = back;
    this.toString = toString;
    this.empty = empty;
}

function enqueue(element) {
    this.dataStore.push(element);
}

function dequeue() {
    return this.dataStore.shift();
}

function front() {
    return this.dataStore[0];
}

function back() {
    return this.dataStore[this.dataStore.length - 1];
}

function toString() {
    let retStr = "";

    for (let i = 0; i < this.dataStore.length; ++i) {
        retStr += this.dataStore[i] + "\n";
    }

    return retStr;
}

function empty() {
    return this.dataStore.length === 0;
}

const q = new Queue();

q.enqueue("Meri");
q.enqueue("Sara");
q.enqueue("Ani");

console.log(q.toString()); // Meri Sara Ani

q.dequeue();

console.log(q.toString());//Sara Ani

console.log("Front of queue: " + q.front()); //front Sara
console.log("Back of queue: " + q.back());  // back Ani