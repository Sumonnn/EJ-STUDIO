function loco() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}
loco();

function page1Andpage2() {

    gsap.to(".page1>.page1-img", {
        width: '100%',
        height: '100vh',
        scrollTrigger: {
            trigger: ".page1",
            scroller: ".main",
            // markers:true,
            start: "top 10%",
            end: "top -40%",
            scrub: 2,
            pin: true,
        }
    })
    gsap.from(".page2>h1", {
        rotate: '5',
        opacity: 0,
        y: 100,
        stagger: 1,
        scrollTrigger: {
            trigger: ".page2>h1",
            scroller: ".main",
            // markers: true,
            start: "top 60%",
            end: "top 40%",
            scrub: 3,
        }
    })
}
page1Andpage2();

//page3 text animation with timeline
function page3Animation() {
    let page3TL = gsap.timeline({
        scrollTrigger: {
            trigger: ".page3",
            scroller: ".main",
            pin: true,
            scrub: 2,
            // markers: true,
            start: "top 0%",
            end: "top -100%",
        }
    });


    page3TL
        .from(".page3 h1", {
            scale: 1.95,
            lineHeight: "20vw"
        }, "a")
        .from(".page3 h2", {
            scale: 1.9,
            lineHeight: "35vw"
        }, "a")
        .to(".page4", {
            y: "-180vh"
        }, "a")

}
page3Animation();

gsap.from(".page4 .page4-img>img", {
    height: "200%",
    opacity: 0,
    scrollTrigger: {
        trigger: ".page4",
        scroller: ".main",
        //   markers:true,
        start: "top 160%",
        end: "top 159%",
        scrub: 2,
    }
})

function page5Animation() {
    let page5TL = gsap.timeline({
        scrollTrigger: {
            trigger: ".page5",
            scroller: ".main",
            // markers: true,
            scrub: 2,
            pin: true,
        }
    })
    page5TL
        .to(".page5>h1", {
            scale: 4,
            filter: 'blur(20px)',
            opacity: 0,
        }, 'b')
        .to(".page5>.para", {
            opacity: 1,
        })
        .to(".bg", {
            display: "none",
        }, 'b')
}
page5Animation();

function cursurFN() {

    let crsr = document.querySelector(".cursur");
    let main = document.querySelector("body");
    let page4Img = document.querySelectorAll(".page4-img");

    main.addEventListener("mousemove", (dets) => {
        crsr.style.top = dets.y + 15 + 'px';
        crsr.style.left = dets.x + 15 + 'px';
    })

    page4Img.forEach((img) => {
        img.addEventListener("mouseenter", () => {
            crsr.style.width = `${100}px`;
            crsr.style.height = `${100}px`;
            crsr.style.backgroundColor = `white`;
            crsr.innerHTML = "MORE";
        })
        img.addEventListener("mouseleave", () => {
            crsr.style.width = `${35}px`;
            crsr.style.height = `${35}px`;
            crsr.style.backgroundColor = `transparent`;
            crsr.innerHTML = " ";
        })
    })

    document.querySelector("nav>p").addEventListener("mouseenter", () => {
        crsr.style.width = `${75}px`;
        crsr.style.height = `${75}px`;
    })
    document.querySelector("nav>p").addEventListener("mouseleave", () => {
        crsr.style.width = `${35}px`;
        crsr.style.height = `${35}px`;
    })
    document.querySelector("nav>.menu").addEventListener("mouseenter", () => {
        crsr.style.width = `${75}px`;
        crsr.style.height = `${75}px`;
    })
    document.querySelector("nav>.menu").addEventListener("mouseleave", () => {
        crsr.style.width = `${35}px`;
        crsr.style.height = `${35}px`;
    })

    let enterh1 = document.querySelectorAll(".full-screen>h1");
    enterh1.forEach((h1) => {
        h1.addEventListener("mouseenter", () => {
            crsr.style.width = `${75}px`;
            crsr.style.height = `${75}px`;
        })
        h1.addEventListener("mouseleave", () => {
            crsr.style.width = `${35}px`;
            crsr.style.height = `${35}px`;
        })
    })
}
cursurFN();

function fullScreen() {


    let flag = 0;
    document.querySelector("nav .menu").addEventListener("click", () => {
        if (flag === 0) {
            document.querySelector("nav .menu").style.height = `${4}px`;
            document.querySelector("nav .menu .line1").style.rotate = `${40}deg`;
            document.querySelector("nav .menu .line2").style.rotate = `${-45}deg`;
            document.querySelector(".full-screen").style.top = `${0}%`;
            {
                let h1AllData = document.querySelectorAll(".full-screen>h1");
                h1AllData.forEach((elem) => {
                    elem.style.paddingTop = `${0}vw`;
                })
            }
            flag = 1;
        }
        else {
            document.querySelector("nav .menu").style.height = `${12}px`;
            document.querySelector("nav .menu .line1").style.rotate = `${0}deg`;
            document.querySelector("nav .menu .line2").style.rotate = `${0}deg`;
            document.querySelector(".full-screen").style.top = `${-100}%`;
            {
                let h1AllData = document.querySelectorAll(".full-screen>h1");
                h1AllData.forEach((elem) => {
                    elem.style.paddingTop = `${10}vw`;
                })
            }
            flag = 0;
        }
    })
}
fullScreen();

function loder(){
    

let loderTL = gsap.timeline();

loderTL
        .to(".loder .loder-text .rotate-text>p",{
            y:-62,
            duration:1.8,
            delay:0.5,
        })
        .to(".loder .loder-text",{
            y:-50,
            rotateX:-30,
            opacity:0,
            duration:0.8,
        })
        .to(".loder #loder1",{
            height:0,
            duration:0.5,
            delay:0.3,
        },'a')
        .to(".loder #loder2",{
            height:0,
            duration:0.5,
            delay:-0.4,
        })
        .to(".loder #loder3",{
            height:0,
            duration:0.5,
            delay:0.3,
        },'a')
        .to(".loder #loder4",{
            height:0,
            duration:0.5,
            delay:-0.2,
        })
        .to(".loder",{
            top:'-100vh',
            duration:0.1,
        })


}
loder();