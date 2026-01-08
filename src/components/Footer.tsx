import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface AudioPlayerProps {
  audioSrc: string;
  shouldPlay: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc, shouldPlay }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string): string | null => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length == 11 ? match[2] : null;
  };

  const videoId = getYouTubeVideoId(audioSrc);

  useEffect(() => {
    if (shouldPlay && !isPlaying) {
      if (videoId) {
        // For YouTube, attempt to play
        if (iframeRef.current && iframeRef.current.contentWindow) {
          iframeRef.current.contentWindow.postMessage(
            JSON.stringify({
              event: "command",
              func: "playVideo",
              args: [],
            }),
            "*"
          );
          // Unmute immediately for iOS compatibility
          iframeRef.current.contentWindow.postMessage(
            JSON.stringify({
              event: "command",
              func: "unMute",
              args: [],
            }),
            "*"
          );
          setIsPlaying(true);
        }
      } else {
        // For local audio
        if (audioRef.current) {
          audioRef.current
            .play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.log(
                "Autoplay blocked, user interaction required:",
                error
              );
              // Keep isPlaying false, show play button
            });
        }
      }
    }
  }, [shouldPlay, videoId]);

  const togglePlay = () => {
    if (videoId && iframeRef.current && iframeRef.current.contentWindow) {
      const command = isPlaying ? "pauseVideo" : "playVideo";
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({
          event: "command",
          func: command,
          args: [],
        }),
        "*"
      );
      setIsPlaying(!isPlaying);
    } else if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.log("Playback failed:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (!videoId) {
    // Fallback to regular audio if not YouTube URL
    return (
      <div className="audio-player">
        <audio ref={audioRef} loop preload="metadata">
          <source src={audioSrc} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
         <button className="audio-control" onClick={togglePlay}>
        <i className={`fas ${isPlaying ? "fa-pause" : "fa-play"}`}></i>
      </button>
      </div>
    );
  }

  return (
    <div className="audio-player">
      <iframe
        ref={iframeRef}
        width="0"
        height="0"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&loop=1&playlist=${videoId}&controls=0&showinfo=0&modestbranding=1&rel=0&enablejsapi=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          opacity: 0,
          pointerEvents: "none",
        }}
        title="Background Music"
      ></iframe>
      <button className="audio-control" onClick={togglePlay}>
        <i className={`fas ${isPlaying ? "fa-pause" : "fa-play"}`}></i>
      </button>
    </div>
  );
};

interface FooterProps {
  audioSrc?: string;
  shouldPlay?: boolean;
}

const Footer: React.FC<FooterProps> = ({ audioSrc, shouldPlay }) => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {audioSrc && (
          <AudioPlayer audioSrc={audioSrc} shouldPlay={shouldPlay || false} />
        )}

        <motion.div
          className="footer-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p>Coded By Jafar & MJ</p>
          <div className="social-links">
            {/* <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fas fa-globe"></i>
            </a>
            <a href="h#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i>
            </a> */}
          </div>
          <p>
            © {new Date().getFullYear()} Wedding Invitation. All rights
            reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
