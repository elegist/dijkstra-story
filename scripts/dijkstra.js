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
    let unvisited = [];
    let visited = [];
    let distances = {};

    let current = graph[start];

    for (let node in graph) {
        unvisited.push(node);
        distances[node] = Infinity;
    }

    distances[start] = 0;

    for (let i = 0; i < 2; i++) {
        for (let neighbor in current) {
            if (distances[neighbor] === Infinity) {
                distances[neighbor] = current[neighbor];
            } else {
                distances[neighbor] += current[neighbor];
            }
        }

        let distanceValues = Object.values(distances);

        if (distanceValues.includes(0)) {
            distanceValues.splice(distanceValues.indexOf(0), 1);
        }

        let minDistance = Math.min(...distanceValues);

        Object.getOwnPropertyNames(distances).some((key) => {
            if (distances[key] === minDistance) {
                current = graph[key];
            }
        });

        console.log(distances);
    }
};

findShortestPath(graph, "A", "D");
