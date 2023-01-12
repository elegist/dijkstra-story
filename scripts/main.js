let infoBoxes = $(".infoBox");
let cardIcons = $(".cardIcon");

gsap.from(infoBoxes, {
    scrollTrigger: {
        trigger: "#infoBoxes",
        toggleActions: "restart none none none",
        start: "top 20%"
    },
    y: 50,
    autoAlpha: 0,
    stagger: 0.2,
    onComplete: function() {
      gsap.from(cardIcons, {
        scale: 0.5,
        repeat: -1,
        yoyo: true
      })
    }
});

/* extra padding for body so navbar won't overlap with content */
navbar_height = $(".navbar").outerHeight(true);
$("body").css("padding-top", navbar_height)

/* offset for clicking nav-links */
$("html").css("scroll-padding-top", navbar_height)

/* back to top btn */
$("#btn-to-top").click( function(){
  window.scrollTo(0, 0);
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








