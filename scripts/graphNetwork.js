const nodes = document.querySelectorAll(".node");

gsap.set(".path", { opacity: 0 });

let appearAnimation = gsap.timeline({
    defaults: { duration: 0.85, ease: Back.easeOut.config(2), opacity: 0 },
});

appearAnimation
    .from(".sticky-note", {
        scale: 0.2,
        x: -20,
        y: 20,
        transformOrigin: "center",
        rotation: 30,
        stagger: {
            each: 0.1,
            from: "random",
            grid: "auto",
            ease: "power3.inOut",
        },
    })
    .from(".pin", {
        scale: 1.4,
        transformOrigin: "center",
        y: -20,
        ease: "expo.out",
        stagger: {
            each: 0.1,
            from: "random",
            grid: "auto",
            ease: "power3.inOut",
        },
    });
