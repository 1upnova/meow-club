import { useEffect } from "react";
import { motion } from "framer-motion";

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

export default function HeroVidPlayer(props) {
  useEffect(() => {});

  switch (props.option) {
    case "preview":
      return (
        <div className="w-full h-full z-[2]">
          <span className="font-DMSans text-[12rem] mix-blend-difference absolute text-white top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] pointer-events-none">
            Play trailer
          </span>
          <video
            src="/static/videos/preview.mp4"
            className="min-h-full max-w-none preview-vid"
            muted
            playsInline
            autoPlay
            loop
          ></video>
        </div>
      );
    case "trailer":
      return (
        <motion.video
          initial="initial"
          whileInView="inView"
          variants={fadeIn}
          src="/static/videos/TrailerSourceFixed.mp4"
          className="min-h-full max-w-none z-[2] trailer-vid"
          autoPlay
        ></motion.video>
      );
  }
}
