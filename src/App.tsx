import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "./components/Hero";
import CoupleSection from "./components/CoupleSection";
import Countdown from "./components/Countdown";
import EventSection from "./components/EventSection";
import InvitationSection from "./components/InvitationSection";
import YouTubeSection from "./components/YouTubeSection";
import Gallery from "./components/Gallery";
import OurStory from "./components/OurStory";
import LiveStreamingSection from "./components/LiveStreamingSection";
import WeddingGift from "./components/WeddingGift";
import RSVPForm from "./components/RSVPForm";
import BestWishes from "./components/BestWishes";
import Footer from "./components/Footer";
import { weddingData } from "./data/weddingData";
import "./App.css";
import "./fonts/custom.css";

const App: React.FC = () => {
  const [invitationOpened, setInvitationOpened] = useState(false);
  const [isHero, setHero] = useState(true);

  const getGuestName = (): string => {
    const params = new URLSearchParams(window.location.search);
    const queryName = params.get("name");

    if (queryName) {
      return decodeURIComponent(queryName.replace(/\+/g, " "));
    }

    const path = window.location.pathname.replace("/", "");

    if (path) {
      return decodeURIComponent(path.replace(/-/g, " "));
    }

    return "Guest";
  };

  const handleOpenInvitation = () => {
    setInvitationOpened(true);
    setHero(false);
  };

  return (
    <div className="app">
      <div className="main-layout">
        <div className="left"></div>
        <div className="right">
          {/* Hero Section - Always Visible */}
          {isHero && (
            <Hero
              guestName={getGuestName()}
              onOpenInvitation={handleOpenInvitation}
            />
          )}

          {/* Main Content - Visible After Opening Invitation */}
          <AnimatePresence>
            {invitationOpened && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="main-content"
              >
                {/* Introduction with Video */}
                <section className="intro-section">
                  <div className="intro-content">
                    <div className="video-background">
                      <video autoPlay muted playsInline>
                        <source
                          src="https://tibra-invitation.id/wp-content/uploads/2024/10/VIDEO-ASSET-WHITE-GOLD.mp4"
                          type="video/mp4"
                        />
                      </video>
                    </div>
                    <div className="intro-overlay">
                      <motion.h2
                        className="intro-title"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 12.5 }}
                      >
                        The Wedding Of
                      </motion.h2>
                      <motion.h1
                        className="intro-couple-name"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 12.8 }}
                      >
                        Raisa
                      </motion.h1>
                      <motion.h2
                        className="intro-and"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 13 }}
                      >
                        and
                      </motion.h2>
                      <motion.h1
                        className="intro-couple-name"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 13.2 }}
                      >
                        Rafi
                      </motion.h1>
                      <motion.p
                        className="intro-date"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 13.4 }}
                      >
                        28 . 03 . 26
                      </motion.p>
                    </div>
                  </div>
                </section>

                {/* Endless Love Section */}
                <section className="love-section">
                  <div className="love-content">
                    <img
                      src="/ASSET-FRAME-JK2.webp"
                      alt="Frame"
                      className="love-frame"
                    />
                    {/* <h2 className="manstein-font">Endless Love</h2> */}
                    <h3 className="manstein-font">بسم الله الرّحمن الرّحيم</h3>
                    {/* <h3 className="manstein-font">
                      ٱلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللَّٰهِ وَبَرَكَاتُهُ
                    </h3> */}
                    <blockquote>
                      “And among His signs is that He created for you spouses
                      from among yourselves so that you may find tranquility in
                      them; and He placed between you affection and mercy.
                      Indeed, in that are signs for a people who reflect.”
                      (Surah Ar-Rum 21)
                    </blockquote>
                  </div>
                </section>

                {/* Decorative Divider */}
                <section className="divider-section">
                  <img
                    src="https://tibra-invitation.id/wp-content/uploads/2024/10/ASSET-GOLD-WHITE-3-scaled.webp"
                    alt="Divider"
                    className="divider-image"
                  />
                </section>

                {/* Couple Section */}
                <CoupleSection
                  groom={weddingData.groom}
                  bride={weddingData.bride}
                />

                {/* More Decorative Elements */}
                <section className="divider-section">
                  <img
                    src="https://tibra-invitation.id/wp-content/uploads/2024/10/ASSET-GOLD-WHITE-4-scaled.webp"
                    alt="Divider"
                    className="divider-image"
                  />
                </section>

                {/* Event Details */}
                <EventSection
                  holyMatrimony={weddingData.holyMatrimony}
                  reception={weddingData.reception}
                />

                {/* Countdown */}
                <div className="countdown-decoration">
                  <section className="countdown-section">
                    <Countdown targetDate={weddingData.weddingDate} />
                  </section>
                </div>

                {/* YouTube Video Section */}
                <YouTubeSection />

                {/* Photo Gallery */}
                <Gallery photos={weddingData.photos} />

                {/* Invitation Section */}
                <InvitationSection />

                {/* Live Streaming Section */}
                <LiveStreamingSection />

                {/* Wedding Gift */}
                <WeddingGift gifts={weddingData.gifts} />

                {/* Our Story */}
                <OurStory />

                {/* Best Wishes */}
                <BestWishes />

                {/* RSVP Form */}
                <RSVPForm guest={getGuestName()} />

                {/* Footer */}
                 <Footer
                   audioSrc="/music/music.mp3"
                   shouldPlay={invitationOpened}
                 />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default App;
