// Graph data
var graph = {
    "nodes": [
        { "id": "A" },
        { "id": "B" },
        { "id": "C" },
        { "id": "D" },
        { "id": "E" }
    ],
    "links": [
        { "source": "A", "target": "B", "weight": 1 },
        { "source": "B", "target": "A", "weight": 1 },
        { "source": "A", "target": "C", "weight": 2 },
        { "source": "B", "target": "D", "weight": 3 },
        { "source": "C", "target": "D", "weight": 4 },
        { "source": "C", "target": "E", "weight": 2 },
        { "source": "D", "target": "E", "weight": 1 }
    ]
};

// Set up the SVG canvas
var container = d3.select("#algorithm-container");
var width = "100%";
var height = "100%";

var svg = container.append("svg")
    .attr("width", width)
    .attr("height", height);

// Initialize the force layout
var simulation = d3.forceSimulation(graph.nodes)
    .force("link", d3.forceLink(graph.links).id(function (d) { return d.id }))
    .force("charge", d3.forceManyBody().strength(-100))
    .force("center", d3.forceCenter(container.node().getBoundingClientRect().width / 2, container.node().getBoundingClientRect().height / 2))
    .force("collide", d3.forceCollide(30).strength(0.7))
    .on("tick", ticked)

// Add the links to the SVG   
var link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter()
    .append("line")
    .attr("class", "link");

// Add the nodes to the SVG
var node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(graph.nodes)
    .enter()
    .append("circle")
    .attr("class", "node")
    .attr("r", 10)
    .call(d3.drag()
        .on("start", dragStarted)
        .on("drag", dragged)
        .on("end", dragEnded));

// Function to update the node and link positions on each tick of the force layout (multiple ticks per second)
function ticked() {
    link.attr("x1", function (d) { return d.source.x; })
        .attr("y1", function (d) { return d.source.y; })
        .attr("x2", function (d) { return d.target.x; })
        .attr("y2", function (d) { return d.target.y; });

    node.attr("cx", function (d) { return d.x; })
        .attr("cy", function (d) { return d.y; });
}

function dragStarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
}

function dragEnded(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}

//Zoom in and out inside the svg element
var zoom = d3.zoom()
    .scaleExtent([-10, 10])
    .on("zoom", zoomed);

var svg = d3.select("#algorithm-container")
  .call(zoom);

function zoomed(event) {
    node.attr("transform", event.transform);
    link.attr("transform", event.transform);
}

// create a container for the text
var textContainer = d3.select("#text-container");

// function to display the text of a node
function displayNodeText(node) {
  // create a new div for the text
  var textDiv = textContainer.append("div")
    .style("margin-bottom", "10px");

  // add the title and text of the node to the div
  textDiv.append("h3")
    .text(node.title);
  textDiv.append("p")
    .text(node.text);

  // scroll the container down to show the new text
  textContainer.node().scrollTop = textContainer.node().scrollHeight;
}

