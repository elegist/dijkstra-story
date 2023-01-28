// Graph data
let graph = {
    nodes: [],
    links: [],
};

let storiesTmp = [
    "Harriet Johnson had always loved old-fashioned Skegness with its knotty, kind kettles. It was a place where she felt calm.",
    "She was an intuitive, arrogant, brandy drinker with ample abs and blonde arms.",
    "Her friends saw her as a combative, clean coward.",
    "Once, she had even rescued an agreeable injured bird from a burning building.",
    "That's the sort of woman he was.",
];

let stories = {
    1: {
        story: "The Warped Sandwich",
        text: "Michelle Parker had always loved idyllic Athens with its nasty, naughty nooks.",
        neighbors: ["2", "9", "13"],
        startNode: true,
        endNode: false,
    },
    2: {
        story: "The Warped Sandwich",
        text: "It was a place where she felt ambivalent.",
        neighbors: ["3", "7", "17"],
        startNode: false,
        endNode: false,
    },
    3: {
        story: "The Warped Sandwich",
        text: "She was an arrogant, energetic, brandy drinker with fragile fingers and pretty eyelashes.",
        neighbors: ["4", "11", "18"],
        startNode: false,
        endNode: false,
    },
    4: {
        story: "The Warped Sandwich",
        text: "Her friends saw her as a colorful, chilly coward.",
        neighbors: ["5", "12", "14"],
        startNode: false,
        endNode: false,
    },
    5: {
        story: "The Warped Sandwich",
        text: "Once, she had even helped an afraid old lady cross the road.",
        neighbors: ["6", "7", "15"],
        startNode: false,
        endNode: false,
    },
    6: {
        story: "The Warped Sandwich",
        text: "That's the sort of woman he was.",
        neighbors: [],
        startNode: false,
        endNode: true,
    },
    7: {
        story: "Deserted Truro",
        text: "Phillip Bogtrotter looked at the giant book in his hands and felt cross.",
        neighbors: ["8", "12"],
        startNode: true,
        endNode: false,
    },
    8: {
        story: "Deserted Truro",
        text: "He walked over to the window and reflected on his grey surroundings.",
        neighbors: ["9", "15"],
        startNode: false,
        endNode: false,
    },
    9: {
        story: "Deserted Truro",
        text: "He had always loved deserted Truro with its loopy, low lakes.",
        neighbors: ["10", "16"],
        startNode: false,
        endNode: false,
    },
    10: {
        story: "Deserted Truro",
        text: "It was a place that encouraged his tendency to feel cross.",
        neighbors: ["11", "14"],
        startNode: false,
        endNode: false,
    },
    11: {
        story: "Deserted Truro",
        text: "Then he saw something in the distance, or rather someone.",
        neighbors: [],
        startNode: false,
        endNode: false,
    },
    12: {
        story: "Deserted Truro",
        text: "It was the figure of Phillip Gobble.",
        neighbors: ["17"],
        startNode: false,
        endNode: true,
    },
    13: {
        story: "Sinister Doris Nolan",
        text: "Jack Wu looked at the bendy record in his hands and felt delighted.",
        neighbors: ["14"],
        startNode: true,
        endNode: false,
    },
    14: {
        story: "Sinister Doris Nolan",
        text: "He walked over to the window and reflected on his picturesque surroundings.",
        neighbors: ["15"],
        startNode: false,
        endNode: false,
    },
    15: {
        story: "Sinister Doris Nolan",
        text: "He had always loved old-fashioned Glasgow with its quaint, queenlike quarries.",
        neighbors: ["16"],
        startNode: false,
        endNode: false,
    },
    16: {
        story: "Sinister Doris Nolan",
        text: "It was a place that encouraged his tendency to feel delighted.",
        neighbors: ["17"],
        startNode: false,
        endNode: false,
    },
    17: {
        story: "Sinister Doris Nolan",
        text: "Then he saw something in the distance, or rather someone.",
        neighbors: ["18"],
        startNode: false,
        endNode: false,
    },
    18: {
        story: "Sinister Doris Nolan",
        text: "It was the figure of Doris Nolan.",
        neighbors: [],
        startNode: false,
        endNode: true,
    },
};

const addNode = (id, text, isStartNode = false, isEndNode = false) => {
    if (isStartNode) {
        graph.nodes.push({ id: id, text: text, startNode: isStartNode });
    }
    if (isEndNode) {
        graph.nodes.push({ id: id, text: text, endNode: isEndNode });
    }
    if (!isStartNode && !isEndNode) {
        graph.nodes.push({ id: id, text: text });
    }
};

const addLink = (from, to, weight) => {
    graph.links.push({ source: from, target: to, weight: weight });
    graph.links.push({ source: to, target: from, weight: weight });
};

for (const [id, storyInformation] of Object.entries(stories)) {
    addNode(
        id,
        storyInformation.text,
        storyInformation.startNode,
        storyInformation.endNode
    );
    storyInformation.neighbors.forEach((neighbor) => {
        let weightMultiplier = 1
        if (storyInformation.story !== stories[neighbor].story) {
            weightMultiplier = 2
        }
        addLink(id, neighbor, Math.abs(parseInt(neighbor) - parseInt(id)) * weightMultiplier);
    });
}

console.log(graph.links);
// let amountOfStartNodes = 1;
// let amountofEndNodes = 1;

// stories.forEach((story, index) => {
//     if (index < amountOfStartNodes) {
//         addNode(index, story, true, false);
//     } else if (index >= stories.length - amountofEndNodes) {
//         addNode(index, story, false, true);
//     } else {
//         addNode(index, story);
//     }
// });

// addLink(0, 1, 1);
// addLink(0, 2, 4);
// addLink(0, 3, 9);
// addLink(1, 2, 1);
// addLink(2, 3, 3);
// addLink(2, 4, 1);
// addLink(3, 4, 1);

//graph.nodes.push({id: "J", text: "test"})

// Set up the SVG canvas
let container = d3.select("#algorithm-container");
let width = "1000";
let height = "800";

let svg = container
    .append("svg")
    .attr("id", "graphNetwork")
    .attr("class", "img-fluid")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", "0 0 1000 800");

// Initialize the force layout
let simulation = d3
    .forceSimulation(graph.nodes)
    .force(
        "link",
        d3.forceLink(graph.links).id(function (d) {
            return d.id;
        })
    )
    .force("charge", d3.forceManyBody().strength(0))
    .force(
        "center",
        d3.forceCenter(
            container.node().getBoundingClientRect().width / 2,
            container.node().getBoundingClientRect().height / 2
        )
    )
    .force("collide", d3.forceCollide(60).strength(0.1))
    .on("tick", ticked);

// Add the links to the SVG
let link = svg
    .append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter()
    .append("line")
    .attr("class", "link");

//Add the nodes to the SVG
let template = d3.select("#customNode").html();

// let node = svg
//     .append("g")
//     .attr("id", "nodes")
//     .selectAll(".node")
//     .data(graph.nodes)
//     .enter()
//     .append(function () {
//         let g = document.createElementNS("http://www.w3.org/2000/svg", "g");
//         g.innerHTML = template;
//         return g;
//     })
//     .attr("class", "node");

let node = svg
    .append("g")
    .attr("id", "nodes")
    .selectAll(".node")
    .data(graph.nodes)
    .enter()
    .append("circle")
    .attr("r", 15)
    .attr("class", "node");

d3.selectAll(".node")
    .filter(function (d) {
        return d.startNode === true;
    })
    .classed("start-node", true);
//.classed("node", false)

d3.selectAll(".node")
    .filter(function (d) {
        return d.endNode === true;
    })
    .classed("end-node", true);
//.classed("node", false)

// svg.on("mouseover", function (d){
//     zoomToArea(d3.select(".start-node"))
// });

node.on("mouseover", function (e) {
    let selectedNode = d3.select(this).datum();
    d3.select("#storyPreview")
        .style("left", `${e.layerX + 5}px`)
        .style("top", `${e.layerY + 5}px`);
    displayTooltipText(selectedNode);
});

node.on("mouseout", function () {
    let selectedNode = d3.select(this).datum();
    hideTooltipText(selectedNode);
});

let startNode;
d3.selectAll(".start-node").on("click", function () {
    startNode = d3.select(this).datum();
    // let pin = d3.select(this).select(".pin");
    // gsap.to(pin.node(), {
    //     opacity: 1,
    // });
    d3.selectAll(".start-node").on("click", null);
    endSelection();
});

let endNode;
function endSelection() {
    d3.selectAll(".end-node").on("click", function () {
        endNode = d3.select(this).datum();
        // let pin = d3.select(this).select(".pin");
        // gsap.to(pin.node(), {
        //     opacity: 1,
        // });
        d3.selectAll(".end-node").on("click", null);
        let result = dijkstra(graph, startNode.id, endNode.id);
        convertPath(result);
        tlTypewriter.play();
    });
}

// Function to update the node and link positions on each tick of the force layout (multiple ticks per second)
function ticked() {
    link.attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
}

/**
 * Zooming and panning inside the svg
 */

var specificNode = node.filter(function (d, i) {
    return d.startNode === "true";
});

var zoom = d3
    .zoom()
    .scaleExtent([1, 10])
    //.translateExtent([[0, 0], [width, height]])
    .on("zoom", zoomed);

//svg.call(zoom)

function zoomed(event) {
    // node.attr("transform", event.transform);
    link.attr("transform", event.transform);
}

function panToSelection(selection) {
    var x = selection.attr("x");
    var y = selection.attr("y");
    zoom.translateTo(svg, x, y);
}

d3.select("#nextBtn").on("click", function () {});

//zoom.translateExtent([[-width/2, -height/2], [width, height]])

// function to display the text of a node
function displayTooltipText(selectedNode) {
    // create a new div for the text
    let textDiv = d3.select("#storyPreview");
    // add the title and text of the node to the div
    gsap.to(textDiv.node(), {
        scale: 1,
        duration: 0.2,
    });
    textDiv.append("h3").text(selectedNode.id);
    textDiv.append("p").text(selectedNode.text);
}

// function to display the text of a node
function hideTooltipText(selectedNode) {
    // create a new div for the text
    gsap.to("#storyPreview", {
        scale: 0,
    });
    let textDiv = d3.select("#storyPreview");
    gsap.to(textDiv.node(), {
        scale: 0,
        duration: 0.2,
    });
    //let textDiv = d3.select("#storyPreview");
    textDiv.text("");
}

let tlStory = gsap.timeline({
    defaults: { duration: 1.5 },
    onComplete: () => {
        tlTypewriter.restart();
        tlTypewriter.pause();
    },
});

// function to display the text of a node
function displayNodeText(selectedNode) {
    // create a new div for the text
    let textDiv = d3.select("#textBox");

    // add the title and text of the node to the div
    textDiv.append("h3").attr("id", `h3-${selectedNode.id}`);
    textDiv.append("p").attr("id", `p-${selectedNode.id}`);

    let heading = textDiv.select(`#h3-${selectedNode.id}`);
    let paragraph = textDiv.select(`#p-${selectedNode.id}`);

    tlStory
        .to(heading.node(), {
            text: `${selectedNode.id}`,
        })
        .to(paragraph.node(), {
            text: `${selectedNode.text}`,

            onComplete: () => {
                d3.select("#textBox").node().scrollTop = d3
                    .select("#textBox")
                    .node().scrollHeight;
            },
        });
}

window.addEventListener("resize", () =>
    simulation
        .force(
            "center",
            d3.forceCenter(
                container.node().getBoundingClientRect().width / 2,
                container.node().getBoundingClientRect().height / 2
            )
        )
        .alphaTarget(0) // re-heat the simulation
        .restart()
);

function dijkstra(graph, startNodeId, endNodeId) {
    // Initialize letiables
    let unvisitedNodes = new PriorityQueue();
    let distance = {};
    let previous = {};

    // Set initial conditions
    graph.nodes.forEach(function (d) {
        distance[d.id] = Infinity;
        previous[d.id] = null;
        unvisitedNodes.enqueue(d.id, distance[d.id]);
    });
    distance[startNodeId] = 0;
    unvisitedNodes.updatePriority(startNodeId, 0);

    // Main loop
    while (unvisitedNodes.length > 0) {
        // Find the unvisited node with the smallest distance
        let currentNodeId = unvisitedNodes.dequeue();

        // Stop if we've reached the end node
        if (currentNodeId === endNodeId) {
            break;
        }

        // Update the distance of each neighbor
        graph.links
            .filter(function (d) {
                return d.source.id === currentNodeId;
            })
            .forEach(function (link) {
                let neighborId = link.target.id;
                let newDistance = distance[currentNodeId] + link.weight;
                if (newDistance < distance[neighborId]) {
                    distance[neighborId] = newDistance;
                    previous[neighborId] = currentNodeId;
                    unvisitedNodes.updatePriority(neighborId, newDistance);
                }
            });
    }

    // Build the path
    let path = [];
    let currentNode = endNodeId;
    while (currentNode !== null) {
        path.unshift(currentNode);
        currentNode = previous[currentNode];
    }

    return {
        path: path,
        distance: distance[endNodeId],
    };
}

function convertPath(result) {
    let nodesInPath = [];
    for (let i = 0; i < result.path.length; i++) {
        let nodetmp = graph.nodes.find(function (d) {
            return d.id === result.path[i];
        });
        nodesInPath.push(nodetmp);
        displayNodeText(nodetmp);
    }
}

//PriorityQueue
class PriorityQueue {
    constructor() {
        this.queue = [];
        this.priorities = {};
    }

    enqueue(value, priority) {
        this.queue.push(value);
        this.priorities[value] = priority;
    }

    dequeue() {
        let highestPriority = Infinity;
        let highestPriorityIndex = null;

        for (let i = 0; i < this.queue.length; i++) {
            if (this.priorities[this.queue[i]] < highestPriority) {
                highestPriority = this.priorities[this.queue[i]];
                highestPriorityIndex = i;
            }
        }

        let dequeued = this.queue.splice(highestPriorityIndex, 1);
        return dequeued[0];
    }

    updatePriority(value, priority) {
        this.priorities[value] = priority;
    }
    get length() {
        return this.queue.length;
    }
}

// let startNodeId = "A";
// let endNodeId = "I";
// let result = dijkstra(graph, startNodeId, endNodeId);
// console.log(result)

// result.path.forEach()

// // update the nodes and links
// node.data(result.path)
//     .attr("class", "node shortest-path")
//     .merge()

// link.data(result.path)
//     .attr("class", "link shortest-path")
//     .merge()

// keep the forcesimulation on the node
// simulation.nodes(result.path);
// simulation.alpha(1).restart();

// // Highlight the shortest path on the graph
// let shortestPathLinks = result.path.map(function (d, i) {
//     return i < result.path.length - 1 ? { "source": d, "target": result.path[i + 1] } : null;
// }).filter(function (d) { return d !== null; });

// let link = svg.selectAll(".link")
//     .data(shortestPathLinks, function (d) { return d.source + "-" + d.target; });

// node.data(result.path)
//     .attr("class", "node shortest-path")

// simulation.nodes(result.path)
// simulation.force("link").initialize(graph.links)
// simulation.force("charge").initialize(node);
// simulation.force("center").initialize(node);
// simulation.force("collide").initialize(node);

// const intro = () => {
//     let timeline = gsap.timeline();

//     timeline.from(".sticky-note", {
//         x: -20,
//         y: 20,
//         scale: 0.2,
//         rotation: 30,
//         transformOrigin: "center",
//         opacity: 0,
//         ease: Back.easeOut.config(2),
//         duration: 0.85,
//         stagger: {
//             each: 0.1,
//             from: "random",
//             grid: "auto",
//             ease: "power3.inOut",
//         },
//     });

//     return timeline;
// };

let tlSpawn = gsap.timeline({ paused: true });
let nodes = d3.selectAll(".node");

tlSpawn.from(nodes.nodes(), {
    scale: 0.2,
    opacity: 0,
    ease: "Back.easeOut.config(2)",
    duration: 0.85,
    stagger: {
        each: 0.1,
        from: "random",
        grid: "auto",
        ease: "power3.inOut",
    },
});

tlSpawn.play();
/* Animations */

let tlTypewriter = gsap.timeline({ paused: true });
let keyboardSwitches = $("#keyboard").children();

tlTypewriter.to(keyboardSwitches, {
    attr: {
        fill: "#c0c0cc",
    },
    transformOrigin: "center",
    scale: 0.8,
    ease: "elastic.inOut(1, 1)",
    stagger: {
        grid: "auto",
        from: "random",
        amount: 1.5,
        repeat: -1,
        yoyo: true,
    },
    duration: 0.5,
});

// tlTypewriter.play();
