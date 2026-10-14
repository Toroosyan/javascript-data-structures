function Stack() {
    this.dataStore = [];
    this.top = 0;
    this.push = push;
    this.pop = pop;
    this.peek = peek;
    this.clear = clear;
    this.length = length;
}

function push(element) {
    this.dataStore[this.top++] = element;
}

function peek() {
    return this.dataStore[this.top - 1];
}

function pop() {
    return this.dataStore[--this.top];
}

function clear() {
    this.top = 0;
}

function length() {
    return this.top;
}

const stack = new Stack();

stack.push(10);
stack.push(20);
stack.push(30);

console.log(stack.dataStore); // [10, 20, 30]
console.log(stack.length());  // 3

console.log(stack.peek());    // 30

console.log(stack.pop());     // 30
console.log(stack.pop());     // 20

console.log(stack.length());  // 1
console.log(stack.peek());    // 10

stack.clear();

console.log(stack.length());  // 0
console.log(stack.peek());    // undefined