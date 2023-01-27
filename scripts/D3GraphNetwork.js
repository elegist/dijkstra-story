// Graph data
let graph = {
    nodes: [
        {
            id: "A",
            text: "I was in the middle of a dense jungle, trying to find a way out",
        },
        {
            id: "B",
            text: "Suddenly, a giant pink elephant appeared out of nowhere and offered to guide me out",
            startNode: "true",
        },
        {
            id: "C",
            text: "As we walked, the elephant told me stories of its adventures in space",
            startNode: "true",
        },
        {
            id: "D",
            text: "I couldn't believe what I was hearing, but I didn't want to question it and spoil the moment",
            startNode: "true",
        },
        {
            id: "E",
            text: "We reached the edge of the jungle and the elephant bid me farewell and flew off into space",
        },
        {
            id: "F",
            text: "I was left standing there, wondering if it had all been a dream",
        },
        {
            id: "G",
            text: "I decided to continue my journey and came across a group of talking cacti",
            endNode: "true",
        },
        {
            id: "H",
            text: "They invited me to join their cactus society and learn the secrets of time travel",
            endNode: "true",
        },
        {
            id: "I",
            text: "I couldn't resist and joined them on their journey through time",
            endNode: "true",
        },
    ],
    links: [
        { source: "A", target: "B", weight: 1 },
        { source: "B", target: "A", weight: 1 },
        { source: "A", target: "C", weight: 2 },
        { source: "C", target: "A", weight: 2 },
        { source: "B", target: "D", weight: 3 },
        { source: "D", target: "B", weight: 3 },
        { source: "C", target: "D", weight: 4 },
        { source: "D", target: "C", weight: 4 },
        { source: "C", target: "E", weight: 2 },
        { source: "E", target: "C", weight: 2 },
        { source: "D", target: "E", weight: 1 },
        { source: "E", target: "D", weight: 1 },
        { source: "E", target: "F", weight: 3 },
        { source: "F", target: "E", weight: 3 },
        { source: "F", target: "G", weight: 2 },
        { source: "G", target: "F", weight: 2 },
        { source: "G", target: "H", weight: 4 },
        { source: "H", target: "G", weight: 4 },
        { source: "H", target: "I", weight: 5 },
        { source: "I", target: "H", weight: 5 },
        { source: "F", target: "I", weight: 1 },
        { source: "I", target: "F", weight: 1 },
        { source: "I", target: "C", weight: 6 },
        { source: "C", target: "I", weight: 6 },
    ],
};

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

let node = svg
    .append("g")
    .attr("id", "nodes")
    .selectAll(".node")
    .data(graph.nodes)
    .enter()
    .append(function () {
        var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.innerHTML = template;
        return g;
    })
    .attr("class", "node");

d3.selectAll(".node")
    .filter(function (d) {
        return d.startNode === "true";
    })
    .classed("start-node", true);
//.classed("node", false)

d3.selectAll(".node")
    .filter(function (d) {
        return d.endNode === "true";
    })
    .classed("end-node", true);
//.classed("node", false)

// svg.on("mouseover", function (d){
//     zoomToArea(d3.select(".start-node"))
// });

node.on("mouseover", function (e) {
    let selectedNode = d3.select(this).datum();
    displayTooltipText(selectedNode);
});

node.on("mouseout", function () {
    let selectedNode = d3.select(this).datum();
    hideTooltipText(selectedNode);
});

let startNode;
d3.selectAll(".start-node").on("click", function () {
    console.log("startNode");
    startNode = d3.select(this).datum();
    let pin = d3.select(this).select(".pin");
    gsap.to(pin.node(), {
        opacity: 1,
    });
    d3.selectAll(".start-node").on("click", null);
    endSelection();
});

let endNode;
function endSelection() {
    d3.selectAll(".end-node").on("click", function () {
        console.log("endNode");
        endNode = d3.select(this).datum();
        let pin = d3.select(this).select(".pin");
        gsap.to(pin.node(), {
            opacity: 1,
        });
        d3.selectAll(".end-node").on("click", null);
        let result = dijkstra(graph, startNode.id, endNode.id);
        convertPath(result);
        tlTypewriter.play();
    });
}

// Function to update the node and link positions on each tick of the force layout (multiple ticks per second)
function ticked() {
    link.attr("x1", function (d) {
        return d.source.x;
    })
        .attr("y1", function (d) {
            return d.source.y;
        })
        .attr("x2", function (d) {
            return d.target.x;
        })
        .attr("y2", function (d) {
            return d.target.y;
        });

    // node.attr("cx", function (d) {
    //     return d.x;
    // }).attr("cy", function (d) {
    //     return d.y;
    // });
    node.attr("transform", function (d) {
        return `translate(${d.x - 15}, ${d.y - 30})`;
    });
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

console.log(keyboardSwitches);

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
