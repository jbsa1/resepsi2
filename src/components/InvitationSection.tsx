import React from "react";
import { motion } from "framer-motion";

const InvitationSection: React.FC = () => {
  return (
    <section className="invitation-section">
      <div className="invitation-content">
        <motion.h2
          className="invitation-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          The Happy Family
        </motion.h2>

        <motion.div
          className="invitation-details"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="family-section">
            <li>
            <p>Family of Mr. Abubakar (Arbin) bin Jafar Bin Syekh Abubakar</p>
            <p>Mrs. Dina Sukainah binti Muhammad Bin Syekh Abubakar</p>

            </li>
<li>

            <p>Family of Mr. drg. Tomi Abubakar Alwi bin Mohammad Bin Syekh Abubakar, MPH,.CGRCP.</p>
            <p>Mrs. Mylantha Kamarullah binti Syarief Muhammad Alhabsyi</p>
</li>
          </div>

          <h3 className="also-inviting">Inviting:</h3>
          <div className="also-inviting-list">
            <li>

            <p>The Extended Family of the Late Habib Jafar bin Husen bin Sheikh Abubakar</p>
            </li>
            <li>
            <p>The Extended Family of the Late Habib Muhammad bin Mohsin bin Sheikh Abubakar</p>

            </li>
            <li>

            <p>The Extended Family of the Late Habib J.E. Mohammad Alwi bin Abubakar bin Sheikh Abubakar</p>
            </li>
            <li>

            <p>The Extended Family of the Late Habib Ahmad Kamarullah bin Syarief Muhammad Alhabsyi</p>
            </li>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InvitationSection;