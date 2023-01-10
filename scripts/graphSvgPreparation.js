/**
 * This script takes care of all the important classes on the graph network svg, that are needed to properly animate it.
 * As long as the ID's are properly prepared in a svg creation program, this script will automatically assign all of the classes.
 */

const parent = document.getElementById("nodes");

for (const child of parent.children) {
    child.classList.add("node-container");
}

const allNodeContainers = document.getElementsByClassName("node-container");

for (const nodeContainer of allNodeContainers) {
    for (const node of nodeContainer.children) {
        node.classList.add("node");
    }
}

const nodes = document.getElementsByClassName("node");

for (const node of nodes) {
    for (const element of node.children) {
        let reCheckStickyNote = /sticky-note/;
        let reCheckPin = /pin/;

        if (reCheckStickyNote.test(element.id)) {
            element.classList.add("sticky-note");
        } else if (reCheckPin.test(element.id)) {
            element.classList.add("pin");
        }
    }
}
