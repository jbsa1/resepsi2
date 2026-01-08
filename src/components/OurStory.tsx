import React from "react";
import { motion } from "framer-motion";

const OurStory: React.FC = () => {
  return (
    <section className="our-story-section">
      <div className="our-story-content">
        <motion.h2
          className="our-story-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Our Story
        </motion.h2>

        <motion.div
          className="story-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="story-image-container">
            <img src="/ourstory.jpeg" alt="Our Story" className="story-image" />
          </div>
          <div className="story-content-wrapper">
            <div className="story-section">
              <h3 className="story-title">How We Met</h3>
              <p className="story-text">
                It was in 2024, at the most unexpected moment, when our best
                friend introduced us. As we got to know each other better,
                everything just felt right, and we decided to commit to each
                other.
              </p>
            </div>

            <div className="story-section">
              <h3 className="story-title">Our Journey</h3>
              <p className="story-text">
                Ours began across the distance—a quiet space of 782 km between
                two hearts that somehow found their way to each other. From
                late-night calls to endless messages, from missing each other to
                counting down the days, wishing for the next meeting. We learned
                that love doesn't measure miles—only commitment, patience, and
                the warmth we carried despite the space.
              </p>
            </div>

            <div className="story-section">
              <h3 className="story-title">Our New Beginning</h3>
              <p className="story-text">
                And we got engaged in June 2025, surrounded by our family. Now,
                with grateful hearts, we are ready to begin the next chapter—no
                more distance, just one home, one journey, one love. We're very
                excited to count down our Big Day in March. It's getting real. A
                new milestone, towards our forever.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurStory;
