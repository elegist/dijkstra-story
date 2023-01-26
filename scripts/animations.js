//import { graph, findShortestPath } from "./dijkstra.js";

//console.clear();

// gsap.set(".pin", { opacity: 0 });
// gsap.set(".links", { opacity: 0 });
// gsap.set("#pencil", { opacity: 0 });

const viewBoxWidth = 1000;
const viewBoxHeight = 800;

const startNodeContainer = document.getElementsByClassName("start-nodes");
const endNodeContainer = document.getElementById("end-nodes");

let selectedStartNode, selectedEndNode;

let explanationText = document.getElementById("explanationText");

// const moveViewport = (section, ease = "expo.out", duration = 1) => {
//     let timeline = gsap.timeline();

//     timeline.to(
//         "#graphNetwork",
//         {
//             attr: {
//                 viewBox: section,
//             },
//             ease: ease,
//             duration: duration,
//         },
//         "+=1"
//     );

//     return timeline;
// };

const setExplanationText = (text) => {
    let timeline = gsap.timeline();

    timeline
        .to(
            "#explanationText",
            {
                text: "_",
                duration: 3,
            },
            "<"
        )
        .to(
            "#explanationText",
            {
                text: text,
                duration: 3,
            },
            ">"
        );

    return timeline;
};

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

// const selectNode = (container, nextTimeline) => {
//     let timelineNodeWiggle = gsap.timeline();

//     let timeline = gsap.timeline();
//     const abortController = new AbortController();

//     let storyText;

//     for (const node of container.children) {
//         const mouseOverHandle = () => {
//             node.classList.add("hover");
//             console.log(node.children[0].id);
//             document.getElementById("storyPreview").innerText =
//                 nodeContents[node.children[0].id].title;

//             gsap.to("#" + node.id, {
//                 scale: 1.8,
//                 transformOrigin: "center",
//                 ease: "sine.out",
//                 duration: 0.333,
//             });
//             gsap.to(
//                 "#storyPreview",
//                 {
//                     scale: 1,
//                     ease: "sine.out",
//                     duration: 0.333,
//                 },
//                 "<"
//             );
//         };

//         const mouseOutHandle = () => {
//             node.classList.remove("hover");

//             gsap.to("#" + node.id, {
//                 scale: 1.0,
//                 transformOrigin: "center",
//                 ease: "sine.in",
//                 duration: 0.333,
//             });
//             gsap.to(
//                 "#storyPreview",
//                 {
//                     scale: 0,
//                     ease: "sine.in",
//                     duration: 0.333,
//                 },
//                 "<"
//             );
//         };

//         const clickHandler = () => {
//             if (container == startNodeContainer) {
//                 selectedStartNode = node.children[0].id;
//             } else if (container == endNodeContainer) {
//                 selectedEndNode = node.children[0].id;
//             }

//             timeline = gsap.timeline({ onComplete: nextTimeline });
//             gsap.set("#" + node.children[2].id, { opacity: 1 });
//             timeline
//                 .from("#" + node.children[2].id, {
//                     opacity: 0,
//                     y: -20,
//                     scale: 1.4,
//                     transformOrigin: "center",
//                     ease: "expo.out",
//                 })
//                 .to("#" + node.id, {
//                     scale: 1.0,
//                     transformOrigin: "center",
//                     ease: "sine.in",
//                     duration: 0.333,
//                 })
//                 .to(
//                     "#storyPreview",
//                     {
//                         scale: 0,
//                         ease: "sine.in",
//                         duration: 0.333,
//                     },
//                     "<"
//                 );

//             node.classList.remove("hover");
//             abortController.abort();
//         };

//         node.addEventListener("click", clickHandler, {
//             signal: abortController.signal,
//         });
//         node.addEventListener("mouseover", mouseOverHandle, {
//             signal: abortController.signal,
//         });
//         node.addEventListener("mouseout", mouseOutHandle, {
//             signal: abortController.signal,
//         });
//     }

//     return timeline;
// };

// const algorithmViewportAnimation = (path, posX, posY) => {
//     let timeline = gsap.timeline();

//     let zoomFactor = 3;
//     let moveTo = zoomFactor * 2;

//     for (let index = 0; index <= path.length; index++) {
//         timeline.add(
//             moveViewport(
//                 `${posX[index] - viewBoxWidth / moveTo} ${
//                     posY[index] - viewBoxHeight / moveTo
//                 } ${viewBoxWidth / zoomFactor} ${viewBoxHeight / zoomFactor}`,
//                 "power3.inOut",
//                 2
//             )
//         );
//     }
//     timeline.add(moveViewport(`0 0 ${viewBoxWidth} ${viewBoxHeight}`));

//     return timeline;
// };

// const algorithmPencilAnimation = (path) => {
//     let timeline = gsap.timeline();

//     for (let index = 0; index < path.length; index++) {
//         timeline.to("#pencil", {
//             motionPath: {
//                 path: `#step-${index}`,
//                 align: `#step-${index}`,
//                 alignOrigin: [0.5, 0.5],
//             },
//             ease: "power3.inOut",
//             duration: 3,
//         });
//     }

//     return timeline;
// };

// const algorithmTypewriterAnimation = () => {
//     let timeline = gsap.timeline();

//     timeline.to("#paper", {
//         y: -200,
//     });

//     return timeline;
// };

// const beginningTimeline = () => {
//     let timeline = gsap.timeline({
//         onComplete: selectNode,
//         onCompleteParams: [startNodeContainer, startNodeSelectedTimeline],
//     });
//     timeline
//         .add(setExplanationText("Willkommen zur Dijkstra Story"))
//         .add(intro())
//         .add(moveViewport(`0 0 ${viewBoxWidth / 2} ${viewBoxHeight / 2}`))
//         .add(
//             setExplanationText(
//                 "Bitte wähle einen Anfang für deine Story. Fahre einfach über die Notizen um ihren Inhalt zu sehen."
//             )
//         );
// };

// const startNodeSelectedTimeline = () => {
//     let timeline = gsap.timeline({
//         onComplete: selectNode,
//         onCompleteParams: [endNodeContainer, endNodeSelectedTimeline],
//     });
//     timeline
//         .add(
//             moveViewport(
//                 `${viewBoxWidth / 2} ${viewBoxHeight / 2} ${viewBoxWidth / 2} ${
//                     viewBoxHeight / 2
//                 }`
//             )
//         )
//         .add(setExplanationText("Wähle nun ein Ende für deine Story"));
// };

// const endNodeSelectedTimeline = () => {
//     let timeline = gsap.timeline({
//         onComplete: pathVisualization,
//         onCompleteParams: [selectedStartNode, selectedEndNode],
//     });
//     timeline
//         .add(moveViewport(`0 0 ${viewBoxWidth} ${viewBoxHeight}`))
//         .add(
//             setExplanationText(
//                 "Sehr gut! Lehn dich zurück, während deine Story generiert wird."
//             )
//         );
// };

// const pathVisualization = (start, end) => {
//     gsap.set(".links", { opacity: 1 });
//     gsap.set("#pencil", { opacity: 1 });

//     let timeline = gsap.timeline();

//     let visitedNodes = findShortestPath(graph, start, end);
//     const allPaths = document.querySelectorAll(".links");

//     let path = [];

//     for (let index = 0; index < visitedNodes.length; index++) {
//         allPaths.forEach((element) => {
//             if (
//                 element.getAttribute("data-from") == visitedNodes[index] &&
//                 element.getAttribute("data-to") == visitedNodes[index + 1]
//             ) {
//                 element.id = `step-${index}`;
//                 path.push(element);
//                 element.setAttribute("stroke", "blue");
//                 element.setAttribute("stroke-width", "4");
//             }
//         });
//     }

//     let nodesPosX = [];
//     let nodesPosY = [];

//     visitedNodes.forEach((node) => {
//         nodesPosX.push(document.getElementById(node).getAttribute("cx"));
//         nodesPosY.push(document.getElementById(node).getAttribute("cy"));
//     });

//     timeline
//         .from(".links", { opacity: 0 })
//         .from("#pencil", { opacity: 0 })
//         .add(algorithmViewportAnimation(path, nodesPosX, nodesPosY))
//         .add(algorithmPencilAnimation(path), "<+=4")
//         .add(algorithmTypewriterAnimation());
// };

// //TODO: let user start the timeline by clicking a button?
// beginningTimeline();
// // pathVisualization("node-position-00", "node-position-01");


let timeline = gsap.timeline()

timeline.add(setExplanationText("Willkommen zur Dijkstra Story"))
.add(setExplanationText("Hier kannst du dir eine Geschichte erstellen lassen"))
.add(setExplanationText("Waehle dazu einen Startknoten"))

timeline.pause()

export {timeline}