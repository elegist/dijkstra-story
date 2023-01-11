let infoBoxes = $(".infoBox");
//var textItem = gsap.utils.toArray(".card-body");

gsap.from(infoBoxes, {
    scrollTrigger: {
        trigger: "#infoBoxes",
        toggleActions: "restart none none none"
    },
    y: 50,
    autoAlpha: 0,
    stagger: 0.2
});




/* Info Text. Run on server for it to work 
var infoTextObj;
function initText() {
  $.ajax({
    url: "./resources/strings/strings.json"
  }).done(function(data) {
    infoTextObj = data;
  });
}


function addInfoText(text) {
    $(textItem).html(text[1]);
    console.log(text[1])
}  

$(document).ready(function() {
    initText();
    addInfoText(infoTextObj);
  });

*/








