import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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

export default function SliderSection() {
  const [isMobile, setIsMobile] = useState(false);
  const mainRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth <= 1023) setIsMobile(true);
    if (window.innerWidth > 1023) setIsMobile(false);
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 1023) setIsMobile(true);
      if (window.innerWidth > 1023) setIsMobile(false);
    });

    var cursor = document.querySelector(".custom-cursor");
    var cursorSVG = document.querySelector(".cursor-svg");
    var cursorArrow = document.querySelector(".cursor-arrow");
    var sliderLeft = document.querySelector(".slider-left-side");
    var sliderRight = document.querySelector(".slider-right-side");
    var sliderSection = document.querySelector(".slider-section");

    let currentSlide = 0;
    const numOfSlides = 4;
    let sliders = document.querySelectorAll(".hero-slide");
    let currslider;
    sliderLeft.addEventListener("click", function () {
      if (currentSlide == 0) currentSlide = 3;
      else currentSlide = (currentSlide - 1) % numOfSlides;
      currslider = document.querySelector(`.slide-${currentSlide}`);
      sliders.forEach((slider) => {
        slider.classList.remove("active");
      });
      currslider.classList.add("active");
    });
    sliderRight.addEventListener("click", function () {
      currentSlide = (currentSlide + 1) % numOfSlides;
      currslider = document.querySelector(`.slide-${currentSlide}`);
      sliders.forEach((slider) => {
        slider.classList.remove("active");
      });
      currslider.classList.add("active");
    });

    sliderLeft.addEventListener("mouseenter", function () {
      cursorArrow.classList.remove("hidden");
      cursorArrow.classList.remove("cursor-arrow-right");
      cursorArrow.classList.add("cursor-arrow-left");
      cursor.classList.add("custom-cursor--slider");
      cursorSVG.classList.add("hidden");
      cursorArrow.classList.remove("opacity-0");
    });
    sliderRight.addEventListener("mouseenter", function () {
      cursorArrow.classList.remove("hidden");
      cursorArrow.classList.remove("cursor-arrow-left");
      cursorArrow.classList.add("cursor-arrow-right");
      cursor.classList.add("custom-cursor--slider");
      cursorSVG.classList.add("hidden");
      cursorArrow.classList.remove("opacity-0");
    });
    sliderSection.addEventListener("mouseleave", function () {
      cursorArrow.classList.remove("cursor-arrow-left");
      cursorArrow.classList.remove("cursor-arrow-right");
      cursor.classList.remove("custom-cursor--slider");
      cursorSVG.classList.remove("hidden");
      cursorArrow.classList.add("opacity-0");
      cursorArrow.classList.add("hidden");
    });
  }, []);

  function expandCard(slideNumber) {
    let cardExpandable = document.getElementById(`slide${slideNumber}`);
    cardExpandable.classList.toggle("expanded");
  }

  if (isMobile)
    return (
      <div className="w-screen h-fit relative overflow-hidden">
        <div
          id="slide0"
          className="w-full h-fit relative flex flex-row items-end slide-0"
        >
          <div className="w-full h-fit relative flex flex-col border-t-[1px] border-t-black/30 dark:border-t-white/30 bg-white dark:bg-[#0c0c0c] transition-colors duration-[450ms] items-top justify-between px-4 ">
            <a
              onClick={() => expandCard(0)}
              className="w-full flex flex-row items-center justify-between h-[15vh]"
            >
              <div className="flex flex-row items-start justify-between w-[85%]">
                <span className="font-DMSans text-2xl text-black dark:text-white font-semibold">
                  01
                </span>
                <h2 className="ml-12 font-DMSans text-2xl text-black dark:text-white font-semibold w-2/3">
                  Air Side
                </h2>
              </div>
              <svg
                className="card-arrow-svg dark:invert w-[24px] rotate-[90deg]"
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
            </a>
            <div className="serv-card-collapseable flex flex-col items-start gap-2 overflow-hidden max-h-[0px]">
              <div className="relative w-full">
                <Image
                  priority={true}
                  className="overflow-hidden rounded-2xl"
                  src="/static/images/Render1.png"
                  width={1920 * 1.35}
                  height={1080 * 1.35}
                />
              </div>
              <div className="flex flex-col gap-16 pb-12">
                <p className="font-DMSans text-xl text-black dark:text-white">
                  The wind blows slow and smooth until it doesn&apos;t.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          id="slide1"
          className="w-full h-fit relative flex flex-row items-end slide-1"
        >
          <div className="w-full h-fit relative flex flex-col border-t-[1px] border-t-black/30 dark:border-t-white/30 bg-white dark:bg-[#0c0c0c] transition-colors duration-[450ms] items-top justify-between px-4 ">
            <a
              onClick={() => expandCard(1)}
              className="w-full flex flex-row items-center justify-between h-[15vh]"
            >
              <div className="flex flex-row items-start justify-between w-[85%]">
                <span className="font-DMSans text-2xl text-black dark:text-white font-semibold">
                  02
                </span>
                <h2 className="ml-12 font-DMSans text-2xl text-black dark:text-white font-semibold w-2/3">
                  Water Side
                </h2>
              </div>
              <svg
                className="card-arrow-svg dark:invert w-[24px] rotate-[90deg]"
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
            </a>
            <div className="serv-card-collapseable flex flex-col items-start gap-2 overflow-hidden max-h-[0px]">
              <div className="relative w-full">
                <Image
                  priority={true}
                  className="overflow-hidden rounded-2xl"
                  src="/static/images/Render2.png"
                  width={1920 * 1.35}
                  height={1080 * 1.35}
                />
              </div>
              <div className="flex flex-col gap-16 pb-12">
                <p className="font-DMSans text-xl text-black dark:text-white">
                  Water becomes whatever the mind wills it.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          id="slide2"
          className="w-full h-fit relative flex flex-row items-end slide-2"
        >
          <div className="w-full h-fit relative flex flex-col border-t-[1px] border-t-black/30 dark:border-t-white/30 bg-white dark:bg-[#0c0c0c] transition-colors duration-[450ms] items-top justify-between px-4 ">
            <a
              onClick={() => expandCard(2)}
              className="w-full flex flex-row items-center justify-between h-[15vh]"
            >
              <div className="flex flex-row items-start justify-between w-[85%]">
                <span className="font-DMSans text-2xl text-black dark:text-white font-semibold">
                  03
                </span>
                <h2 className="ml-12 font-DMSans text-2xl text-black dark:text-white font-semibold w-2/3">
                  Earth Side
                </h2>
              </div>
              <svg
                className="card-arrow-svg dark:invert w-[24px] rotate-[90deg]"
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
            </a>
            <div className="serv-card-collapseable flex flex-col items-start gap-2 overflow-hidden max-h-[0px]">
              <div className="relative w-full">
                <Image
                  priority={true}
                  className="overflow-hidden rounded-2xl"
                  src="/static/images/Render3.png"
                  width={1920 * 1.35}
                  height={1080 * 1.35}
                />
              </div>
              <div className="flex flex-col gap-16 pb-12">
                <p className="font-DMSans text-xl text-black dark:text-white">
                  Solid earth provides the materials for conquest.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          id="slide3"
          className="w-full h-fit relative flex flex-row items-end slide-3"
        >
          <div className="w-full h-fit relative flex flex-col border-t-[1px] border-t-black/30 dark:border-t-white/30 bg-white dark:bg-[#0c0c0c] transition-colors duration-[450ms] items-top justify-between px-4 ">
            <a
              onClick={() => expandCard(3)}
              className="w-full flex flex-row items-center justify-between h-[15vh]"
            >
              <div className="flex flex-row items-start justify-between w-[85%]">
                <span className="font-DMSans text-2xl text-black dark:text-white font-semibold">
                  04
                </span>
                <h2 className="ml-12 font-DMSans text-2xl text-black dark:text-white font-semibold w-2/3">
                  Fire Side
                </h2>
              </div>
              <svg
                className="card-arrow-svg dark:invert w-[24px] rotate-[90deg]"
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
            </a>
            <div className="serv-card-collapseable flex flex-col items-start gap-2 overflow-hidden max-h-[0px]">
              <div className="relative w-full">
                <Image
                  priority={true}
                  className="overflow-hidden rounded-2xl"
                  src="/static/images/Render4.png"
                  width={1920 * 1.35}
                  height={1080 * 1.35}
                />
              </div>
              <div className="flex flex-col gap-16 pb-12">
                <p className="font-DMSans text-xl text-black dark:text-white">
                  The unrelenting nature of fire can never be vanquished.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  else
    return (
      <section
        ref={mainRef}
        className="w-screen h-fit overflow-hidden flex flex-col items-center relative slider-section"
      >
        <div className="absolute left-0 h-full w-1/2  z-50 slider-left-side"></div>
        <div className="absolute right-0 h-full w-1/2 z-50 slider-right-side"></div>
        <div className="hero-slide overflow-hidden slide-0 hidden active h-full w-full">
          <motion.span
            initial="initial"
            whileInView="inView"
            viewport={{ root: mainRef }}
            variants={stagger}
            className="font-DMSans text-white absolute left-16 bottom-16 xl:left-24 xl:bottom-24 z-[2] text-xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl tracking-normal flex flex-col items-start"
          >
            <motion.span variants={fadeInUp}>
              The wind blows slow and
            </motion.span>
            <motion.span variants={fadeInUp}>
              smooth until it doesn&apos;t.
            </motion.span>
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
                width={1920 * 1.35}
                height={1080 * 1.35}
              />
            </div>
          </motion.div>
        </div>
        <div className="hero-slide overflow-hidden slide-1 hidden h-full w-full">
          <motion.span
            initial="initial"
            whileInView="inView"
            viewport={{ root: mainRef }}
            variants={stagger}
            className="font-DMSans text-white absolute left-16 bottom-16 xl:left-24 xl:bottom-24 z-[2] text-xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl tracking-normal flex flex-col items-start"
          >
            <motion.span variants={fadeInUp}>
              Water becomes whatever
            </motion.span>
            <motion.span variants={fadeInUp}>the mind wills it.</motion.span>
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
                width={1920 * 1.35}
                height={1080 * 1.35}
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
            className="font-DMSans text-white absolute left-16 bottom-16 xl:left-24 xl:bottom-24 z-[2] text-xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl tracking-normal flex flex-col items-start"
          >
            <motion.span variants={fadeInUp}>
              Solid earth provides the
            </motion.span>
            <motion.span variants={fadeInUp}>
              materials for conquest.
            </motion.span>
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
                width={1920 * 1.35}
                height={1080 * 1.35}
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
            className="font-DMSans text-white absolute left-16 bottom-16 xl:left-24 xl:bottom-24 z-[2] text-xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl tracking-normal flex flex-col items-start"
          >
            <motion.span variants={fadeInUp}>
              The unrelenting nature of fire
            </motion.span>
            <motion.span variants={fadeInUp}>
              can never be vanquished.
            </motion.span>
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
                width={1920 * 1.35}
                height={1080 * 1.35}
              />
            </div>
          </motion.div>
        </div>
      </section>
    );
}
