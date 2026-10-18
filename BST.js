
class TreeNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BST {
    constructor() {
        this.root = null;
    }

    // Insert a value recursively
    _insert(node, value) {
        if (node === null) {
            return new TreeNode(value);
        }

        if (value < node.data) {
            node.left = this._insert(node.left, value);
        } else if (value > node.data) {
            node.right = this._insert(node.right, value);
        }

        return node;
    }

    insertRecursive(value) {
        this.root = this._insert(this.root, value);
    }

    // Insert a value iteratively
    insert(value) {
        const newNode = new TreeNode(value);

        if (this.root === null) {
            this.root = newNode;
            return;
        }

        let current = this.root;

        while (true) {
            if (value < current.data) {
                if (current.left === null) {
                    current.left = newNode;
                    return;
                }

                current = current.left;
            } else if (value > current.data) {
                if (current.right === null) {
                    current.right = newNode;
                    return;
                }

                current = current.right;
            } else {
                return; // Ignore duplicates
            }
        }
    }

    // Search recursively
    _contains(node, value) {
        if (node === null) {
            return false;
        }

        if (node.data === value) {
            return true;
        }

        if (value < node.data) {
            return this._contains(node.left, value);
        }

        return this._contains(node.right, value);
    }

    containsRecursive(value) {
        return this._contains(this.root, value);
    }

    // Search iteratively
    contains(value) {
        let current = this.root;

        while (current !== null) {
            if (current.data === value) {
                return true;
            }

            if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        return false;
    }

    // Inorder: Left -> Root -> Right
    _inorder(node, result) {
        if (node === null) {
            return;
        }

        this._inorder(node.left, result);
        result.push(node.data);
        this._inorder(node.right, result);
    }

    inOrderRecursive() {
        const result = [];
        this._inorder(this.root, result);
        return result;
    }

    // Preorder: Root -> Left -> Right
    _preOrder(node, result) {
        if (node === null) {
            return;
        }

        result.push(node.data);
        this._preOrder(node.left, result);
        this._preOrder(node.right, result);
    }

    preOrderRecursive() {
        const result = [];
        this._preOrder(this.root, result);
        return result;
    }

    // Postorder: Left -> Right -> Root
    _postOrder(node, result) {
        if (node === null) {
            return;
        }

        this._postOrder(node.left, result);
        this._postOrder(node.right, result);
        result.push(node.data);
    }

    postOrderRecursive() {
        const result = [];
        this._postOrder(this.root, result);
        return result;
    }

    // Inorder iteratively
    inorderIterative() {
        const result = [];
        const stack = [];
        let current = this.root;

        while (current !== null || stack.length > 0) {
            while (current !== null) {
                stack.push(current);
                current = current.left;
            }

            current = stack.pop();
            result.push(current.data);
            current = current.right;
        }

        return result;
    }

    // Preorder iteratively
    preorderIterative() {
        const result = [];
        const stack = [];

        if (this.root !== null) {
            stack.push(this.root);
        }

        while (stack.length > 0) {
            const node = stack.pop();
            result.push(node.data);

            // Push right first so that left is processed first
            if (node.right !== null) {
                stack.push(node.right);
            }

            if (node.left !== null) {
                stack.push(node.left);
            }
        }

        return result;
    }

    // Postorder iteratively
    postOrderIterative() {
        const result = [];
        const stack = [];
        let current = this.root;
        let lastVisited = null;

        while (current !== null || stack.length > 0) {
            if (current !== null) {
                stack.push(current);
                current = current.left;
            } else {
                const peekNode = stack[stack.length - 1];

                if (
                    peekNode.right !== null &&
                    lastVisited !== peekNode.right
                ) {
                    current = peekNode.right;
                } else {
                    result.push(peekNode.data);
                    lastVisited = stack.pop();
                }
            }
        }

        return result;
    }

    // Level order helper: Breadth-First Search (BFS)
    _levelOrder(node, result) {
        if (node === null) {
            return;
        }

        const queue = [node];
        let front = 0;

        while (front < queue.length) {
            const current = queue[front++];
            result.push(current.data);

            if (current.left !== null) {
                queue.push(current.left);
            }

            if (current.right !== null) {
                queue.push(current.right);
            }
        }
    }

    levelOrderIterative() {
        const result = [];
        this._levelOrder(this.root, result);
        return result;
    }

    // Calculate the height in number of nodes
    _height(node) {
        if (node === null) {
            return 0;
        }

        return 1 + Math.max(
            this._height(node.left),
            this._height(node.right)
        );
    }

    // Collect nodes at a particular level
    _collectLevel(node, level, result) {
        if (node === null) {
            return;
        }

        if (level === 0) {
            result.push(node.data);
            return;
        }

        this._collectLevel(node.left, level - 1, result);
        this._collectLevel(node.right, level - 1, result);
    }

    levelOrderRecursive() {
        const result = [];
        const height = this._height(this.root);

        for (let level = 0; level < height; level++) {
            this._collectLevel(this.root, level, result);
        }

        return result;
    }

    // Find minimum value
    getMin(node = this.root) {
        if (node === null) {
            return null;
        }

        while (node.left !== null) {
            node = node.left;
        }

        return node.data;
    }

    // Find maximum value
    getMax(node = this.root) {
        if (node === null) {
            return null;
        }

        while (node.right !== null) {
            node = node.right;
        }

        return node.data;
    }

    // Remove a value recursively
    _remove(node, value) {
        if (node === null) {
            return null;
        }

        if (value < node.data) {
            node.left = this._remove(node.left, value);
        } else if (value > node.data) {
            node.right = this._remove(node.right, value);
        } else {
            // Case 1: No left child
            if (node.left === null) {
                return node.right;
            }

            // Case 2: No right child
            if (node.right === null) {
                return node.left;
            }

            // Case 3: Two children
            const successorValue = this.getMin(node.right);
            node.data = successorValue;
            node.right = this._remove(
                node.right,
                successorValue
            );
        }

        return node;
    }

    removeRecursive(value) {
        this.root = this._remove(this.root, value);
    }
}


// Example usage
const tree = new BST();

[50, 30, 70, 20, 40, 60, 80].forEach(value => {
    tree.insert(value);
});

console.log("Inorder:", tree.inOrderRecursive());
console.log("Preorder:", tree.preOrderRecursive());
console.log("Postorder:", tree.postOrderRecursive());

console.log("Inorder iterative:", tree.inorderIterative());
console.log("Preorder iterative:", tree.preorderIterative());
console.log("Postorder iterative:", tree.postOrderIterative());

console.log("Level order iterative:", tree.levelOrderIterative());
console.log("Level order recursive:", tree.levelOrderRecursive());

console.log("Minimum:", tree.getMin());
console.log("Maximum:", tree.getMax());

console.log("Contains 40:", tree.contains(40));
console.log("Contains 90:", tree.contains(90));

tree.removeRecursive(30);
console.log("After removing 30:", tree.inOrderRecursive());





console.log(tree.preOrderRecursive());
console.log(tree.inOrderRecursive());
console.log(tree.postOrderRecursive());

/* BST Time complexity O(log n) || O(n)     */