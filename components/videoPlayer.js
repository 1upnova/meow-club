import { useRef, useState, useEffect } from "react";
import Image from "next/image";

export default function VideoPlayer(props) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [videoTime, setVideoTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [soundPercent, setSoundPercent] = useState(100);

  const videoHandler = (control) => {
    if (control === "play") {
      videoRef.current.play();
      setPlaying(true);
      var vid = document.getElementById("videoPlayer");
      setVideoTime(vid.duration);
    } else if (control === "pause") {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  const fastForward = () => {
    videoRef.current.currentTime += 5;
  };

  const revert = () => {
    videoRef.current.currentTime -= 5;
  };

  const PlayBtn = () => {
    if (playing == true)
      return (
        <div
          onClick={() => videoHandler("pause")}
          className="controlsIcon--small text-white pointer-events-auto"
        >
          <svg
            width="12"
            height="13"
            viewBox="0 0 12 13"
            className="cursor-pointer PauseIconVideoPlayer"
          >
            <path d="M0.443359 12.6221V0.622311L4.29929 0.622311V12.6221H0.443359Z"></path>
            <path d="M7.64109 12.6218V0.62207L11.497 0.62207V12.6218H7.64109Z"></path>
          </svg>
        </div>
      );
    else
      return (
        <div
          onClick={() => videoHandler("play")}
          className="controlsIcon--small text-white pointer-events-auto"
        >
          <svg viewBox="6 2 12 13.5" className="PlayIconVideoPlayer ml-[1px]">
            <path d="M16.25 8.625L7.10317 2.52183V14.7282L16.25 8.625Z"></path>
          </svg>
        </div>
      );
  };

  const PlayBtnBottom = () => {
    if (playing == true)
      return (
        <div
          onClick={() => videoHandler("pause")}
          className="h-[15px] text-white pointer-events-auto cursor-pointer"
        >
          <svg
            width="12"
            height="13"
            viewBox="0 0 12 13"
            className="cursor-pointer PauseIconVideoPlayer"
          >
            <path d="M0.443359 12.6221V0.622311L4.29929 0.622311V12.6221H0.443359Z"></path>
            <path d="M7.64109 12.6218V0.62207L11.497 0.62207V12.6218H7.64109Z"></path>
          </svg>
        </div>
      );
    else
      return (
        <div
          onClick={() => videoHandler("play")}
          className="h-[15px] text-white pointer-events-auto cursor-pointer"
        >
          <svg viewBox="6 2 12 13.5" className="PlayIconVideoPlayer ml-[1px]">
            <path d="M16.25 8.625L7.10317 2.52183V14.7282L16.25 8.625Z"></path>
          </svg>
        </div>
      );
  };

  useEffect(() => {
    let videoPlayerDOM = document.querySelector("#videoPlayer");
    setVideoTime(videoPlayerDOM.duration);
    if (props.autoplay == true) {
      const timer = setTimeout(() => {
        videoHandler("play");
      }, 100);
    }
    videoPlayerDOM.addEventListener("timeupdate", (event) => {
      setCurrentTime(videoPlayerDOM.currentTime);
      setProgress((videoPlayerDOM.currentTime / videoTime) * 100);
    });

    let progressBar = document.querySelector(".time_progressbarContainer");
    let soundBar = document.getElementById("sound-bar");

    var isMouseDownSound = false;
    var isMouseDownProgress = false;

    soundBar.addEventListener("mousedown", (e) => {
      var rectSound = soundBar.getBoundingClientRect();
      var x = e.clientX - rectSound.left; //x position within the element.
      var percent = Math.ceil((x / soundBar.offsetWidth) * 100);
      videoPlayerDOM.volume = percent / 100;
      setSoundPercent(percent);
      isMouseDownSound = true;
    });
    progressBar.addEventListener("mousedown", (e) => {
      var rectSound = progressBar.getBoundingClientRect();
      var x = e.clientX - rectSound.left; //x position within the element.
      var percent = Math.ceil((x / progressBar.offsetWidth) * 100);
      videoPlayerDOM.currentTime = (videoPlayerDOM.duration * percent) / 100;
      setProgress(percent);
      isMouseDownProgress = true;
    });
    window.addEventListener("mouseup", (e) => {
      isMouseDownSound = false;
      isMouseDownProgress = false;
    });

    window.addEventListener("mousemove", (e) => {
      if (isMouseDownSound === true) {
        var rectSound = soundBar.getBoundingClientRect();
        var x = e.clientX - rectSound.left; //x position within the element.
        var percent = Math.ceil((x / soundBar.offsetWidth) * 100);
        videoPlayerDOM.volume = percent / 100;
        setSoundPercent(percent);
      }
      if (isMouseDownProgress === true) {
        var rectSound = progressBar.getBoundingClientRect();
        var x = e.clientX - rectSound.left; //x position within the element.
        var percent = Math.ceil((x / progressBar.offsetWidth) * 100);
        videoPlayerDOM.currentTime = (videoPlayerDOM.duration * percent) / 100;
        setProgress(percent);
      }
    });

    return;
  }, [props.autoplay, videoTime]);

  return (
    <div className="custom-video-player relative w-full h-full">
      <video
        id="videoPlayer"
        ref={videoRef}
        className={`video h-full max-w-none ${props.classes}`}
        src={props.src}
      ></video>
      <div className="controlsContainer pointer-events-auto left-[50%] translate-x-[-50%] bottom-0 pb-2 xl:pb-12">
        <div className="timecontrols">
          <PlayBtnBottom />
          <div className="time_progressbarContainer pointer-events-auto">
            <div
              style={{ width: `${progress}%` }}
              className="time_progressBar bg-white"
            ></div>
          </div>
          <div className="pointer-events-auto cursor-pointer h-[20px] relative ml-4">
            <Image
              className="invert"
              src="/static/images/audio.png"
              height={20}
              width={20}
            />
          </div>
          <div className="h-[5px] w-[100px] bg-[#161516] overflow-hidden pointer-events-auto relative">
            <div
              style={{ width: `${soundPercent}%` }}
              className="h-[5px] bg-white rounded-md z-[2] pointer-events-none absolute inset-0"
            ></div>
            <div
              id="sound-bar"
              className="h-[5px] w-full bg-white opacity-[0.15] rounded-md z-[1] cursor-pointer pointer-events-auto absolute inset-0"
            ></div>
          </div>
          {/* <p className="controlsTime font-DMSans text-sm">
            {Math.floor(currentTime / 60) +
              ":" +
              ("0" + Math.floor(currentTime % 60)).slice(-2)}{" "}
            /{" "}
            {Math.floor(videoTime / 60) +
              ":" +
              ("0" + Math.floor(videoTime % 60)).slice(-2)}
          </p> */}
        </div>
      </div>
    </div>
  );
}
