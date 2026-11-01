
class AvlNode {
    constructor(value) {
        this.data = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVL {
    constructor(value) {
        this.root = value === undefined || value === null
            ? null
            : new AvlNode(value);
    }

    _getHeight(node) {
        return node ? node.height : 0;
    }

    _update(node) {
        node.height = 1 + Math.max(
            this._getHeight(node.left),
            this._getHeight(node.right)
        );
    }

    _bf(node) {
        if (!node) return 0;

        return this._getHeight(node.left) -
               this._getHeight(node.right);
    }

    _getMin(node) {
        let current = node;

        while (current.left !== null) {
            current = current.left;
        }

        return current;
    }

    _rotateRight(y) {
        const x = y.left;
        const T2 = x.right;

        x.right = y;
        y.left = T2;

        this._update(y);
        this._update(x);

        return x;
    }

    _rotateLeft(x) {
        const y = x.right;
        const T2 = y.left;

        y.left = x;
        x.right = T2;

        this._update(x);
        this._update(y);

        return y;
    }

    _insert(node, value) {
        if (node === null) {
            return new AvlNode(value);
        }

        if (value < node.data) {
            node.left = this._insert(node.left, value);
        } else if (value > node.data) {
            node.right = this._insert(node.right, value);
        } else {
            return node;
        }

        this._update(node);

        const balance = this._bf(node);

        // LL Case
        if (balance > 1 && value < node.left.data) {
            return this._rotateRight(node);
        }

        // RR Case
        if (balance < -1 && value > node.right.data) {
            return this._rotateLeft(node);
        }

        // LR Case
        if (balance > 1 && value > node.left.data) {
            node.left = this._rotateLeft(node.left);
            return this._rotateRight(node);
        }

        // RL Case
        if (balance < -1 && value < node.right.data) {
            node.right = this._rotateRight(node.right);
            return this._rotateLeft(node);
        }

        return node;
    }

    _remove(node, value) {
        if (node === null) {
            return null;
        }

        if (value < node.data) {
            node.left = this._remove(node.left, value);
        } else if (value > node.data) {
            node.right = this._remove(node.right, value);
        } else {
            // Node has no left child
            if (node.left === null) {
                return node.right;
            }

            // Node has no right child
            if (node.right === null) {
                return node.left;
            }

            // Node has two children
            const minNode = this._getMin(node.right);

            node.data = minNode.data;

            node.right = this._remove(node.right, minNode.data);
        }

        this._update(node);

        const balance = this._bf(node);

        // LL Case
        if (balance > 1 && this._bf(node.left) >= 0) {
            return this._rotateRight(node);
        }

        // LR Case
        if (balance > 1 && this._bf(node.left) < 0) {
            node.left = this._rotateLeft(node.left);
            return this._rotateRight(node);
        }

        // RR Case
        if (balance < -1 && this._bf(node.right) <= 0) {
            return this._rotateLeft(node);
        }

        // RL Case
        if (balance < -1 && this._bf(node.right) > 0) {
            node.right = this._rotateRight(node.right);
            return this._rotateLeft(node);
        }

        return node;
    }

    insert(value) {
        this.root = this._insert(this.root, value);
    }

    remove(value) {
        this.root = this._remove(this.root, value);
    }

    inorder() {
        const result = [];

        function traverse(node) {
            if (node === null) return;

            traverse(node.left);
            result.push(node.data);
            traverse(node.right);
        }

        traverse(this.root);

        return result;
    }

    preorder() {
        const result = [];

        function traverse(node) {
            if (node === null) return;

            result.push(node.data);
            traverse(node.left);
            traverse(node.right);
        }

        traverse(this.root);

        return result;
    }

    postorder() {
        const result = [];

        function traverse(node) {
            if (node === null) return;

            traverse(node.left);
            traverse(node.right);
            result.push(node.data);
        }

        traverse(this.root);

        return result;
    }

    levelorder() {
        const result = [];

        if (this.root === null) return result;

        const queue = [this.root];
        let front = 0;

        while (front < queue.length) {
            const node = queue[front++];

            result.push(node.data);

            if (node.left !== null) {
                queue.push(node.left);
            }

            if (node.right !== null) {
                queue.push(node.right);
            }
        }

        return result;
    }
}

const avl = new AVL();

avl.insert(30);
avl.insert(20);
avl.insert(10);
avl.insert(40);
avl.insert(50);
avl.insert(25);

console.log("Inorder:", avl.inorder());
// [10, 20, 25, 30, 40, 50]

console.log("Preorder:", avl.preorder());

console.log("Postorder:", avl.postorder());

console.log("Levelorder:", avl.levelorder());

avl.remove(20);

console.log("After remove:", avl.inorder());
// [10, 25, 30, 40, 50]
/* 
_getHeight()O(1)
_update()	O(1)
_bf()	    O(1)
_getMin()	O(log n)
Rotations	O(1)
insert()	O(log n)
remove()	O(log n)
inorder()	O(n)
preorder()	O(n)
postorder()	O(n)
levelorder()O(n)
 */