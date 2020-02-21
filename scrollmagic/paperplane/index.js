//  - https://greensock.com/docs/v3/Plugins/MotionPathPlugin
gsap.registerPlugin(MotionPathPlugin);

const flightPath = {
  path: [{ x: 100, y: -20 }, { x: 300, y: 10 }, { x: 500, y: 100 }, { x: 750, y: -100 }, { x: 350, y: -50 }, { x: 600, y: 100 }, { x: 800, y: 0 }],
  autoRotate: true,
  curviness: 1.25,
  type: "cubic"
};

// https://greensock.com/docs/v3/GSAP/Timeline
const tween =  new TimelineLite();
tween
  .to(".paper-plane", {
    ease: "power1.inOut", // https://greensock.com/docs/v3/Eases
    motionPath: flightPath
  })


// http://scrollmagic.io/docs/ScrollMagic.Controller.html
const controller = new ScrollMagic.Controller();

// http://scrollmagic.io/docs/ScrollMagic.Scene.html
const scene = new ScrollMagic.Scene({
  tweenChanges: true,
  triggerElement: ".animation",
  triggerHook: "onLeave",
  duration: 30000
})
  .setPin(".animation")
  .setTween(tween)
  .addIndicators()
  .addTo(controller);