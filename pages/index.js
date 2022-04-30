import Head from "next/head";
import Header from "../components/header";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { motion } from "framer-motion";
import AnimatedText from "../components/AnimatedText";
gsap.registerPlugin(ScrollTrigger);

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

  const HeroSectionVideoChanger = () => {
    switch (heroOption) {
      case "preview":
        return (
          <div className="w-full h-full z-[2]">
            <span className="font-DMSans text-8xl text-center xl:text-[12rem] mix-blend-difference absolute text-white top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] pointer-events-none">
              Play trailer
            </span>
            <video
              src="/static/videos/preview.mp4"
              className="w-full preview-vid"
              muted
              playsInline
              autoPlay
              loop
            ></video>
          </div>
        );
      case "trailer":
        return (
          <div className="w-full h-full">
            <motion.video
              initial="initial"
              whileInView="inView"
              variants={fadeIn}
              src="/static/videos/TrailerSourceFixed.mp4"
              className=" z-[2] trailer-vid"
              autoPlay
              controls
            ></motion.video>
          </div>
        );
      case "blank":
        return;
    }
  };

  const CursorVideoChanger = () => {
    switch (heroOption) {
      case "preview":
        return (
          <svg viewBox="6 2 12 13.5" className="PlayIcon ml-[1px]">
            <path d="M16.25 8.625L7.10317 2.52183V14.7282L16.25 8.625Z"></path>
          </svg>
        );
      case "trailer":
        return (
          <svg
            className="XIcon"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
          >
            <path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" />
          </svg>
        );
      case "blank":
        return (
          <span className="text-white font-DMSans text-[25%]">Loading</span>
        );
    }
  };

  useEffect(() => {
    var locoScroll;
    import("locomotive-scroll").then((locomotiveModule) => {
      locoScroll = new locomotiveModule.default({
        el: document.querySelector("[data-scroll-container]"),
        smooth: true,
        smoothMobile: true,
        smartphone: {
          smooth: true,
        },
        reloadOnContextChange: true,
        direction: "vertical",
        speed: "1",
        getDirection: true,
      });
      locoScroll.on("scroll", ScrollTrigger.update);

      ScrollTrigger.scrollerProxy("[data-scroll-container]", {
        scrollTop(value) {
          return arguments.length
            ? locoScroll.scrollTo(value, 0, 0)
            : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("[data-scroll-container]").style
          .transform
          ? "transform"
          : "fixed",
      });
    }); //End of Loco

    var cursor = document.querySelector(".custom-cursor");
    var cursorSVG = document.querySelector(".cursor-svg");
    var cursorPlay = document.querySelector(".cursor-play");
    var links = document.querySelectorAll("a");
    var test = document.querySelectorAll("video");
    var heroSection = document.querySelector(".meow-hero");
    var trailerVid = document.querySelector(".trailer-vid");
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
      if (trailerVid !== null) {
        trailerVid.addEventListener("click", function () {
          SetHeroOption("preview");
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
        <section className="aspect-[1920/800] w-screen h-auto bg-black overflow-hidden relative flex flex-row items-center justify-center meow-hero">
          <HeroSectionVideoChanger />
          {/* <div className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] z-[1]">
            <div className="relative w-[100px] h-[100px]">
              <Image src="/static/images/buffer.gif" layout="fill" />
            </div>
          </div> */}
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
          <CursorVideoChanger />
        </div>
      </div>
    </div>
  );
}
