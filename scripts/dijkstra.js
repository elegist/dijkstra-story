//import PriorityQueue from "./priorityQueue.js";
//import nodeRelations from "../resources/nodeRelations.json" assert { type: "json" };

//console.clear();

let network = document.getElementById("GraphNetwork");

let graph = new Map();

nodeRelations.forEach((relation) => {
    let neighborMap = new Map();
    relation.neighbors.forEach((neighbor) => {
        neighborMap.set(neighbor.id, neighbor.weight);
        graph.set(relation.id, neighborMap);
    });
});

graph.forEach((neighbors, node) => {
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
        path.classList.add("path-between-nodes");
        path.setAttribute("d", dPath);
        // path.setAttribute("stroke", dStroke);
        // path.setAttribute("stroke-width", dStrokeWidth);
        // path.setAttribute("fill", dFill);
        path.setAttribute("data-from", document.getElementById(node).id);
        path.setAttribute("data-to", document.getElementById(neighbor).id);

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
    let prev = new Map();
    let distances = new Map();

    graph.forEach((value, key) => {
        distances.set(key, Infinity);
        prev.set(key, null);
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
            let result = [];

            while(prev.get(currentNode) != null) {
                result.push(currentNode);
                currentNode = prev.get(currentNode);
            }
            result.push(start);

            return result.reverse();
        }

        path.push(currentNode);

        queue = queue.filter((value) => {
            return value !== currentNode;
        });

        currentNeighbors = graph.get(currentNode);

        currentNeighbors.forEach((weight, neighbor) => {
            if (queue.includes(neighbor)) {
                if (distances.get(currentNode) + weight < distances.get(neighbor)) {
                    distances.set(neighbor, distances.get(currentNode) + weight);
                    prev.set(neighbor, currentNode)
                }
            }
        });
    }
};

export {graph, findShortestPath};
