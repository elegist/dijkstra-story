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
        "#appLink",
        {
            opacity: 0,
            y: 100,
            scale: 1.6,
            ease: "back.out(1.7)",
            duration: 0.6,
        },
        "-=0.3"
    );

// dijkstra info section

gsap.to(".dijkstra-info", {
    scrollTrigger: {
        trigger: ".dijkstra-info",
        start: "top center",
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

let navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link, index) => {
    link.addEventListener("click", () => {
        gsap.to(window, {
            duration: 0.7,
            scrollTo: {
                y: "#section" + (index + 1),
                offsetY: $(".navbar").outerHeight(true),
                ease: "power4.inOut",
            },
        });
    });
});

// algorithm explanations

let previousButton = $("#previousButton"),
    nextButton = $("#nextButton"),
    infoText = $("#infoText");

let texts = [
    "Nutze die Buttons um den Algorithmus Schritt für Schritt verdeutlicht zu bekommen.",
    "Der kürzeste Weg wird anhand von Abständen zwischen den Knoten errechnet. Jede Verbindung hat eine Gewichtung gegeben, die den Abstand beschreibt",
    "Wir suchen uns einen Startknoten aus, in diesem Fall Knoten A, und setzen den Abstand zu sich selbst auf 0.",
    "Da wir die Abstände zu den übrigen Knoten noch nicht kennen, setzen wir diese provisorisch auf unendlich.",
    "Wir untersuchen die Nachbarn des momentanen Knotens und aktualisieren die Abstandswerte, wenn sie kleiner sind, als der bisher bekannte",
    "Wir fügen jeden noch nicht besuchten Knoten in eine Warteschlange ein.",
    "Der nächste zu untersuchende Knoten ist der mit der kleinsten Gewichtung",
    "Wir untersuchen die Nachbarn des momentanen Knotens und aktualisieren die Abstandswerte, wenn sie kleiner sind, als der bisher bekannte",
    "Wir fügen jeden noch nicht besuchten Knoten in eine Warteschlange ein.",
    "Der nächste zu untersuchende Knoten ist der mit der kleinsten Gewichtung",
    "Wir untersuchen die Nachbarn des momentanen Knotens und aktualisieren die Abstandswerte, wenn sie kleiner sind, als der bisher bekannte",
    "Wir fügen jeden noch nicht besuchten Knoten in eine Warteschlange ein.",
    "Der nächste zu untersuchende Knoten ist der mit der kleinsten Gewichtung",
    "Wir untersuchen die Nachbarn des momentanen Knotens und aktualisieren die Abstandswerte, wenn sie kleiner sind, als der bisher bekannte",
    "Wir haben den Zielknoten erreicht und bilden nun rückwärts den kürzesten Pfad von A zu B",
];

let index = 0;

previousButton.on("click", () => {
    if (index - 1 >= 0) {
        index--;
        infoText.text(texts[index]);
    }

    tlAlgorithmInfo.reverse();
});
nextButton.on("click", () => {
    if (index + 1 < texts.length) {
        index++;
        infoText.text(texts[index]);
    }

    if (index >= 2) {
        tlAlgorithmInfo.play();
        if (index !== texts.length - 1) {
            nextButton.prop("disabled", true);
            previousButton.prop("disabled", true);
        }
    }
});

infoText.text(texts[index]);

const enableButtons = () => {
    nextButton.prop("disabled", false);
    previousButton.prop("disabled", false);
};

const updateNodeWeight = (
    source,
    target,
    currentWeight,
    parentWeight,
    addToWeight
) => {
    let timeline = gsap.timeline({ defaults: { duration: animationSpeed } });

    let newWeight = parseInt(parentWeight) + parseInt(addToWeight);

    timeline
        .to(`.line${source}to${target}, #node${target}`, {
            stroke: "#6ba752",
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
            duration: 2,
        })
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
        );
    return timeline;
};

const updateQueue = (newQueue) => {
    let timeline = gsap.timeline({ defaults: { duration: 1 } });

    timeline.to("#queueMembers", {
        text: newQueue,
        ease: "back.out(2)",
    });

    return timeline;
};

let animationSpeed = 0.666;
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

tlAlgorithmInfo
    .to("#nodeA", {
        stroke: "#f44034",
    })
    .to("#rowWeightA", {
        text: "0",
        opacity: 1,
        x: 0,
    })
    .addPause("+=0", enableButtons)
    .to("#rowWeightB, #rowWeightC, #rowWeightD, #rowWeightE", {
        text: "&infin;",
        opacity: 1,
        x: 0,
    })
    .addPause("+=0", enableButtons)
    .add(updateNodeWeight("A", "C", "&infin;", "0", "1"))
    .add(updateNodeWeight("A", "D", "&infin;", "0", "5"))
    .addPause("+=0", enableButtons)
    .add(updateQueue("C, D"))
    .addPause("+=0", enableButtons)
    .to("#nodeA", {
        stroke: "black",
    })
    .to("#rowWeightC, #rowNameC", {
        color: "#f44034",
    })
    .to("#nodeC", {
        stroke: "#f44034",
    })
    .add(updateQueue("D"))
    .addPause("+=0", enableButtons)
    .to("#rowWeightC, #rowNameC", {
        color: "black",
    })
    .add(updateNodeWeight("C", "D", "5", "1", "2"))
    .add(updateNodeWeight("C", "E", "&infin;", "1", "1"))
    .addPause("+=0", enableButtons)
    .add(updateQueue("E, D"))
    .addPause("+=0", enableButtons)
    .to("#nodeC", {
        stroke: "black",
    })
    .to("#rowWeightE, #rowNameE", {
        color: "#f44034",
    })
    .to("#nodeE", {
        stroke: "#f44034",
    })
    .add(updateQueue("D"))
    .addPause("+=0", enableButtons)
    .to("#rowWeightE, #rowNameE", {
        color: "black",
    })
    .add(updateNodeWeight("E", "D", "3", "2", "3"))
    .addPause("+=0", enableButtons)
    .add(updateQueue("D"))
    .addPause("+=0", enableButtons)
    .to("#nodeE", {
        stroke: "black",
    })
    .to("#rowWeightD, #rowNameD", {
        color: "#f44034",
    })
    .to("#nodeD", {
        stroke: "#f44034",
    })
    .add(updateQueue(""))
    .addPause("+=0", enableButtons)
    .to("#rowWeightD, #rowNameD", {
        color: "black",
    })
    .add(updateNodeWeight("D", "B", "&infin;", "3", "1"))
    .addPause("#=0", enableButtons);
