// https://greensock.com/docs/v3/GSAP/CorePlugins/CSSPlugin
const rule = CSSRulePlugin.getRule("span:after");

// Timeline: https://greensock.com/docs/v3/GSAP/Timeline
// gsap.to(): https://greensock.com/docs/v3/GSAP/gsap.to()
// gsap.form(): https://greensock.com/docs/v3/GSAP/gsap.from()
const tl = gsap.timeline({ defaults: { duration: 1 } });
tl.from(".anim1", { y: -50, stagger: .6, opacity: 0 })
  .to(rule, { duration: 1.8, cssRule: { scaleY: 0 } }, "-=2.2")
  .from("aside", { backgroundPosition: '200px 0px', opacity: 0 }, "-=1.5")
  .from("img", { y: 30, opacity: 0 }, "-=.5")

document.getElementById('cta').addEventListener('click', () => {
  tl.reversed() ? tl.play() : tl.reverse();
  gsap.to(".credit", { delay: 2.0, duration: 1.0, zIndex: 500, opacity: 1 })
})

// Ease:  https://greensock.com/docs/v3/Eases
