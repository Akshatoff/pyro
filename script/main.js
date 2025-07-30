window.addEventListener("load", (event) => {
    gsap.registerPlugin(ScrollTrigger, SplitText, TextPlugin, DrawSVGPlugin);

    const card = document.querySelector('.code-snip')
    let bounds;
    let pyrocon = document.querySelector(".pyro-image-con");
    let pyroimg = document.querySelector(".pyro-img ");
    let pyrovid = document.querySelector(".pyro-video")

    function rotateToMouse(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const leftX = mouseX - bounds.x;
        const topY = mouseY - bounds.y;
        const center = {
            x: leftX - bounds.width / 2,
            y: topY - bounds.height / 2,
        }
        const distance = Math.sqrt(center.x ** 2 + center.y ** 2)

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

    let heading_split = new SplitText("#home-heading", { type: "chars" });
    let quote_split = new SplitText("#home-quote", {
        type: "chars",
    });

    // Fixed hero timeline with shorter pin duration
    let hero_timeline = gsap.timeline({
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "+=800", // Reduced from 1000 to 800
            scrub: true,
            pin: "#home",
        },
    });

    hero_timeline.fromTo(
        "#hero", {
            scale: 1,
        }, {
            scale: 0.4,
            ease: "power4.inOut",
            stagger: 0.1,
        }
    );

    // Fixed heading animation triggers
    let heading_timeline = gsap.timeline({
        scrollTrigger: {
            trigger: "#home-heading",
            start: "200% top", // Changed from 300% to 200%
            end: "+=600", // Reduced duration
            scrub: true,
        },
    });

    heading_timeline.fromTo(
        heading_split.chars, {
            y: -200,
            opacity: 0,
        }, {
            y: 0,
            opacity: 1,
            ease: "power1.inOut",
            stagger: 0.05,
        }
    );

    // Fixed quote animation triggers
    let quote_timeline = gsap.timeline({
        scrollTrigger: {
            trigger: "#home-quote",
            start: "150% top", // Changed from 200% to 150%
            end: "+=600", // Reduced duration
            scrub: true,
        },
    });

    quote_timeline.fromTo(
        quote_split.chars, {
            y: -200,
            opacity: 0,
        }, {
            y: 0,
            opacity: 1,
            ease: "power1.inOut",
            stagger: 0.05,
        }
    );

    // Pyro image mouse effects
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

    // Parallax scroll effect
    document.addEventListener("scroll", function() {
        const parallaxcontainer = document.querySelector('.parallax-container');
        if (!parallaxcontainer) {
            return;
        }

        const containerrect = parallaxcontainer.getBoundingClientRect();
        const containertop = containerrect.top;
        const containerheight = containerrect.height;

        if (containertop <= window.innerHeight && containertop + containerheight >= 0) {
            const scrollYprogress = -containertop / (containerheight - window.innerHeight);
            const parallaxImages = document.querySelectorAll('.parallax-img');
            parallaxImages.forEach(image => {
                const speed = parseFloat(image.getAttribute('data-speed'));
                const movement = 300;
                const offsetYforparallax = -(scrollYprogress * movement * speed);
                image.style.transform = `translateY(${offsetYforparallax}px)`;
            })
        }
    })

    // Fixed video timeline
    let pyrotech_video_timeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".pyro-video",
            start: "30% center", // Changed from "top top"
            end: "+=800", // Reduced from 1000
            scrub: true,
            pin: ".video-container",

        },
    });

    pyrotech_video_timeline.to(pyrovid, {
        scaleX: 1.2,
        scaleY: 1.2,
        ease: "power2.inOut",
    });

    pyrotech_video_timeline.to(pyrovid, {
        scaleX: 0.9,
        scaleY: 0.7,
        y: -150,
        ease: "power2.inOut",
    });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".animation-container",
            start: "top top",
            end: "+=800px",
            scrub: 1.2,
            pin: ".sticky-wrapper",
            markers: true,
            pinSpacing: false,
        }
    });

    tl.to("#text-pane", {
            xPercent: 100,
            opacity: 0,
            duration: 1
        })
        .to("#media-pane", {
            width: "80vh",
            height: "80vh",
            left: "50%",
            top: "50%",
            xPercent: -50,
            yPercent: -50,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%)",
            duration: 1
        }, 0);

    tl.to("#media-pane", {
        duration: 1,
        width: "100vw",
        height: "100vh",
        xPercent: 0,
        yPercent: 0,
        top: 0,
        left: 0,
    })

    tl.to("#fullscreen-text", {
        opacity: 1,
        duration: 0.5
    }, "-=0.8");

    // Refresh ScrollTrigger after all animations are set up
    ScrollTrigger.refresh();

    const first = gsap.timeline({
        scrollTrigger: {
            trigger: "#first",
            start: "top center",
            end: "+=200px",
            scrub: 1.2,
        }
    });
    const second = gsap.timeline({
        scrollTrigger: {
            trigger: "#second",
            start: "top center",
            end: "+=200px",
            scrub: 1.2,
        }
    });
    const third = gsap.timeline({
        scrollTrigger: {
            trigger: "#third",
            start: "top center",
            end: "+=200px",
            scrub: 1.2,
        }
    });
    const fourth = gsap.timeline({
        scrollTrigger: {
            trigger: "#fourth",
            start: "top center",
            end: "+=200px",
            scrub: 1.2,
        }
    });

    first.to("#first", {
        x: 100,
        duration: 1
    });
    second.to("#second", {
        x: -100,
        duration: 1
    });third.to("#third", {
        x: 100,
        duration: 1
    });fourth.to("#fourth", {
        x: -100,
        duration: 1
    });

});

// Lenis smooth scrolling setup
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// I want to be with her
