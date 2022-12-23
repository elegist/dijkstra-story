let graph = {
    A: { B: 2, C: 3 },
    B: { A: 2, C: 4, D: 5 },
    C: { A: 3, B: 4 },
    D: { B: 5 },
};

/**
 * Implementation of the dijkstra algorithm. Finds the shortest path between two points
 *
 * @param {Object} graph Represents the network made out of nodes. Graph should include all of the edge informations. Format: {Point: {Point: Cost, (...)}, (...)}.
 * @param {String} start Starting point of the algorithm.
 * @param {String} end Ending point of the algorithm.
 */
const findShortestPath = (graph, start, end) => {
    let path = [];
    let queue = [];
    let distances = new Map();

    for (let node in graph) {
        distances.set(node, Infinity);
        queue.push(node);
    }

    distances.set(start, 0);

    let currentNode;
    let currentNeighbors;
    let currentMinDistance;

    while (queue.length > 0) {
        let currentDistances = [];

        distances.forEach((distance, key) => {
            if (queue.includes(key)) {
                currentDistances.push(distances.get(key));
                currentMinDistance = Math.min(...currentDistances);
                if (distance === currentMinDistance) {
                    currentNode = key;
                    return;
                }
            }
        });

        queue = queue.filter((value) => {
            return value !== currentNode;
        });

        path.push(currentNode);

        currentNeighbors = graph[currentNode];
        
        if (Object.hasOwn(currentNeighbors, end)) {
            path.push(end);
            return path;
        }

        for (let neighbor in currentNeighbors) {
            if (queue.includes(neighbor)) {
                if (distances.get(neighbor) === Infinity) {
                    distances.set(neighbor, currentNeighbors[neighbor]);
                } else {
                    distances.set(
                        neighbor,
                        distances.get(neighbor) + currentNeighbors[neighbor]
                    );
                }
            }
        }
    }
};

console.log(findShortestPath(graph, "D", "C"));
