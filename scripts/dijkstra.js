import PriorityQueue from "./priorityQueue.js";
import nodeRelations from "../resources/nodeRelations.json" assert { type: "json" };

console.clear();

let network = document.getElementById("GraphNetwork");

let testGraph = new Map();

nodeRelations.forEach((relation) => {
    let neighborMap = new Map();
    relation.neighbors.forEach((neighbor) => {
        neighborMap.set(neighbor.id, neighbor.weight);
        testGraph.set(relation.id, neighborMap);
    });
});

testGraph.forEach((neighbors, node) => {
    neighbors.forEach((weight, neighbor) => {
        let startNodePosX = document.getElementById(node).getAttribute("cx");
        let startNodePosY = document.getElementById(node).getAttribute("cy");

        let endNodePosX = document.getElementById(neighbor).getAttribute("cx");
        let endNodePosY = document.getElementById(neighbor).getAttribute("cy");

        let dPath = `M ${startNodePosX} ${startNodePosY} L ${endNodePosX} ${endNodePosY}`;
        let dStroke = "red";
        let dStrokeWidth = "1";
        let dFill = "none";

        const path = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );
        path.setAttribute("d", dPath);
        path.setAttribute("stroke", dStroke);
        path.setAttribute("stroke-width", dStrokeWidth);
        path.setAttribute("fill", dFill);

        network.appendChild(path);
    });
});

/**
 * Implementation of the dijkstra algorithm. Finds the shortest path between two points
 *
 * @param {Map} graph Represents the network made out of nodes. Graph should include all of the edge informations. Format: {Point: {Point: Cost, (...)}, (...)}.
 * @param {String} start Starting point of the algorithm.
 * @param {String} end Ending point of the algorithm.
 */
const findShortestPath = (graph, start, end) => {
    //FIXME: If two edges have the same weight, the algorithm does not always pick the real shortest path, and does not go back to check so.
    let path = [];
    let queue = [];
    let distances = new Map();

    graph.forEach((value, key) => {
        distances.set(key, Infinity);
        queue.push(key);
    });

    distances.set(start, 0);

    let currentNode;
    let currentNeighbors = {};
    let currentMinDistance = 0;

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

        if (currentNode === end) {
            path.push(currentNode);
            return path;
        }

        path.push(currentNode);

        queue = queue.filter((value) => {
            return value !== currentNode;
        });

        currentNeighbors = graph.get(currentNode);

        currentNeighbors.forEach((weight, neighbor) => {
            if (queue.includes(neighbor)) {
                if (distances.get(neighbor) === Infinity) {
                    distances.set(neighbor, weight);
                } else {
                    distances.set(
                        neighbor,
                        distances.get(neighbor) + weight
                    );
                }
            }
        });
    }
};

// console.log(findShortestPath(testGraph, "node-position-00", "node-position-17"));

export default findShortestPath;
