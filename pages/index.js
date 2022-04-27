import Head from "next/head";
import Header from "../components/header";
import { Fragment, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    var locoScroll;
    import("locomotive-scroll").then((locomotiveModule) => {
      locoScroll = new locomotiveModule.default({
        el: document.querySelector("[data-scroll-container]"),
        smooth: true,
        smoothMobile: false,
        smartphone: {
          smooth: false,
        },
        touchMultiplier: 3,
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
        <section
          data-scroll
          data-scroll-speed="-8"
          className="w-screen h-screen bg-white overflow-hidden"
        >
          <span className="font-DMSans text-[12rem] mix-blend-difference absolute text-white top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
            Play reel
          </span>
          <video
            src="/static/videos/preview.mp4"
            className="min-w-full"
            muted
            playsInline
            autoPlay
            loop
          ></video>
        </section>
        <section
          data-scroll
          data-scroll-speed="0"
          className="w-screen h-screen bg-white overflow-hidden"
        ></section>
      </main>
      <div className="custom-cursor hidden lg:block">
        <div className="relative w-full h-full cursor-svg">
          <Image src="/static/images/logomark.svg" layout="fill" />
        </div>
        <div className="cursor-play opacity-0 text-black flex flex-row items-center justify-center h-full w-full">
          <svg
            width="12"
            height="13"
            viewBox="0 0 12 13"
            className="PauseIcon hidden"
          >
            <path d="M0.443359 12.6221V0.622311L4.29929 0.622311V12.6221H0.443359Z"></path>
            <path d="M7.64109 12.6218V0.62207L11.497 0.62207V12.6218H7.64109Z"></path>
          </svg>
          <svg viewBox="6 2 12 13.5" className="PlayIcon">
            <path d="M16.25 8.625L7.10317 2.52183V14.7282L16.25 8.625Z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
