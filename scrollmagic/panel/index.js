const controller = new ScrollMagic.Controller();
const timeline = new TimelineLite();

timeline
  .fromTo("#panel1", { x: "100%" }, { x: "0%" }, 0)
  .fromTo("#button1", { y: "2800%" }, { y: "0%" }, 0)
  .fromTo("#panel2", { x: "100%" }, { x: "0%" }, 1)
  .fromTo("#panel3", { x: "100%" }, { x: "0%" }, 2);

const scene = new ScrollMagic.Scene( 
  { tweenChanges: true, triggerElement: "#pinContainer", triggerHook: "onLeave", duration: 30000}
)
  .setPin("#pinContainer")
  .setTween(timeline)
  .addIndicators()
  .addTo(controller);