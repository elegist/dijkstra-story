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

// algorithm info section

gsap.to(".algorithm-card", {
  scrollTrigger: {
    trigger: ".algorithm-card",
    start: "center center",
    toggleActions: "play none none reverse",
  },
  "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  opacity: 1,
  stagger: 0.1,
});

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

// algorithm cards

const algorithmCards = document.querySelectorAll(".algorithm-card");

algorithmCards.forEach((card, index) => {
  card.onclick = () => {
    const state = Flip.getState(algorithmCards);
    const isCardActive = card.classList.contains("active");

    algorithmCards.forEach((otherCard, otherIndex) => {
      otherCard.classList.remove("active");
      otherCard.classList.remove("inactive");

      if (!isCardActive && index !== otherIndex) {
        otherCard.classList.add("inactive");
      }
    });

    if (!isCardActive) {
      card.classList.add("active");
    }

    Flip.from(state, {
      duration: 0.5,
      ease: "expo.inOut",
      absolute: true,
    });
  };
});

// scroll to's

let navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link, index) => {
  link.addEventListener("click", () => {
    gsap.to(window, {
      duration: 0.7,
      scrollTo: {
        y: "#section" + (index + 1),
        offsetY: 180,
        ease: "power4.inOut",
      },
    });
  });
});
