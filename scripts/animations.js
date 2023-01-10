console.clear();

gsap.set(".pin", { opacity: 0 });

const viewBoxWidth = 1000;
const viewBoxHeight = 800;

const startNodeContainer = document.getElementById("start-nodes");
const endNodeContainer = document.getElementById("end-nodes");

let explanationText = document.getElementById("explanationText");

const moveViewport = (section) => {
    let timeline = gsap.timeline();

    timeline.to(
        "#graphNetwork",
        {
            attr: {
                viewBox: section,
            },
            ease: "expo.out",
            duration: 1,
        },
        "+=1"
    );

    return timeline;
};

const setExplanationText = (text) => {
    let timeline = gsap.timeline();

    timeline
        .to(
            "#explanationText",
            {
                text: "_",
                duration: 1,
            },
            "<"
        )
        .to(
            "#explanationText",
            {
                text: text,
                duration: 1,
            },
            ">"
        );

    return timeline;
};

const intro = () => {
    let timeline = gsap.timeline();

    timeline.from(".sticky-note", {
        x: -20,
        y: 20,
        scale: 0.2,
        rotation: 30,
        transformOrigin: "center",
        opacity: 0,
        ease: Back.easeOut.config(2),
        duration: 0.85,
        stagger: {
            each: 0.1,
            from: "random",
            grid: "auto",
            ease: "power3.inOut",
        },
    });

    return timeline;
};

const selectNode = (container) => {
    let timeline = gsap.timeline();

    for (const node of container.children) {
        const zoomInAnim = () => {
            node.classList.add("hover");
            document.getElementById("storyPreview").innerText = node.id;

            timeline = gsap.timeline();
            timeline
                .to("#" + node.id, {
                    scale: 1.8,
                    transformOrigin: "center",
                    ease: "sine.out",
                    duration: 0.333,
                })
                .to(
                    "#storyPreview",
                    {
                        scale: 1,
                        duration: 0.333,
                    },
                    "<"
                );
        };

        const zoomOutAnim = () => {
            node.classList.remove("hover");

            timeline = gsap.timeline();
            timeline
                .to("#" + node.id, {
                    scale: 1.0,
                    transformOrigin: "center",
                    ease: "sine.in",
                    duration: 0.333,
                })
                .to(
                    "#storyPreview",
                    {
                        scale: 0,
                        duration: 0.333,
                    },
                    "<"
                );
        };

        const selectNode = () => {
            timeline = gsap.timeline({ onComplete: nextTimeline });
            gsap.set("#" + node.children[1].id, { opacity: 1 });
            timeline
                .from("#" + node.children[1].id, {
                    opacity: 0,
                    y: -20,
                    scale: 1.4,
                    transformOrigin: "center",
                    ease: "expo.out",
                })
                .to("#" + node.id, {
                    scale: 1.0,
                    transformOrigin: "center",
                    ease: "sine.in",
                    duration: 0.333,
                })
                .to(
                    "#storyPreview",
                    {
                        scale: 0,
                        duration: 0.333,
                    },
                    "<"
                );

            node.removeEventListener("mouseover", zoomInAnim);
            node.removeEventListener("mouseout", zoomOutAnim);
            node.classList.remove("hover");

            selectedStartNode = node.id;
        };

        node.addEventListener("mouseover", zoomInAnim);

        node.addEventListener("mouseout", zoomOutAnim);

        node.addEventListener("click", selectNode);
    }
};

const selectEndNode = () => {
    let timeline = gsap.timeline();

    timeline.to(
        "#graphNetwork",
        {
            attr: {
                viewBox: `${viewBoxWidth / 2} ${viewBoxHeight / 2} ${
                    viewBoxWidth / 2
                } ${viewBoxHeight / 2}`,
            },
            ease: "expo.out",
            duration: 1,
        },
        "+=1"
    );

    return timeline;
};

let timelineToStartNode = gsap.timeline({
    onComplete: selectNode,
    onCompleteParams: [startNodeContainer],
    paused: true,
});
timelineToStartNode
    .add(setExplanationText("Willkommen zur Dijkstra Story"))
    .add(intro())
    .add(moveViewport(`0 0 ${viewBoxWidth / 2} ${viewBoxHeight / 2}`))
    .add(
        setExplanationText(
            "Bitte wähle einen Anfang für deine Story. Fahre einfach über die Notizen um ihren Inhalt zu sehen."
        )
    );
timelineToStartNode.play();

const nextTimeline = () => {
    let timeline = gsap.timeline({
        onComplete: selectNode,
        onCompleteParams: [endNodeContainer],
        paused: true,
    });
    timeline
        .add(
            moveViewport(
                `${viewBoxWidth / 2} ${viewBoxHeight / 2} ${viewBoxWidth / 2} ${
                    viewBoxHeight / 2
                }`
            )
        )
        .add(setExplanationText("Wähle nun ein Ende für deine Story"));

    timeline.play();
};
