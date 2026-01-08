import React from "react";
import { motion } from "framer-motion";
import type { CoupleData } from "../types";

interface CoupleSectionProps {
  groom: CoupleData;
  bride: CoupleData;
}

const CoupleSection: React.FC<CoupleSectionProps> = ({ groom, bride }) => {
  return (
    <section className="couple-section">
      <div className="couple-background">
        <div className="couple-content">
          <motion.div
            className="couple-card groom-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>THE BRIDE</h2>
            <img src={groom.photo} alt={groom.name} className="couple-photo" />
            <h3 className="couple-name">{groom.name}</h3>
            <p className="couple-full-name">{groom.fullName}</p>
            <p
              className="couple-parents"
              dangerouslySetInnerHTML={{ __html: groom.parents }}
            ></p>
            {groom.social?.instagram && (
              <a
                href={groom.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <i className="fab fa-instagram"></i>
              </a>
            )}
          </motion.div>

          <motion.div
            className="couple-divider"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            &
          </motion.div>

          <motion.div
            className="couple-card bride-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">THE GROOM</h2>
            <img src={bride.photo} alt={bride.name} className="couple-photo" />
            <h3 className="couple-name">{bride.name}</h3>
            <p className="couple-full-name">{bride.fullName}</p>
            <p
              className="couple-parents"
              dangerouslySetInnerHTML={{ __html: bride.parents }}
            ></p>
            {bride.social?.instagram && (
              <a
                href={bride.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <i className="fab fa-instagram"></i>
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CoupleSection;
