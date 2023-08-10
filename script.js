gsap.to(".page1>.page1-img", {
    width: '100%',
    height: '100vh',
    scrollTrigger: {
        trigger: ".page1",
        scroller: "body",
        // markers:true,
        start: "top 10%",
        end: "top -40%",
        scrub: 2,
        pin: true,
    }
})
gsap.from(".page2>h1", {
    rotate:'5',
    opacity: 0,
    y: 100,
    stagger:1,
    scrollTrigger: {
        trigger: ".page2>h1",
        scroller: "body",
        // markers: true,
        start:"top 60%",
        end:"top 40%",
        scrub:3,
    }
})