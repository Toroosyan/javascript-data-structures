
class Graph {
    constructor(size, isDirected = true) {
        this.size = size;
        this.isDirected = isDirected;

        this.matrix = Array.from(
            { length: size },
            () => new Array(size).fill(0)
        );
    }

    // Add new vertex
    addVertex() {
        for (const row of this.matrix) {
            row.push(0);
        }

        this.size++;

        this.matrix.push(new Array(this.size).fill(0));
    }

    // Add edge between two vertices
    addEdge(i, j) {
        if (
            i < 0 || j < 0 ||
            i >= this.size || j >= this.size
        ) {
            throw new Error('Invalid vertex');
        }

        this.matrix[i][j] = 1;

        if (!this.isDirected) {
            this.matrix[j][i] = 1;
        }
    }

    // Print adjacency matrix
    print() {
        console.log(this.matrix.map(row => row.join(' ')).join('\n'));
    }
}

// Create undirected graph
const graph = new Graph(5, false);

// Add edges
graph.addEdge(0, 1);
graph.addEdge(1, 3);
graph.addEdge(3, 2);
graph.addEdge(3, 4);

// Print graph
graph.print();
