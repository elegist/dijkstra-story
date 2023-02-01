// navbar and hero animation

let tlHero = gsap.timeline({
    defaults: { ease: "power4.inOut", duration: 1.7 },
});

tlHero
    .to(".hero", {
        "clip-path": "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        opacity: 1,
        y: 0,
    })
    .from(
        "#appLink, #infoLink",
        {
            opacity: 0,
            y: 100,
            scale: 1.6,
            ease: "back.out(1.7)",
            duration: 0.6,
            stagger: 0.1,
        },
        "-=0.3"
    );

// algorithm info section

gsap.to(".algorithm-info", {
    scrollTrigger: {
        trigger: ".algorithm-info",
        start: "top center",
        toggleActions: "play none none reverse",
    },
    "clip-path": "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
    opacity: 1,
    y: 0,
});

// dijkstra info section

gsap.to(".dijkstra-info", {
    scrollTrigger: {
        trigger: ".dijkstra-info",
        start: "-100px center",
        toggleActions: "play none none reverse",
    },
    "clip-path": "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
    opacity: 1,
    y: 0,
});

// pros and cons section

gsap.from(".list-group-item", {
    scrollTrigger: {
        trigger: ".pros-cons",
        start: "top center",
        toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 100,
    stagger: 0.1,
    ease: "sine.inOut",
});

// scroll to's

let linksSm = document.querySelectorAll(".link-sm"),
    linksLg = document.querySelectorAll(".link-lg");

linksSm.forEach((link, index) => {
    link.addEventListener("click", () => {
        gsap.to(window, {
            duration: 0.7,
            scrollTo: {
                y: "#scrollTrigger" + (index + 1),
                offsetY: $(".navbar").outerHeight(true),
                ease: "power4.inOut",
            },
        });
    });
});

linksLg.forEach((link, index) => {
    link.addEventListener("click", () => {
        gsap.to(window, {
            duration: 0.7,
            scrollTo: {
                y: "#scrollTrigger" + (index + 1),
                offsetY: $(".navbar").outerHeight(true),
                ease: "power4.inOut",
            },
        });
    });
});

let infoLink = $("#infoLink");

infoLink.on("click", () => {
    gsap.to(window, {
        duration: 0.7,
        scrollTo: {
            y: "#scrollTrigger2",
            offsetY: $(".navbar").outerHeight(true),
            ease: "power4.inOut",
        },
    });
});

// algorithm explanations

let previousButton = $("#previousButton"),
    nextButton = $("#nextButton"),
    infoText = $("#infoText");

let texts = [
    "Nutze die Buttons, um den Algorithmus Schritt für Schritt verdeutlicht zu bekommen.",
    "Der kürzeste Weg wird anhand von Abständen zwischen den Knoten errechnet. Jede Verbindung hat eine Gewichtung gegeben, die den Abstand beschreibt.",
    "Der kürzeste Weg von A zu B soll herausgefunden werden.",
    "Zunächst wird der Abstand von A zu sich selbst auf 0 und die der restlichen Knoten vorrübergehend auf unendlich gesetzt.",

    "Die Nachbarn des aktuellen Knotens werden untersucht",
    "Die Kosten des momentanen Knotens werden auf den Abstand der Nachbarn addiert",
    "Wenn das Ergebnis kleiner ist, als der momentan zugewiesene Wert, wird dieser ersetzt.",
    "Jeder unbesuchte Nachbar wird in die Warteschlange eingefügt.",
    "Die Untersuchung dieses Knotens ist nun abgeschlossen. Er wird dem Ergebnis hinzugefügt.",
    "Der Knoten in der Warteschlange mit den geringsten Kosten ist der nächste zu untersuchende Knoten.",

    "Der Zielknoten B wurde erreicht und er wird ebenfalls dem Ergebnis hinzugefügt.",
];

let index = 0;

previousButton.on("click", () => {
    tlAlgorithmInfo.reverse();
});
nextButton.on("click", () => {
    gsap.to("#animationIndicator", {
        opacity: 1,
        duration: 0.25,
    });
    nextButton.prop("disabled", true);
    previousButton.prop("disabled", true);
    tlAlgorithmInfo.play();
});

infoText.text(texts[index]);

gsap.set("#animationIndicator", { opacity: 0 });

let animationSpeed = 0.5;
let tlAlgorithmInfo = gsap.timeline({
    defaults: {
        duration: animationSpeed,
        ease: "back.inOut(2)",
        transformOrigin: "center",
    },
    paused: true,
});

gsap.set(".rowWeight", {
    opacity: 0,
    x: -15,
});

const onCompleteHandle = () => {
    gsap.to("#animationIndicator", {
        opacity: 0,
        duration: 0.25,
    });

    setTimeout(() => {
        nextButton.prop("disabled", false);
        previousButton.prop("disabled", false);
    }, 400);
};

let scaleFactor = 1.05,
    borderStyle = "4px solid #f44034";

const displayText = (text) => {
    let timeline = gsap.timeline({
        defaults: { duration: animationSpeed },
        onComplete: onCompleteHandle,
    });

    timeline.set("#infoText", { opacity: 0, text: text });

    timeline.to("#infoText", {
        opacity: 1,
    });

    tlAlgorithmInfo.addPause();

    return timeline;
};

const startNodeSetup = () => {
    let timeline = gsap.timeline({
        defaults: { duration: animationSpeed },
        onComplete: onCompleteHandle,
    });

    timeline
        .to("#nodeTable", {
            scale: scaleFactor,
            border: borderStyle,
        })
        .to("#nodeA", {
            stroke: "#f44034",
        })
        .to("#rowWeightA", {
            text: "0",
            opacity: 1,
            x: 0,
        })
        .to("#nodeTable", {
            scale: 1.0,
            border: "2px solid black",
        });

    tlAlgorithmInfo.addPause();

    return timeline;
};

const remainingNodesSetup = () => {
    let timeline = gsap.timeline({
        defaults: { duration: animationSpeed },
        onComplete: onCompleteHandle,
    });

    timeline
        .to("#nodeTable", {
            scale: scaleFactor,
            border: borderStyle,
        })
        .to("#rowWeightB, #rowWeightC, #rowWeightD, #rowWeightE", {
            text: "&infin;",
            opacity: 1,
            x: 0,
        })
        .to("#nodeTable", {
            scale: 1.0,
            border: "2px solid black",
        });

    tlAlgorithmInfo.addPause();

    return timeline;
};

const updateNodeWeight = (
    source,
    target,
    currentWeight,
    parentWeight,
    addToWeight
) => {
    let timeline = gsap.timeline({
        defaults: { duration: animationSpeed },
        onComplete: onCompleteHandle,
    });

    let newWeight = parseInt(parentWeight) + parseInt(addToWeight);

    timeline
        .to("#infoGraph", {
            scale: scaleFactor,
            border: borderStyle,
        })
        .to(`.line${source}to${target}, #node${target}`, {
            stroke: "#6ba752",
        })
        .to("#nodeTable", {
            scale: scaleFactor,
            border: borderStyle,
        })
        .to(
            `#rowName${target}`,
            {
                color: "#6ba752",
            },
            "<"
        )
        .to(`.weight${source}to${target}`, {
            scale: 1.5,
            repeat: 1,
            yoyo: true,
            ease: "sine.inOut",
        })
        .to(`#rowWeight${target}`, {
            opacity: 0,
            x: -15,
        })
        .to(`#rowWeight${target}`, {
            text:
                currentWeight < newWeight
                    ? `${parentWeight} + ${addToWeight} > ${currentWeight}`
                    : `${parentWeight} + ${addToWeight} < ${currentWeight}`,
        })
        .to(`#rowWeight${target}`, {
            opacity: 1,
            x: 0,
        });

    tlAlgorithmInfo.addPause();

    return timeline;
};

const setCost = (source, target, currentWeight, parentWeight, addToWeight) => {
    let timeline = gsap.timeline({
        defaults: { duration: animationSpeed },
        onComplete: onCompleteHandle,
    });

    let newWeight = parseInt(parentWeight) + parseInt(addToWeight);

    timeline
        .to(`#rowWeight${target}`, {
            opacity: 0,
            x: -15,
        })
        .to(`#rowWeight${target}`, {
            text: currentWeight < newWeight ? currentWeight : newWeight,
        })
        .to(`#rowWeight${target}`, {
            opacity: 1,
            x: 0,
        })
        .to(`.line${source}to${target}, #node${target}`, {
            stroke: "black",
        })
        .to(
            `#rowName${target}`,
            {
                color: "black",
            },
            "<"
        )
        .to("#infoGraph, #nodeTable", {
            scale: 1,
            border: "2px solid black",
        });

    tlAlgorithmInfo.addPause();

    return timeline;
};

const updateQueue = (newQueue) => {
    let timeline = gsap.timeline({
        defaults: { duration: animationSpeed },
        onComplete: onCompleteHandle,
    });

    timeline
        .to("#queue", {
            scale: scaleFactor,
            border: borderStyle,
        })
        .to("#queueMembers", {
            text: newQueue,
            ease: "back.out(2)",
        })
        .to("#queue", {
            scale: 1,
            border: "2px solid black",
        });

    tlAlgorithmInfo.addPause();

    return timeline;
};

const updateResult = (result) => {
    let timeline = gsap.timeline({
        defaults: { duration: animationSpeed },
        onComplete: onCompleteHandle,
    });

    timeline
        .to("#result", {
            scale: scaleFactor,
            border: borderStyle,
        })
        .to("#resultMembers", {
            text: result,
            ease: "back.out(2)",
        })
        .to("#result", {
            scale: 1,
            border: "2px solid black",
        });

    tlAlgorithmInfo.addPause();

    return timeline;
};

const selectNewNode = (oldNode, newNode) => {
    let timeline = gsap.timeline({
        defaults: { duration: animationSpeed },
        onComplete: onCompleteHandle,
    });

    timeline
        .to("#nodeTable, #infoGraph", {
            scale: scaleFactor,
            border: borderStyle,
        })
        .to(`#node${oldNode}`, {
            stroke: "black",
        })
        .to(`#rowWeight${newNode}, #rowName${newNode}`, {
            color: "#f44034",
        })
        .to(`#node${newNode}`, {
            stroke: "#f44034",
        })
        .to("#nodeTable, #infoGraph", {
            scale: 1,
            border: "2px solid black",
        });

    tlAlgorithmInfo.addPause();

    return timeline;
};

const algorithmFinished = (text) => {
    let timeline = gsap.timeline({
        defaults: { duration: animationSpeed },
        onComplete: () => gsap.set("#animationIndicator", { opacity: 0 }),
    });

    timeline.set("#infoText", { opacity: 0, text: text });

    timeline.to("#infoText", {
        opacity: 1,
    });

    tlAlgorithmInfo.addPause();

    return timeline;
};

tlAlgorithmInfo
    .add(displayText(texts[1]))
    .add(displayText(texts[2]))
    .add(displayText(texts[3]))
    .add(startNodeSetup())
    .add(remainingNodesSetup())
    .add(displayText(texts[4]))

    // first iteration
    .add(displayText(texts[5]))
    .add(updateNodeWeight("A", "C", "&infin;", "0", "1"))
    .add(displayText(texts[6]))
    .add(setCost("A", "C", "&infin;", "0", "1"))
    .add(updateNodeWeight("A", "D", "&infin;", "0", "5"))
    .add(setCost("A", "D", "&infin;", "0", "5"))
    .add(displayText(texts[7]))
    .add(updateQueue("C, D"))
    .add(displayText(texts[8]))
    .add(updateResult("A"))
    .add(displayText(texts[9]))

    // select new node
    .add(selectNewNode("A", "C"))
    .add(updateQueue("D"))
    .to("#rowWeightC, #rowNameC", {
        color: "black",
    })

    // second iteration
    .add(displayText(texts[5]))
    .add(updateNodeWeight("C", "D", "5", "1", "2"))
    .add(displayText(texts[6]))
    .add(setCost("C", "D", "5", "1", "2"))
    .add(updateNodeWeight("C", "E", "&infin;", "1", "1"))
    .add(setCost("C", "E", "&infin;", "1", "1"))
    .add(displayText(texts[7]))
    .add(updateQueue("E, D"))
    .add(displayText(texts[8]))
    .add(updateResult("A, C"))
    .add(displayText(texts[9]))

    // select new node
    .add(selectNewNode("C", "E"))
    .add(updateQueue("D"))
    .to("#rowWeightE, #rowNameE", {
        color: "black",
    })

    // third iteration
    .add(displayText(texts[5]))
    .add(updateNodeWeight("E", "D", "3", "2", "3"))
    .add(displayText(texts[6]))
    .add(setCost("E", "D", "3", "2", "3"))
    .add(displayText(texts[7]))
    .add(updateQueue("D"))
    .add(displayText(texts[8]))
    .add(updateResult("A, C, E"))
    .add(displayText(texts[9]))

    // select new node
    .add(selectNewNode("E", "D"))
    .add(updateQueue(""))
    .to("#rowWeightD, #rowNameD", {
        color: "black",
    })

    //fourth iteration
    .add(displayText(texts[5]))
    .add(updateNodeWeight("D", "B", "&infin;", "3", "1"))
    .add(displayText(texts[6]))
    .add(setCost("D", "B", "&infin;", "3", "1"))
    .add(updateResult("A, C, E, D"))

    .add(displayText(texts[10]))
    .add(updateResult("A, C, E, D, B"))
    .add(
        algorithmFinished("Damit ist der Wegfindungsalgorithmus abgeschlossen")
    );
