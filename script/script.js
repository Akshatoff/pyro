document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger, SplitText, TextPlugin, DrawSVGPlugin);

  let init_loader = 0;
  const loader_count = document.getElementById("loading-number");
  function updateLoader() {
    loader_count.textContent = init_loader + "%";
    init_loader++;
    if (init_loader > 100) {
      clearInterval(loader_timer);
      loader_count.textContent = "100%";
    }
  }

  const loader_timer = setInterval(updateLoader, 100)


  gsap.fromTo("path", 
    {
      drawSVG: "0%",
      duration: 10,
      ease: "power1.inOut"
    },
    {
      drawSVG: "100%",
      duration: 10,
      ease: "power1.inOut"
    }
  )

  setInterval(() => {
    window.location.replace("/home.html")
  }, 10000);
});

  
//Lenis
const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// I want to be with her
