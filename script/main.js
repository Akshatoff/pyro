document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger, SplitText, TextPlugin, DrawSVGPlugin);

  let heading_split = new SplitText("#home-heading", { type: "chars" });
  let quote_split = new SplitText("#home-quote", {
    type: "chars",
  });

  let hero_timeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "+=1000",
      scrub: true,
      pin: "#home",
    },
  });

  hero_timeline.fromTo(
    "#hero",
    {
      scale: 1,
    },
    {
      scale: 0.4,
      ease: "power4.inOut",
      stagger: 0.1,
    }
  );

  heading_split.chars.forEach((char) => {
    let heading_timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#home-heading",
        start: "300% top",
        end: "+=800",
        scrub: true,
        markers: true,
      },
    });

    heading_timeline.fromTo(
      heading_split.chars,
      {
        y: -200,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        ease: "power1.inOut",
        stagger: 0.05,
      }
    );
  });

  quote_split.chars.forEach((char) => {
    let quote_timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#home-quote",
        start: "200% top",
        end: "+=800",
        scrub: true,
        markers: true,
      },
    });

    quote_timeline.fromTo(
      quote_split.chars,
      {
        y: -200,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        ease: "power1.inOut",
        stagger: 0.05,
      }
    );
  });
});

const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// I want to be with her
