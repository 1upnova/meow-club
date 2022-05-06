import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import VideoPlayer from "./videoPlayer";

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

export default function HeroVidChanger(props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 768) setIsMobile(true);
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 768) setIsMobile(true);
    });
  }, []);

  switch (props.option) {
    case "preview":
      return (
        <div className="w-full h-full z-[2]">
          <span className="font-DMSans text-8xl text-center xl:text-[12rem] mix-blend-difference absolute text-white top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] pointer-events-none">
            Play trailer
          </span>
          <video
            src="/static/videos/preview.mp4"
            className="h-full max-w-none preview-vid"
            muted
            playsInline
            autoPlay
            loop
          ></video>
        </div>
      );
    case "trailer":
      if (isMobile) {
        return (
          <motion.div
            initial="hidden"
            whileInView="inView"
            variants={fadeIn}
            className="w-full h-full"
          >
            <video
              autoPlay
              disablePictureInPicture
              controlsList="nodownload noremoteplayback noplaybackrate"
              playsInline
              controls
              className="h-full max-w-none"
              src="/static/videos/trailer.mp4"
            ></video>
          </motion.div>
        );
      } else {
        return (
          <motion.div
            initial="hidden"
            whileInView="inView"
            variants={fadeIn}
            className="w-full h-full trailer-vid"
          >
            <VideoPlayer
              autoplay={true}
              classes="trailer-vid"
              src="/static/videos/trailer.mp4"
            />
          </motion.div>
        );
      }

    case "blank":
      return;
  }
}
