import Head from "next/head";
import Header from "../components/header";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { motion } from "framer-motion";
import AnimatedText from "../components/AnimatedText";
import HeroVidChanger from "../components/heroVideoChanger";
import CursorChanger from "../components/CursorChanger";

const fadeInUp = {
  initial: {
    y: 10,
    opacity: 0,
    skewY: 0.5,
  },
  inView: {
    y: 0,
    skewY: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const stagger = {
  inView: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const fadeIn = {
  initial: {
    opacity: 0,
  },
  inView: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const fadeInRenders = {
  initial: {
    scale: 1.1,
  },
  inView: {
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function Home() {
  const [heroOption, SetHeroOption] = useState("preview");
  const mainRef = useRef(null);

  const placeholderText = [
    { type: "heading1", text: "The Walls." },
    {
      type: "heading2",
      text: "In the metaverse.",
    },
  ];

  const container = {
    visible: {
      transition: {
        staggerChildren: 0.025,
      },
    },
  };

  useEffect(() => {
    // var locoScroll;
    // import("locomotive-scroll").then((locomotiveModule) => {
    //   locoScroll = new locomotiveModule.default({
    //     el: document.querySelector("[data-scroll-container]"),
    //     smooth: true,
    //     smoothMobile: false,
    //     smartphone: {
    //       smooth: false,
    //     },
    //     reloadOnContextChange: false,
    //     direction: "vertical",
    //     speed: "1",
    //     getDirection: true,
    //   });
    // }); //End of Loco

    var cursor = document.querySelector(".custom-cursor");
    var cursorSVG = document.querySelector(".cursor-svg");
    var cursorPlay = document.querySelector(".cursor-play");
    var links = document.querySelectorAll("a");
    var test = document.querySelectorAll(".preview-vid");
    var heroSection = document.querySelector(".meow-hero");
    var previewVid = document.querySelector(".preview-vid");
    var trailerVid = document.querySelector(".trailer-vid");
    var initCursor = false;

    for (var i = 0; i < links.length; i++) {
      var selfLink = links[i];

      selfLink.addEventListener("mouseover", function () {
        cursor.classList.add("custom-cursor--link");
      });
      selfLink.addEventListener("mouseout", function () {
        cursor.classList.remove("custom-cursor--link");
      });
    }

    for (var i = 0; i < test.length; i++) {
      var selfTest = test[i];

      selfTest.addEventListener("mouseover", function () {
        cursor.classList.add("custom-cursor--video");
        cursorSVG.classList.add("hidden");
        cursorPlay.classList.remove("opacity-0");
      });
      selfTest.addEventListener("mouseout", function () {
        cursor.classList.remove("custom-cursor--video");
        cursorSVG.classList.remove("hidden");
        cursorPlay.classList.add("opacity-0");
      });
    }

    function toTrailer() {
      SetHeroOption("trailer");
      cursor.classList.remove("vid-loading");
      cursor.classList.remove("custom-cursor--video");
      cursorSVG.classList.remove("hidden");
      cursorPlay.classList.add("opacity-0");
    }

    heroSection.addEventListener("mouseover", function () {
      if (previewVid !== null) {
        previewVid.addEventListener("click", function () {
          SetHeroOption("blank");
          cursor.classList.add("vid-loading");
          let heroVidTl = gsap.timeline({ onComplete: toTrailer });
          heroVidTl.delay(1);
          heroVidTl.add;
        });
      }
    });

    window.addEventListener("mousemove", function (e) {
      let mouseX = e.clientX;
      let mouseY = e.clientY;

      if (!initCursor) {
        // cursor.style.opacity = 1;
        gsap.to(cursor, {
          opacity: 1,
          duration: 0,
          ease: "none",
        });
        initCursor = true;
      }

      cursor.style.left = mouseX + "px";
      cursor.style.top = mouseY + "px";
    });

    let currentSlide = 1;
    let sliderInterval = setInterval(function () {
      if (currentSlide == 0) currentSlide = 1;
      // let btns = document.querySelectorAll(".circleBtn");
      // let currBtn = document.querySelector(`.circleBtn${currentSlide}`);
      let sliders = document.querySelectorAll(".hero-slide");
      let currslider = document.querySelector(`.slide-${currentSlide}`);
      // if (!currBtn.classList.contains("active")) {
      // btns.forEach((btn) => {
      //   btn.classList.remove("active");
      // });
      // currBtn.classList.add("active");
      sliders.forEach((slider) => {
        slider.classList.remove("active");
      });
      currslider.classList.add("active");
      // }

      currentSlide = (currentSlide + 1) % 4;
    }, 4000);

    return () => {
      // if (locoScroll) {
      //   locoScroll.destroy();
      //   locoScroll = null;
      //   document.querySelectorAll(".c-scrollbar").forEach((el) => {
      //     el.remove();
      //   });
      // }
    };
  });

  return (
    <div>
      <Head>
        <title>Meow Club · NFTWorlds Project</title>
        <meta name="description" content="Meow Club · NFTWorlds Project" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <main ref={mainRef} data-scroll-container>
        <section className="w-screen h-[40vh] lg:h-screen bg-black overflow-hidden relative flex flex-row items-center justify-center meow-hero">
          <HeroVidChanger option={heroOption} />
        </section>
        <section className="w-screen h-[50vh] xl:h-screen hero-section flex flex-row items-center justify-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={container}
            className="font-DMSans text-4xl lg:text-7xl xl:text-9xl flex flex-col items-center justify-center"
          >
            {placeholderText.map((item, index) => {
              return <AnimatedText {...item} key={index} />;
            })}
          </motion.div>
        </section>
        <section className="w-screen h-fit overflow-hidden flex flex-col items-center">
          <div className="hero-slide overflow-hidden slide-1 hidden active h-full w-full">
            <motion.span
              initial="initial"
              whileInView="inView"
              viewport={{ root: mainRef }}
              variants={stagger}
              className="font-DMSans text-white absolute left-16 bottom-16 xl:left-24 xl:bottom-24 z-[2] text-xl xl:text-7xl tracking-normal flex flex-col items-start"
            >
              <motion.span variants={fadeInUp}>
                We bring your special moments
              </motion.span>
              <motion.span variants={fadeInUp}>
                to life exactly how you
              </motion.span>
              <motion.span variants={fadeInUp}>imagined them.</motion.span>
            </motion.span>
            <div className="absolute inset-0 w-full h-full slider-overlay-grad z-[1] opacity-[0.5]"></div>
            <motion.div
              initial="initial"
              whileInView="inView"
              viewport={{ root: mainRef }}
              variants={fadeInRenders}
              className="relative h-full w-full overflow-hidden"
            >
              <div className="relative overflow-hidden min-h-full w-auto aspect-[1920/1080] max-h-none min-w-full h-auto">
                <Image
                  priority={true}
                  className="overflow-hidden"
                  src="/static/images/Render1.png"
                  layout="fill"
                />
              </div>
            </motion.div>
          </div>
          <div className="hero-slide overflow-hidden slide-2 hidden h-full w-full">
            <motion.span
              initial="initial"
              whileInView="inView"
              viewport={{ root: mainRef }}
              variants={stagger}
              className="font-DMSans text-white absolute left-16 bottom-16 xl:left-24 xl:bottom-24 z-[2] text-xl xl:text-7xl tracking-normal flex flex-col items-start"
            >
              <motion.span variants={fadeInUp}>
                We bring your special moments
              </motion.span>
              <motion.span variants={fadeInUp}>
                to life exactly how you
              </motion.span>
              <motion.span variants={fadeInUp}>imagined them.</motion.span>
            </motion.span>
            <div className="absolute inset-0 w-full h-full slider-overlay-grad z-[1] opacity-[0.5]"></div>
            <motion.div
              initial="initial"
              whileInView="inView"
              viewport={{ root: mainRef }}
              variants={fadeInRenders}
              className="relative h-full w-full overflow-hidden"
            >
              <div className="relative overflow-hidden min-h-full w-auto aspect-[1920/1080] max-h-none min-w-full h-auto">
                <Image
                  priority={true}
                  className="overflow-hidden"
                  src="/static/images/Render2.png"
                  layout="fill"
                />
              </div>
            </motion.div>
          </div>
          <div className="hero-slide overflow-hidden slide-3 hidden h-full w-full">
            <motion.span
              initial="initial"
              whileInView="inView"
              viewport={{ root: mainRef }}
              variants={stagger}
              className="font-DMSans text-white absolute left-16 bottom-16 xl:left-24 xl:bottom-24 z-[2] text-xl xl:text-7xl tracking-normal flex flex-col items-start"
            >
              <motion.span variants={fadeInUp}>
                We bring your special moments
              </motion.span>
              <motion.span variants={fadeInUp}>
                to life exactly how you
              </motion.span>
              <motion.span variants={fadeInUp}>imagined them.</motion.span>
            </motion.span>
            <div className="absolute inset-0 w-full h-full slider-overlay-grad z-[1] opacity-[0.5]"></div>
            <motion.div
              initial="initial"
              whileInView="inView"
              viewport={{ root: mainRef }}
              variants={fadeInRenders}
              className="relative h-full w-full overflow-hidden"
            >
              <div className="relative overflow-hidden min-h-full w-auto aspect-[1920/1080] max-h-none min-w-full h-auto">
                <Image
                  priority={true}
                  className="overflow-hidden"
                  src="/static/images/Render3.png"
                  layout="fill"
                />
              </div>
            </motion.div>
          </div>
          <div className="hero-slide overflow-hidden slide-4 hidden h-full w-full">
            <motion.span
              initial="initial"
              whileInView="inView"
              viewport={{ root: mainRef }}
              variants={stagger}
              className="font-DMSans text-white absolute left-16 bottom-16 xl:left-24 xl:bottom-24 z-[2] text-xl xl:text-7xl tracking-normal flex flex-col items-start"
            >
              <motion.span variants={fadeInUp}>
                We bring your special moments
              </motion.span>
              <motion.span variants={fadeInUp}>
                to life exactly how you
              </motion.span>
              <motion.span variants={fadeInUp}>imagined them.</motion.span>
            </motion.span>
            <div className="absolute inset-0 w-full h-full slider-overlay-grad z-[1] opacity-[0.5]"></div>
            <motion.div
              initial="initial"
              whileInView="inView"
              viewport={{ root: mainRef }}
              variants={fadeInRenders}
              className="relative h-full w-full overflow-hidden"
            >
              <div className="relative overflow-hidden min-h-full w-auto aspect-[1920/1080] max-h-none min-w-full h-auto">
                <Image
                  priority={true}
                  className="overflow-hidden"
                  src="/static/images/Render4.png"
                  layout="fill"
                />
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <div className="custom-cursor hidden lg:block">
        <div className="relative w-full h-full cursor-svg">
          <Image src="/static/images/logomark.svg" layout="fill" />
        </div>
        <div className="cursor-play opacity-0 text-black flex flex-row items-center justify-center h-full w-full">
          <CursorChanger option={heroOption} />
        </div>
      </div>
    </div>
  );
}
