
const RED = 'RED';
const BLACK = 'BLACK';

class TreeNode {
    constructor(data, color = RED, parent = null, left = null, right = null) {
        this.data = data;
        this.color = color;
        this.parent = parent;
        this.left = left;
        this.right = right;
    }
}

class RBTree {
    constructor() {
        this.nil = new TreeNode(null);
        this.nil.color = BLACK;
        this.root = this.nil;
    }

    // Right Rotation
    rightRotate(y) {
        const x = y.left;

        y.left = x.right;

        if (x.right !== this.nil) {
            x.right.parent = y;
        }

        x.parent = y.parent;

        if (y.parent === this.nil) {
            this.root = x;
        } else if (y === y.parent.right) {
            y.parent.right = x;
        } else {
            y.parent.left = x;
        }

        x.right = y;
        y.parent = x;
    }

    // Left Rotation
    leftRotate(x) {
        const y = x.right;

        x.right = y.left;

        if (y.left !== this.nil) {
            y.left.parent = x;
        }

        y.parent = x.parent;

        if (x.parent === this.nil) {
            this.root = y;
        } else if (x === x.parent.left) {
            x.parent.left = y;
        } else {
            x.parent.right = y;
        }

        y.left = x;
        x.parent = y;
    }

    // Fix Red-Black Tree after insertion
    insertFixUp(newNode) {
        while (newNode.parent.color === RED) {

            if (newNode.parent === newNode.parent.parent.left) {

                const uncle = newNode.parent.parent.right;

                // Case 1: Uncle is RED
                if (uncle.color === RED) {
                    newNode.parent.color = BLACK;
                    uncle.color = BLACK;
                    newNode.parent.parent.color = RED;

                    newNode = newNode.parent.parent;
                } else {

                    // Case 2: Triangle
                    if (newNode === newNode.parent.right) {
                        newNode = newNode.parent;
                        this.leftRotate(newNode);
                    }

                    // Case 3: Line
                    newNode.parent.color = BLACK;
                    newNode.parent.parent.color = RED;

                    this.rightRotate(newNode.parent.parent);
                }

            } else {

                const uncle = newNode.parent.parent.left;

                // Case 1: Uncle is RED
                if (uncle.color === RED) {
                    newNode.parent.color = BLACK;
                    uncle.color = BLACK;
                    newNode.parent.parent.color = RED;

                    newNode = newNode.parent.parent;
                } else {

                    // Case 2: Triangle
                    if (newNode === newNode.parent.left) {
                        newNode = newNode.parent;
                        this.rightRotate(newNode);
                    }

                    // Case 3: Line
                    newNode.parent.color = BLACK;
                    newNode.parent.parent.color = RED;

                    this.leftRotate(newNode.parent.parent);
                }
            }
        }

        this.root.color = BLACK;
    }

    // Insert
    insert(data) {
        const newNode = new TreeNode(
            data,
            RED,
            this.nil,
            this.nil,
            this.nil
        );

        let parent = this.nil;
        let current = this.root;

        // Find correct position
        while (current !== this.nil) {
            parent = current;

            if (data < current.data) {
                current = current.left;
            } else if (data > current.data) {
                current = current.right;
            } else {
                return; // Ignore duplicates
            }
        }

        newNode.parent = parent;

        if (parent === this.nil) {
            this.root = newNode;
        } else if (data < parent.data) {
            parent.left = newNode;
        } else {
            parent.right = newNode;
        }

        this.insertFixUp(newNode);
    }
}

// Testing
const rb = new RBTree();

rb.insert(10);
rb.insert(20);
rb.insert(30);
rb.insert(15);
rb.insert(25);
rb.insert(5);

console.log(rb);

/*
insert()	 (O(log n))
leftRotate() (O(1))
rightRotate() (O(1))
insertFixUp() (O(log n))

Space	       (O(n))
 */