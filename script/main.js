document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger, SplitText, TextPlugin, DrawSVGPlugin);

  let heading_split = new SplitText("#home-heading", { type: "chars" });
  const card = document.querySelector('.code-snip')
  let bounds;
  let pyrocon = document.querySelector(".pyro-image-con");
  let pyroimg = document.querySelector(".pyro-img ");

  function rotateToMouse(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const leftX = mouseX - bounds.x;
    const topY = mouseY - bounds.y;
    const center=  {
      x: leftX - bounds.width / 2,
      y: topY - bounds.height / 2,
    }
    const distance = Math.sqrt(center.x**2 + center.y**2)

    card.style.transform = `
  rotate3d(
    ${center.y / 100},
    ${-center.x / 100},
    0,
    ${Math.log(distance) * 4}deg
  )`;


  }

  card.addEventListener('mouseenter', () => {
    bounds = card.getBoundingClientRect();
    document.addEventListener('mousemove', rotateToMouse);
  });

  card.addEventListener('mouseleave', () => {
    document.removeEventListener('mousemove', rotateToMouse);
    card.style.transform = '';
    card.style.background = '';
  });
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
  pyrocon.addEventListener("mousemove", (e) => {
    const rect = pyrocon.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const offsetX = x - centerX;
    const offsetY = y - centerY;


      const moveX = offsetX * 0.25;
      const moveY = offsetY * 0.25;

        pyroimg.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;

  });
pyrocon.addEventListener("mouseleave", () => {
    pyroimg.style.transform = `translate(0px, 0px) scale(1)`;

});

pyrocon.addEventListener("mouseenter", () => {
  pyroimg.style.transform = `scale(1.05)`;
})

});

const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// I want to be with her
