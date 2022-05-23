import Head from "next/head";
import Header from "../components/header";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { motion } from "framer-motion";
import AnimatedText from "../components/AnimatedText";
import HeroVidChanger from "../components/heroVideoChanger";
import CursorChanger from "../components/CursorChanger";
import AnimatedWords from "../components/AnimatedWords";
import SliderSection from "../components/SliderSection";

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

const fadeInUpScrollBtn = {
  initial: {
    y: 20,
    x: "-50%",
    opacity: 0,
  },
  inView: {
    y: 0,
    x: "-50%",
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
    { type: "heading1", text: "A Metaverse World" },
    {
      type: "heading2",
      text: "by 1UP Nova",
    },
  ];

  const secondText = [
    {
      type: "heading2",
      text: "Ancient legend has foretold of the Meow Club, the premiere cats metaverse experience. Choose between water, fire, wind, and air to battle for prizes and glory. Do you have the mental and physical fortitude to succeed? Find out now!",
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
    var links = document.querySelectorAll("a, .clickable");
    var test = document.querySelectorAll(".preview-vid");
    var heroSection = document.querySelector(".meow-hero");
    var previewVid = document.querySelector(".preview-vid");
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

    // let currentSlide = 1;
    // let sliderInterval = setInterval(function () {
    //   if (currentSlide == 0) currentSlide = 1;
    //   // let btns = document.querySelectorAll(".circleBtn");
    //   // let currBtn = document.querySelector(`.circleBtn${currentSlide}`);
    //   let sliders = document.querySelectorAll(".hero-slide");
    //   let currslider = document.querySelector(`.slide-${currentSlide}`);
    //   // if (!currBtn.classList.contains("active")) {
    //   // btns.forEach((btn) => {
    //   //   btn.classList.remove("active");
    //   // });
    //   // currBtn.classList.add("active");
    //   sliders.forEach((slider) => {
    //     slider.classList.remove("active");
    //   });
    //   currslider.classList.add("active");
    //   // }

    //   currentSlide = (currentSlide + 1) % 5;
    // }, 4000);

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
        <title>Meow Club · PvP in the Metaverse</title>
        <meta
          name="description"
          content="Choose between water, fire, wind, and air to battle for prizes and glory."
        />
        <link rel="icon" href="/favicon.png" />
        <meta property="og:title" content="Meow Club · PvP in the Metaverse" />
        <meta property="og:url" content="https://meowclub.net" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Choose between water, fire, wind, and air to battle for prizes and glory."
        />
        <meta
          property="og:image"
          content="https://meowclub.net/ShareThumb.png"
        />
        <meta property="og:image:width" content="1600" />
        <meta property="og:image:height" content="900" />
        <meta property="og:image:alt" content="meow club" />
        <meta property="og:image:type" content="image/png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="theme-color" content="#91d0f3" />
        <meta name="robots" content="index" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
        <SliderSection />
        <section className="w-screen h-fit py-32 xl:py-0 xl:h-screen hero-section flex flex-row items-center justify-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={container}
            className="font-DMSans text-xl lg:text-3xl xl:text-6xl flex flex-col items-center justify-center px-6 lg:w-2/3"
          >
            {secondText.map((item, index) => {
              return (
                <AnimatedWords
                  hClasses="lg:h-[2.2rem] xl:h-[4.1rem]"
                  {...item}
                  key={index}
                />
              );
            })}
          </motion.div>
        </section>
        <section className="w-screen h-auto aspect-[1920/1080] relative">
          <motion.span
            initial="initial"
            whileInView="inView"
            variants={fadeInUpScrollBtn}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="aspect-[1/1] w-[80px] hidden lg:block clickable h-auto absolute bottom-16 left-[50%] z-50 border-[2px] border-white rounded-full p-6"
          >
            <svg
              className="rotate-[-90deg] invert"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 12 12"
            >
              <path
                d="M11.232 5.232L5.476 10.99l.767.768L12 6l-.768-.768z"
                fill="#000"
              />
              <path
                d="M6.242.243l-.767.768 5.758 5.758L12 6 6.242.243z"
                fill="#000"
              />
              <path d="M.543 5.458v1.086H11.4V5.458H.543z" fill="#000" />
            </svg>
          </motion.span>
          <div className="relative max-w-none h-full overflow-hidden">
            <Image
              priority={true}
              src="/static/images/Render5.png"
              layout="fill"
            />
          </div>
        </section>
      </main>
      <div className="custom-cursor hidden lg:block">
        <div className="cursor-arrow hidden opacity-0 p-[1.2rem]">
          <svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 12"
          >
            <path
              d="M11.232 5.232L5.476 10.99l.767.768L12 6l-.768-.768z"
              fill="#000"
            />
            <path
              d="M6.242.243l-.767.768 5.758 5.758L12 6 6.242.243z"
              fill="#000"
            />
            <path d="M.543 5.458v1.086H11.4V5.458H.543z" fill="#000" />
          </svg>
        </div>
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
