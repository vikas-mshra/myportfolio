import React, { useCallback, useEffect, useRef, useState } from "react";
import { SITE } from "../../data/site";
import "./IntroVideo.scss";

/**
 * Purpose: Accessible personal intro video with manual play/pause only.
 * Special Conditions:
 *   - Never autoplays or restarts when returning to view.
 *   - Pauses when off-screen or when the tab is hidden.
 *   - Cleans up IntersectionObserver and event listeners on unmount.
 * Context: Used in the Hero section. Paths come from SITE.media.
 */
const IntroVideo = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const pauseVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    setIsPlaying(false);
  }, []);

  const togglePlayback = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    pauseVideo();
  }, [pauseVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnded);

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof IntersectionObserver === "undefined") {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !video.paused) {
          pauseVideo();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [pauseVideo]);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) {
        pauseVideo();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [pauseVideo]);

  const onKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      togglePlayback();
    }
  };

  return (
    <div className="intro-video">
      <div
        className="intro-video__frame"
        role="button"
        tabIndex={0}
        aria-label={isPlaying ? "Pause introduction video" : "Play introduction video"}
        onClick={togglePlayback}
        onKeyDown={onKeyDown}
      >
        <video
          ref={videoRef}
          className="intro-video__media"
          poster={SITE.media.posterSrc}
          preload="metadata"
          playsInline
          controls={false}
          width={620}
          height={827}
          aria-label={SITE.media.videoLabel}
        >
          <source src={SITE.media.videoSrc} type="video/mp4" />
          Your browser does not support embedded video. You can
          {" "}
          <a href={SITE.media.videoSrc}>download the introduction video</a>
          .
        </video>

        <div
          className={`intro-video__overlay ${isPlaying ? "intro-video__overlay--playing" : ""}`}
          aria-hidden="true"
        >
          <span className="intro-video__control">{isPlaying ? "Pause" : "Play"}</span>
        </div>
      </div>
      <p className="intro-video__caption">
        {SITE.media.videoLabel}. Tap or press Enter to play or pause.
      </p>
    </div>
  );
};

export default IntroVideo;
