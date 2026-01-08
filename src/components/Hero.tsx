import React from "react";

interface HeroProps {
  guestName?: string;
  onOpenInvitation: () => void;
}

const Hero: React.FC<HeroProps> = ({
  guestName = "Guest Name",
  onOpenInvitation,
}) => {
  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-content">
          <div className="hero-initials">
            <center>
              R<br />R
            </center>
          </div>
          <h1 className="hero-title">The Wedding Of</h1>
          <div className="hero-couple-name">Raisa & Rafi</div>
          <div className="hero-divider"></div>
          <div className="hero-greeting">Dear,</div>
          <div className="hero-guest-name">{guestName}</div>
           <button
             className="hero-open-btn"
             onClick={onOpenInvitation}
           >
            Open Invitation
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
