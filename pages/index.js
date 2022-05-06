import Head from "next/head";
import Header from "../components/header";
import { useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { motion } from "framer-motion";
import AnimatedText from "../components/AnimatedText";
import HeroVidChanger from "../components/heroVideoChanger";
import CursorChanger from "../components/CursorChanger";

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

export default function Home() {
  const [heroOption, SetHeroOption] = useState("preview");

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
      <main data-scroll-container>
        <section className="w-screen h-screen bg-black overflow-hidden relative flex flex-row items-center justify-center meow-hero">
          <HeroVidChanger option={heroOption} />
        </section>
        <section className="w-screen h-screen hero-section flex flex-row items-center justify-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={container}
            className="font-DMSans text-9xl flex flex-col items-center justify-center"
          >
            {placeholderText.map((item, index) => {
              return <AnimatedText {...item} key={index} />;
            })}
          </motion.div>
        </section>
        <section className="w-screen h-fit overflow-hidden flex flex-col p-16 items-center">
          <div className="w-full h-[50vh] rounded-2xl overflow-hidden relative flex flex-row items-center justify-end ">
            <div className="w-[40%] z-[3] pr-32">
              <span className="font-DMSans font-bold text-white text-4xl">
                Nugget sucks on god.
              </span>
              <p className="font-DMSans font-normal text-white text-xl opacity-90">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                congue aliquam dignissim. Interdum et malesuada fames ac ante
                ipsum primis in faucibus. Nullam suscipit, mauris eget ornare
                bibendum, mi diam mattis ligula, nec eleifend nunc mauris at
                massa. Vestibulum vitae massa eget ex sollicitudin sollicitudin.
              </p>
            </div>
            <div className="absolute w-full h-full z-[2] bg-gradient-to-r from-transparent to-black"></div>
            <div className="absolute w-full h-full top-[50%] translate-y-[-50%] z-[1]">
              <div className="relative h-auto w-full aspect-[1447/691]">
                <Image
                  className="h-full min-w-full"
                  src="/static/images/nether.jpg"
                  layout="fill"
                />
              </div>
            </div>
          </div>
          <div className="w-full h-[50vh] m-16 rounded-2xl overflow-hidden relative flex flex-row items-center justify-start ">
            <div className="w-[40%] z-[3] pl-32">
              <span className="font-DMSans font-bold text-white text-4xl">
                Nugget sucks on god.
              </span>
              <p className="font-DMSans font-normal text-white text-xl opacity-90">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                congue aliquam dignissim. Interdum et malesuada fames ac ante
                ipsum primis in faucibus. Nullam suscipit, mauris eget ornare
                bibendum, mi diam mattis ligula, nec eleifend nunc mauris at
                massa. Vestibulum vitae massa eget ex sollicitudin sollicitudin.
              </p>
            </div>
            <div className="absolute w-full h-full z-[2] bg-gradient-to-l from-transparent to-black"></div>
            <div className="absolute w-full h-full top-[50%] translate-y-[-50%] z-[1]">
              <div className="relative h-auto w-full aspect-[1447/691]">
                <Image
                  className="h-full min-w-full"
                  src="/static/images/water.jpg"
                  layout="fill"
                />
              </div>
            </div>
          </div>
          <div className="w-full h-[50vh] rounded-2xl overflow-hidden relative flex flex-row items-center justify-end ">
            <div className="w-[40%] z-[3] pr-32">
              <span className="font-DMSans font-bold text-white text-4xl">
                Nugget sucks on god.
              </span>
              <p className="font-DMSans font-normal text-white text-xl opacity-90">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                congue aliquam dignissim. Interdum et malesuada fames ac ante
                ipsum primis in faucibus. Nullam suscipit, mauris eget ornare
                bibendum, mi diam mattis ligula, nec eleifend nunc mauris at
                massa. Vestibulum vitae massa eget ex sollicitudin sollicitudin.
              </p>
            </div>
            <div className="absolute w-full h-full z-[2] bg-gradient-to-r from-transparent to-black"></div>
            <div className="absolute w-full h-full top-[50%] translate-y-[-50%] z-[1]">
              <div className="relative h-auto w-full aspect-[1447/691]">
                <Image
                  className="h-full min-w-full"
                  src="/static/images/jungle.png"
                  layout="fill"
                />
              </div>
            </div>
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
