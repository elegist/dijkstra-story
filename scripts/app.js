let restartButton = $("#restartButton");

restartButton.on("click", () => {
    window.location.reload();
});

const stories = {
    1: {
        story: "Gulasch",
        text: "Es ist kurz vor 1 und ich habe extremen Hunger.",
        neighbors: ["2"],
        startNode: true,
        endNode: false,
    },
    2: {
        story: "Gulasch",
        text: "Heute Nachmittag möchte ich mir ein leckeres Gulasch kochen. Hoffentlich geht es nicht wieder so schief, wie beim letzten mal.",
        neighbors: ["3", "15", "12", "23", "35", "41"],
        startNode: false,
        endNode: false,
    },
    3: {
        story: "Gulasch",
        text: "Ich habe den Herd zu hoch eingestellt und mir ist fast die Küche abgebrannt.",
        neighbors: ["4", "9", "18", "26", "37", "40"],
        startNode: false,
        endNode: false,
    },
    4: {
        story: "Gulasch",
        text: "Ich gehe in den Supermarkt, um mir alle nötigen Zutaten zu kaufen.",
        neighbors: ["5", "10", "17", "24", "36", "44"],
        startNode: false,
        endNode: false,
    },
    5: {
        story: "Gulasch",
        text: "Zuhause angekommen, packe ich die Zutaten aus und bereite alles vor, um das Gericht zuzubereiten.",
        neighbors: ["6", "12", "19", "23", "37", "46"],
        startNode: false,
        endNode: false,
    },
    6: {
        story: "Gulasch",
        text: "Schweiß bildet sich auf meiner Stirn, als ich den Herd anmache und die Zutaten hineingebe.",
        neighbors: ["7", "14", "20", "29", "33", "47"],
        startNode: false,
        endNode: false,
    },
    7: {
        story: "Gulasch",
        text: "Zwei Stunden später: Ich blicke auf die Ruine meines einstigen Hauses.",
        neighbors: [],
        startNode: false,
        endNode: true,
    },

    8: {
        story: "Dieb",
        text: "Ich stehe am Gate 17 und warte auf meinen Flug nach England.",
        neighbors: ["9"],
        startNode: true,
        endNode: false,
    },
    9: {
        story: "Dieb",
        text: "Ein paar Meter weiter steht eine Frau. Sie sieht nervös aus und läuft die ganze Zeit auf und ab.",
        neighbors: ["10", "18", "21", "33", "42"],
        startNode: false,
        endNode: false,
    },
    10: {
        story: "Dieb",
        text: "Polizisten kommen und reden mit ihr.",
        neighbors: ["11", "15", "23", "35", "45"],
        startNode: false,
        endNode: false,
    },
    11: {
        story: "Dieb",
        text: "Sie erzählt ihnen, dass sie gerade beraubt wurde und dass all ihre Wertsachen fehlen.",
        neighbors: ["12", "19", "25", "34", "43"],
        startNode: false,
        endNode: false,
    },
    12: {
        story: "Dieb",
        text: "Jetzt kommen die Polizisten auf mich zu.",
        neighbors: ["13", "16", "24", "36", "44"],
        startNode: false,
        endNode: false,
    },
    13: {
        story: "Dieb",
        text: "Da ich der Dieb bin, sollte ich jetzt lieber anfangen wegzurennen, statt weiter die Szenerie zu beschreiben.",
        neighbors: ["14", "23"],
        startNode: false,
        endNode: false,
    },
    14: {
        story: "Dieb",
        text: "Wir rannten noch immer, als die Sonne unterging.",
        neighbors: [],
        startNode: false,
        endNode: true,
    },

    15: {
        story: "Auftritt",
        text: "Ich habe extremes Lampenfieber vor dem, was gleich folgt.",
        neighbors: ["16", "24", "33"],
        startNode: true,
        endNode: false,
    },
    16: {
        story: "Auftritt",
        text: "Ich bin der Gitarrist der Band, die heute abend spielt und das ist mein erster Auftritt.",
        neighbors: ["17", "26", "42"],
        startNode: false,
        endNode: false,
    },
    17: {
        story: "Auftritt",
        text: "Mir sagen zwar alle, dass ich mir keine Sorgen machen muss, aber ich tue es trotzdem.",
        neighbors: ["18", "30", "42"],
        startNode: false,
        endNode: false,
    },
    18: {
        story: "Auftritt",
        text: "Was, wenn ich etwas vergesse? Was, wenn ich mich blamiere?",
        neighbors: ["19", "30", "45"],
        startNode: false,
        endNode: false,
    },
    19: {
        story: "Auftritt",
        text: "Der Augenblick ist gekommen. Ich gehe auf die Bühne.",
        neighbors: ["20", "33", "47"],
        startNode: false,
        endNode: false,
    },
    20: {
        story: "Auftritt",
        text: "Doch ich habe mir völlig umsonst Sorgen gemacht. Es ist alles gut gelaufen.",
        neighbors: [],
        startNode: false,
        endNode: true,
    },

    21: {
        story: "Albtraum DB",
        text: "Der Alarm meines Wecker holt mich um 6 Uhr aus dem Bett.",
        neighbors: ["22"],
        startNode: true,
        endNode: false,
    },
    22: {
        story: "Albtraum DB",
        text: "Mein Bus kommt aber schon bald, also muss das Frühstück heute ausfallen.",
        neighbors: ["23", "35", "44"],
        startNode: false,
        endNode: false,
    },
    23: {
        story: "Albtraum DB",
        text: "Es ist zwar noch früh, aber der Bus ist voll besetzt, also muss ich stehen.",
        neighbors: ["24", "35", "45"],
        startNode: false,
        endNode: false,
    },
    24: {
        story: "Albtraum DB",
        text: "Es ist so laut, dass niemand meinen Magen knurren hört.",
        neighbors: ["25", "36", "47"],
        startNode: false,
        endNode: false,
    },
    25: {
        story: "Albtraum DB",
        text: "Der Bus bleibt im Verkehr stecken. Ich bekomme Panik, denn ich könnte meinen Zug verpassen.",
        neighbors: ["26", "37", "46"],
        startNode: false,
        endNode: false,
    },
    26: {
        story: "Albtraum DB",
        text: "Als ich nach der Zugverbindung gucke, kann ich erleichtert aufatmen.",
        neighbors: ["27", "38", "48"],
        startNode: false,
        endNode: false,
    },
    27: {
        story: "Albtraum DB",
        text: "Der Zug hat mal wieder Verpätung also stehen die Chancen gut, dass ich ihn noch erreiche.",
        neighbors: ["28", "39", "42"],
        startNode: false,
        endNode: false,
    },
    28: {
        story: "Albtraum DB",
        text: "Am Bahnhof angekommen, nehme ich die Beine in die Hand und schaffe es noch zum Zug, als gerade die Türen schließen. Glück gehabt.",
        neighbors: ["29", "36", "43"],
        startNode: false,
        endNode: false,
    },
    29: {
        story: "Albtraum DB",
        text: "Auf halben Weg kommt der Zug zum Stillstand.",
        neighbors: ["30", "35", "45"],
        startNode: false,
        endNode: false,
    },
    30: {
        story: "Albtraum DB",
        text: "Eine Durchsage meldet, dass wir aufgrund einer Störung nicht weiterfahren können und in den Hauptbahnhof, aus dem wir herkamen, zurückkehren.",
        neighbors: ["31", "39", "48"],
        startNode: false,
        endNode: false,
    },
    31: {
        story: "Albtraum DB",
        text: "Ich ärgere mich so sehr, dass ich mich plötzlich in meinem Bett wiederfinde.",
        neighbors: ["32", "34", "44"],
        startNode: false,
        endNode: false,
    },
    32: {
        story: "Albtraum DB",
        text: "Es war alles nur ein Traum. Ich stehe auf und hoffe, das mein Traum nun nicht zur Realität wird.",
        neighbors: [],
        startNode: false,
        endNode: true,
    },

    33: {
        story: "Mond",
        text: "Ich mache mich bereit für meinen Trip zum Mond. Letzte Checks und Vorbereitungen sind fast abgeschlossen.",
        neighbors: ["33"],
        startNode: true,
        endNode: false,
    },
    34: {
        story: "Mond",
        text: "In meinem Kopf stelle ich mir die unbekannten Weiten des Weltraums vor und werde nervös.",
        neighbors: ["35", "41"],
        startNode: false,
        endNode: false,
    },
    35: {
        story: "Mond",
        text: "Liftoff. Die G-Kräfte drücken mich in den Sitz und ich versuche einen kühlen Kopf zu behalten.",
        neighbors: ["36", "42"],
        startNode: false,
        endNode: false,
    },
    36: {
        story: "Mond",
        text: "Plötzlich spüre ich wie die Schwerelosigkeit einsetzt und ich die Erde von weitem betrachten kann.",
        neighbors: ["37", "46"],
        startNode: false,
        endNode: false,
    },
    37: {
        story: "Mond",
        text: "Nun wird es ernst. Die Landung kommt näher. Für mich ist es das erste mal auf dem Mond und ich kann es kaum erwarten.",
        neighbors: ["38", "45"],
        startNode: false,
        endNode: false,
    },
    38: {
        story: "Mond",
        text: "Die Erforschung des Mondes erweist sich schwieriger, als gedacht. Dennoch kann ich Proben nehmen und die Oberfläche für ein paar Tage erforschen.",
        neighbors: ["39", "46"],
        startNode: false,
        endNode: false,
    },
    39: {
        story: "Mond",
        text: "Nun geht es zurück zur Erde und ich verspüre ein wenig Traurigkeit.",
        neighbors: [],
        startNode: false,
        endNode: true,
    },

    40: {
        story: "Dschungel",
        text: "Ich bin tief in einem dicht bewachsenen Dschungel und versuche einen Ausweg zu finden.",
        neighbors: ["41"],
        startNode: true,
        endNode: false,
    },
    41: {
        story: "Dschungel",
        text: "Plötzlich erscheint ein pinker Elefant aus dem Nichts und bietet mir an, mir einen Ausweg zu zeigen.",
        neighbors: ["42"],
        startNode: false,
        endNode: false,
    },
    42: {
        story: "Dschungel",
        text: "Auf dem Weg kommen wir ins Gespräch und er erzählt mir von seinen Abenteuern aus dem Weltall.",
        neighbors: ["43"],
        startNode: false,
        endNode: false,
    },
    43: {
        story: "Dschungel",
        text: "Ich konnte kaum glauben was ich hörte, aber wollte den Moment nicht kaputt machen, also hinterfragte ich es nicht.",
        neighbors: ["44"],
        startNode: false,
        endNode: false,
    },
    44: {
        story: "Dschungel",
        text: "Als wir den Rand des Dschungels erreichten, verabschiedete sich der Elefant und flog in All.",
        neighbors: ["45"],
        startNode: false,
        endNode: false,
    },
    45: {
        story: "Dschungel",
        text: "Ich stand verwundert da und fragte mich ob ich träume.",
        neighbors: ["46"],
        startNode: false,
        endNode: false,
    },
    46: {
        story: "Dschungel",
        text: "Ich entschied mich, meine Reise fortzuführen und stieß auf eine Gruppe sprechender Kakteen.",
        neighbors: ["47"],
        startNode: false,
        endNode: false,
    },
    47: {
        story: "Dschungel",
        text: "Sie luden mich ein, ihrer Kaktus Gesellschaft beizutreten, um mir die Geheimnisse des Zeitreisens beizubringen.",
        neighbors: ["48"],
        startNode: false,
        endNode: false,
    },
    48: {
        story: "Dschungel",
        text: "Ich konnte nicht widerstehen und begleitete sie auf ihrer Reise durch die Zeit.",
        neighbors: [],
        startNode: false,
        endNode: true,
    },
};

let graph = {
    nodes: [],
    links: [],
};

const algorithmStepDuration = 1.4;
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
    .force("charge", d3.forceManyBody().strength(-0.07))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collide", d3.forceCollide(60).strength(0.07))
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
const displayTooltipText = (selectedNode, mouseX, mouseY) => {
    let container = d3.select("#algorithm-container");

    let storyPreview = container
        .append("div")
        .attr("class", "story-preview fs-5 p-4 shadow-sm")
        .attr("id", `storyPreview-${selectedNode.id}`);

    storyPreview.append("h3").text(selectedNode.id);
    storyPreview.append("p").text(selectedNode.text);

    if (mouseY > container.node().clientHeight / 2) {
        d3.select(`#storyPreview-${selectedNode.id}`)
            .style("left", `${mouseX - storyPreview.node().clientWidth / 2}px`)
            .style("top", `${mouseY - storyPreview.node().clientHeight}px`);
    } else {
        d3.select(`#storyPreview-${selectedNode.id}`)
            .style("left", `${mouseX - storyPreview.node().clientWidth / 2}px`)
            .style("top", `${mouseY}px`);
    }

    gsap.from(storyPreview.node(), {
        opacity: 0,
        scale: 1.4,
        duration: 0.5,
        ease: Back.easeOut.config(2),
    });
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

            displayTooltipText(
                currentNode,
                e.layerX,
                e.layerY,
                e.clientX,
                e.clientHeight
            );
            // d3.select(`#storyPreview-${currentNode.id}`)
            //     .style("left", `${e.layerX}px`)
            //     .style("top", `${e.layerY}px`);
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
            nodes.selectAll(".helper-point").attr("cursor", "default");
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
            textDiv
                .append("small")
                .attr("id", `h3-${selectedNode.id}`)
                .attr("class", "node-info");
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

                if (i !== result.path.length - 1) {
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
        each: 0.025,
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
            "Wähle zuerst einen Anfang für deine Geschichte aus. Hover über die aktiven Nodes um ihren Inhalt zu sehen und Klicke um deine Auswahl festzusetzen."
        );
    })
    .then((data) => {
        return selectNode(d3.selectAll(".start-node"));
    })
    .then((data) => {
        selectedStartNode = data.id;
        return showDialogBox(
            `Suche dir als nächstes ein Ende für deine Geschichte aus.`
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
            "Was für ein Meisterwerk an einer Story! Dir werden nun alle möglichen Pfade angezeigt. Wenn du gerne mehr über die Funktionsweise des Dijkstras erfahren möchtest, schau doch nochmal auf der Hauptseite vorbei."
        );
    })
    .then((data) => {
        showAllPaths(resultPath);
    });
// tlSpawn.play();
// runAlgorithm("1", "2").then((data) => showAllPaths(data));
