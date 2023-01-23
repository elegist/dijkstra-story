// cards

const algorithmCards = document.querySelectorAll(".algorithm-card");

algorithmCards.forEach((card, index) => {
    card.addEventListener("click", () => {
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
    });
});
