gsap.registerPlugin(MorphSVGPlugin, DrawSVGPlugin);

gsap.set(".gsap-3-logo", { autoAlpha: 1 });

var fades = gsap.timeline()
  .from(".logo-guy", { x: -73, y: -8, ease: "power1", duration: 3.2 }, 4.8)
  .from(".logo-guy, .purple-bg", { autoAlpha: 0, duration: 2.5 }, 4.6)

var gsapLetters = gsap.timeline({ defaults: { duration: 0.5 } })
  .from(".letter-outline", { drawSVG: false, duration: 1, stagger: 0.2 })
  .addLabel("lettersIn", "-=0.9")
  .from(".letter-face", { scale: 0.3, transformOrigin: "center center", ease: "power4", duration: 1.3, stagger: 0.13 }, "lettersIn")
  .to(".letter-face", { opacity: 1, stagger: 0.1 }, "lettersIn")
  .from(".letter-outline", { stroke: "#88CE02", stagger: 0.1 }, "lettersIn+=0.6");

var hasArrivedLetters = gsap.from(".has-arrived-letter", {
  duration: 1.8,
  y: 34,
  x: 80,
  autoAlpha: 0,
  ease: "power4",
  stagger: 0.2
});


var intro3 = gsap.timeline()
  .set(".outline-3", { stroke: "#88CE02", drawSVG: "50% 50%" })
  .set(".outline-3-2", { drawSVG: "50% 50%" })
  .to(".outline-3", { drawSVG: "0% 100%", ease: "power1.in", duration: 1.8 })
  .fromTo("#mask-3", { x: -500, y: -130 }, { x: 0, y: 0, duration: 1.8, ease: "none" }, "-=0.2")
  .fromTo(".waves-3", { x: 500, y: 130, autoAlpha: 1 }, { x: 0, y: 0, duration: 1.8, ease: "none" }, "-=1.8")
  .to(".outline-3-2", { drawSVG: "0% 100%", ease: "power1.in", duration: 2 }, 0.4);

var move3 = gsap.timeline()
  .set(".logo-3-whole", { svgOrigin: "605 150", immediateRender: true })
  .from(".logo-3-whole", { x: -260, rotation: -360, duration: 0.9, ease: "back.inOut" })
  .to(".logo-3-whole", { y: -130, ease: "power1.inOut", duration: 0.3 }, 0.2)
  .to(".logo-3-whole", { y: 0, ease: "elastic", duration: 1.1 }, 0.5)
  .to(".logo-3-shadow", { autoAlpha: 1, duration: 1.3 }, "-=0.9")

var master = gsap.timeline()
  .add(intro3)
  .add(move3, "-=0.3")
  .add(gsapLetters, "-=1.7")
  .add(hasArrivedLetters, "-=1.3")
  .add(fades, 0);



//background flare animations
var qty = 30,
  flaresContainer = document.querySelector("#flaresContainer"),
  randomShift = gsap.utils.random(-400, 50, null, true),
  randomX = function () {
    return "+=" + randomShift();
  },
  purpleBg = document.querySelector(".gsap-3-logo .purple-bg"),
  img, i, centerX, bgRange, screenScale;
function setFlareSizes() {
  var w = purpleBg.getBoundingClientRect().width || 500;
  bgRange = w / 2;
  centerX = window.innerWidth / 2 + bgRange / 3;
  screenScale = Math.min(1, w / 1000);
}
window.addEventListener("resize", setFlareSizes);
setFlareSizes();
while (qty--) {
  img = new Image(85, 85);
  img.src = "https://greensock.com/_img/flare.png";
  flaresContainer.appendChild(img);
  img._scale = gsap.utils.random(0.09, 0.45) * screenScale;
  img._cycle = -1;
  gsap.set(img, { scale: img._scale, opacity: 0 });
  animateFlare(img, true);
}
function animateFlare(img, init) {
  var delay = 0,
    duration = 1 / img._scale;
  if (+gsap.getProperty(img, "opacity") === 0) {
    if (img._cycle) {
      gsap.set(img, { y: "random(-85, " + (window.innerHeight - 250) + ")", x: "random(" + (centerX - bgRange) + "," + (centerX + bgRange) + ")" });
      delay = init ? 5.5 + Math.random() * 6 : Math.random() * 4;
      gsap.to(img, {
        opacity: Math.random() * 0.5 + 0.15, duration: 1, delay: delay, onComplete: function () {
          img._cycle = 1;
        }
      });
      img._cycle = 0;
    }
  } else if (img._cycle > 0 || parseFloat(gsap.getProperty(img, "y")) > window.innerHeight) {
    gsap.to(img, { opacity: 0, overwrite: "auto", duration: 1 });
    img._cycle = -1;
  } else if (img._cycle) {
    img._cycle++;
  }
  gsap.to(img, { y: "+=200", ease: "none", delay: delay, duration: duration });
  gsap.to(img, { x: randomX, ease: "sine.inOut", duration: duration, onComplete: animateFlare, onCompleteParams: [img], delay: delay });
}