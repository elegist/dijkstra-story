const stories = {
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
        neighbors: ["4", "11", "16"],
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

let graph = {
    nodes: [],
    links: [],
};

const algorithmStepDuration = 1;
let storyFinished = false;
/**
 * Method that adds all the nodes with the corrosponding links to the graph object
 * Automatically calculates logical weights between story nodes dependend on whether or not
 * the story nodes are from the same origin story
 */
const buildNetwork = () => {
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
            let weightMultiplier = 1;
            if (storyInformation.story !== stories[neighbor].story) {
                weightMultiplier = 2;
            }
            addLink(
                id,
                neighbor,
                Math.abs(parseInt(neighbor) - parseInt(id)) * weightMultiplier
            );
        });
    }
};
buildNetwork();

/**
 * Section that builds the visual svg network graph from the data of the graph array
 * Automatically builds nodes with custom graphics and connections between them as paths
 */

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
    .attr("viewBox", `0 0 ${width} ${height}`);

// Initialize the force layout
let simulation = d3
    .forceSimulation(graph.nodes)
    .force(
        "link",
        d3.forceLink(graph.links).id(function (d) {
            return d.id;
        })
    )
    .force("charge", d3.forceManyBody().strength(-30))
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
    .selectAll("path")
    .data(graph.links)
    .enter()
    .append("path")
    .attr("class", "link");

//Add the nodes to the SVG
let node = svg
    .append("g")
    .attr("id", "nodes")
    .selectAll(".node")
    .data(graph.nodes)
    .enter()
    .append("g")
    .attr("class", "node")
    .insert(() => {
        let g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.innerHTML = d3.select("#customNode").html();
        return g;
    });

//Add class start-node if the startNode property in the graph object is true
d3.selectAll(".node")
    .filter(function (d) {
        return d.startNode === true;
    })
    .classed("start-node", true);

//Add class end-node if the endNode property in the graph object is true
d3.selectAll(".node")
    .filter(function (d) {
        return d.endNode === true;
    })
    .classed("end-node", true);

// Function to update the node and link positions on each tick of the force layout
function ticked() {
    link.attr(
        "d",
        (d) => `M ${d.source.x} ${d.source.y} L ${d.target.x} ${d.target.y}`
    );

    // nodes.attr("x", (d) => d.x - 35/2).attr("y", (d) => d.y - 51/2);
    node.attr(
        "transform",
        (d) => `translate(${d.x - 35 / 2}, ${d.y - 51 / 2})`
    );
}

/**
 * Displays a story preview for the currently hovered node
 * @param {d3Selection} selectedNode the current hovered node in selectNode()
 */
const displayTooltipText = (selectedNode) => {
    let container = d3.select("#algorithm-container");

    let storyPreview = container
        .append("div")
        .attr("class", "story-preview fs-5 p-4 shadow-sm")
        .attr("id", `storyPreview-${selectedNode.id}`);

    gsap.from(storyPreview.node(), {
        opacity: 0,
        scale: 1.4,
        duration: 0.5,
        ease: Back.easeOut.config(2),
    });

    storyPreview.append("h3").text(selectedNode.id);
    storyPreview.append("p").text(selectedNode.text);
};

/**
 * Hides a story preview for the currently exited node
 * @param {d3Selection} selectedNode the current exited node in selectNode()
 */
const hideTooltipText = (selectedNode) => {
    let container = d3.select("#algorithm-container");

    let storyPreview = container.select(`#storyPreview-${selectedNode.id}`);

    storyPreview.attr("id", null);

    gsap.to(storyPreview.node(), {
        opacity: 0,
        scale: 1.4,
        duration: 0.25,
        ease: Back.easeIn.config(2),
        onComplete: () => {
            storyPreview.remove();
        },
    });
};

/**
 * Lets users select from a pool of predefined start and / or end nodes.
 * @param {d3Selection} nodes define the group of nodes that should be selected by the user.
 * Should be either d3.selectAll(".start-node") or d3.selectAll(".end-node")
 * @returns Promise resolved when node is selected
 */
const selectNode = (nodes) => {
    return new Promise((resolve, reject) => {
        d3.selectAll(nodes).classed("current-highlighted-note", true);

        nodes.selectAll(".helper-point").on("mouseover", function (e) {
            let currentNode = d3.select(this.parentNode).datum();
            $(this).attr("cursor", "pointer");

            let stickyNote = d3
                .select(this.parentNode)
                .select(".sticky-note")
                .node();

            gsap.to(stickyNote, {
                scale: 1.8,
                transformOrigin: "center",
                ease: "sine.out",
                duration: 0.333,
            });

            displayTooltipText(currentNode);
            d3.select(`#storyPreview-${currentNode.id}`)
                .style("left", `${e.layerX + 15}px`)
                .style("top", `${e.layerY + 15}px`);
        });

        nodes.selectAll(".helper-point").on("mouseout", function () {
            let currentNode = d3.select(this.parentNode).datum();

            let stickyNote = d3
                .select(this.parentNode)
                .select(".sticky-note")
                .node();

            gsap.to(stickyNote, {
                scale: 1.0,
                transformOrigin: "center",
                ease: "sine.in",
                duration: 0.333,
            });

            hideTooltipText(currentNode);
        });

        let selectedNode;
        nodes.on("click", function () {
            d3.selectAll(nodes).classed("current-highlighted-note", false);
            let currentNode = d3.select(this).datum();

            selectedNode = d3.select(this).datum();
            let pin = d3.select(this).select(".pin");
            gsap.set(pin.node(), { opacity: 1 });
            gsap.from(pin.node(), {
                opacity: 0,
                y: -20,
                scale: 1.4,
                transformOrigin: "center",
                ease: "expo.out",
            });
            nodes.on("click", null);
            nodes.selectAll(".helper-point").on("mouseover", null);
            nodes.selectAll(".helper-point").on("mouseout", null);

            let stickyNote = d3.select(this).select(".sticky-note").node();

            gsap.to(stickyNote, {
                scale: 1.0,
                transformOrigin: "center",
                ease: "sine.in",
                duration: 0.333,
            });
            hideTooltipText(currentNode);
            resolve(selectedNode);
        });
    });
};

/**
 * Runs the dijkstra algorithm to determine the shortest path between to selected nodes
 * @param {String} startNode the id of the selected start node
 * @param {String} endNode the id of the selected end node
 * @returns Promise resolve once the shortest path was calculated
 */
const runAlgorithm = (startNode, endNode) => {
    return new Promise((resolve, reject) => {
        let tlStory = gsap.timeline({
            defaults: { duration: algorithmStepDuration },
            onComplete: () => {
                tlTypewriter.restart();
                tlTypewriter.pause();
                resolve(result.path);
            },
        });

        /**
         * displays the text of the current node in the algorithm progress
         * @param {d3Selection} selectedNode current node
         */
        const displayNodeText = (selectedNode, weightInformation) => {
            // create a new div for the text
            let textDiv = d3.select("#textBox");

            // add the title and text of the node to the div
            textDiv.append("small").attr("id", `h3-${selectedNode.id}`);
            textDiv.append("p").attr("id", `p-${selectedNode.id}`);

            let heading = textDiv.select(`#h3-${selectedNode.id}`);
            let paragraph = textDiv.select(`#p-${selectedNode.id}`);

            tlStory
                .to(heading.node(), {
                    text: `zu Knoten ${selectedNode.id} mit einer Gewichtung von ${weightInformation}`,
                })
                .to(paragraph.node(), {
                    text: `${selectedNode.text}`,

                    onComplete: () => {
                        d3.select("#textBox").node().scrollTop = d3
                            .select("#textBox")
                            .node().scrollHeight;
                    },
                });
        };

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

        //Animation for the nodes on the shortest path
        const highlightNode = (nodesInPath) => {
            const highlightTl = gsap.timeline({
                defaults: { duration: algorithmStepDuration * 2 },
            });
            nodesInPath.forEach((element) => {
                let animSelection = element.select(".result-path-node").node();
                let randomShift = randomNumberBetween(-1.8, 1.8);
                let randomScale = randomNumberBetween(1.0, 1.18);

                gsap.set(animSelection, {
                    x: randomShift,
                    y: randomShift,
                    scale: 0,
                    transformOrigin: "center",
                });

                highlightTl.to(animSelection, {
                    stroke: "#3c5d76",
                    scale: 1 * randomScale,
                    ease: "back.out(1)",
                });
            });
        };

        //Animation for the links on the shortest path
        const highlightLink = (path) => {
            const tlHightlight = gsap.timeline({
                defaults: {
                    duration: algorithmStepDuration,
                },
            });

            let pencil = d3.select("#pencil");

            let filteredLink;
            for (let i = 0; i < path.length - 1; i++) {
                filteredLink = link.filter((d) => {
                    return (
                        d.source.id === path[i] && d.target.id === path[i + 1]
                    );
                });

                Array.from(filteredLink).forEach((link) => {
                    d3.select(link)
                        .attr("stroke", "#3c5d76")
                        .attr("stroke-width", "3")
                        .attr("stroke-dasharray", "8 2")
                        .attr("style", "opacity: 0;");

                    tlHightlight
                        .to(pencil.node(), {
                            opacity: 1,
                            motionPath: {
                                path: link,
                                align: link,
                                alignOrigin: [0, 1],
                            },
                            ease: "power4.in",
                        })
                        .to(d3.select(link).node(), {
                            opacity: 1,
                            ease: "power4.out",
                        });
                });
            }
        };

        //Take the algorithm result and reapply the graph data to each path element
        function convertPath(result) {
            let nodesInPath = [];
            result.path.forEach((element) => {
                nodesInPath.push(
                    node.filter((d) => {
                        return d.id === element;
                    })
                );
            });
            highlightNode(nodesInPath);

            highlightLink(result.path);

            let linkInformationForWeight;
            for (let i = 0; i < result.path.length; i++) {
                let nodeTmp = graph.nodes.find(function (d) {
                    return d.id === result.path[i];
                });

                if (i !== result.path.length - 1){
                    linkInformationForWeight = link
                        .filter(
                            (d) =>
                                d.source.id === result.path[i] &&
                                d.target.id === result.path[i + 1]
                        )
                        .datum().weight;
                }

                displayNodeText(nodeTmp, linkInformationForWeight);
            }
        }

        let result = dijkstra(graph, startNode, endNode);
        convertPath(result);
        tlTypewriter.play();
    });
};

const showAllPaths = (resultPath) => {
    return new Promise((resolve, reject) => {
        let filteredLink = link.filter((d) => {
            return !resultPath.includes(d.source.id);
        });

        d3.selectAll(filteredLink)
            .attr("stroke", "red")
            .attr("stroke-width", "1")
            .attr("style", "opacity: 0;");

        gsap.to(filteredLink.nodes(), {
            opacity: 1,
            onComplete: () => {
                resolve();
            },
        });
    });
};

/**
 * Implementation of the dijkstra algorithm. Finds the shortest path between two points
 *
 * @param {Object{Array, Array}} graph Represents the network made out of nodes. Graph should include all of the edge informations.
 * @param {String} start Starting point of the algorithm.
 * @param {String} end Ending point of the algorithm.
 */
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

    let traversalArray = [];

    // Main loop
    while (unvisitedNodes.length > 0) {
        // Find the unvisited node with the smallest distance
        let currentNodeId = unvisitedNodes.dequeue();
        traversalArray.push(currentNodeId);

        // Stop if we've reached the end node
        if (currentNodeId === endNodeId) {
            break;
        }

        // Update the distance of each neighbor
        graph.links
            .filter(function (d) {
                return (
                    d.source.id === currentNodeId ||
                    d.target.id === currentNodeId
                );
            })
            .forEach(function (link) {
                let neighborId =
                    link.target.id === currentNodeId
                        ? link.source.id
                        : link.target.id;
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
        traversalArray,
        distance: distance[endNodeId],
    };
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

/******************
 *
 * GSAP ANIMATIONS
 *
 */

let tlSpawn = gsap.timeline({ paused: true });
let nodes = d3.selectAll(".node");

tlSpawn.from(nodes.nodes(), {
    scale: 0.2,
    opacity: 0,
    transformOrigin: "center",
    rotation: 30,
    x: -20,
    y: 20,
    ease: Back.easeOut.config(2),
    duration: 0.85,
    stagger: {
        each: 0.1,
        from: "random",
        grid: "auto",
        ease: "power3.inOut",
    },
});

const randomNumberBetween = (min, max) => {
    return Math.random() * (max - min) + min;
};

/**
 * Makes a dialog box with a text appear on screen, that the user can click away in order to proceed
 *
 * @param {String} dialog string that will be displayed on the box
 * @param {Function} onComplete function that will be executed after the box disappears
 */

const showDialogBox = (dialog) => {
    return new Promise((resolve, reject) => {
        const waitForUserInput = () => {
            $(".dialog-box").css("cursor", "pointer");
            $(".dialog-box").css("pointer-events", "all");
            $(".dialog-box").on("click", () => {
                $(".dialog-box").css("cursor", "default");
                $(".dialog-box").css("pointer-events", "none");
                tlDialogBox.to(".dialog-box", {
                    skewX: -30,
                    skewY: -30,
                    opacity: 0,
                    delay: 0.1,
                    ease: Back.easeOut.config(2),
                    onComplete: () => {
                        resolve();
                    },
                });
            });
        };

        gsap.set(".dialog-box", { opacity: 1, skewX: 0, skewY: 0 });
        gsap.set(".dialog", { text: "" });
        gsap.set(".caret", { opacity: 0 });

        let tlDialogBox = gsap.timeline();

        tlDialogBox
            .from(".dialog-box", {
                opacity: 0,
                skewX: 30,
                skewY: 30,
                ease: Back.easeIn.config(2),
            })
            .to(".dialog", {
                text: dialog,
                duration: 1,
                delay: 0.5,
            })
            .to(".caret", {
                opacity: 1,
                onComplete: waitForUserInput,
            });

        gsap.to(".caret", {
            transformOrigin: "center",
            scale: 0.75,

            repeat: -1,
            ease: "power3.in",
            duration: 1,
            yoyo: true,
        });
    });
};

let selectedStartNode, selectedEndNode, resultPath;

showDialogBox(
    "Willkommen bei Dijkstra Story, die Story, die über den Shortest-Path-Algorithmus generiert wird!"
)
    .then((data1) => {
        tlSpawn.play();
        return showDialogBox(
            "Wähle zuerst einen Anfang für deine Geschichte aus. Hover über die aktiven Nodes."
        );
    })
    .then((data) => {
        return selectNode(d3.selectAll(".start-node"));
    })
    .then((data) => {
        selectedStartNode = data.id;
        return showDialogBox(
            `Gute Wahl! Suche dir als nächstes ein Ende für deine Geschichte aus.`
        );
    })
    .then((data) => {
        return selectNode(d3.selectAll(".end-node"));
    })
    .then((data) => {
        selectedEndNode = data.id;
        return showDialogBox(`Sehr gut! Deine Story wird nun generiert!`);
    })

    .then((data) => {
        return runAlgorithm(selectedStartNode, selectedEndNode);
    })
    .then((data) => {
        resultPath = data;
        showDialogBox(
            "Was für ein Meisterwerk an Story! Danke, dass du Dijkstra Story genutzt hast. Dir werden nun alle möglichen Pfade angezeigt."
        );
    })
    .then((data) => {
        showAllPaths(resultPath);
    });
// tlSpawn.play();
// runAlgorithm("1", "17");
