import React from "react";
import { motion } from "framer-motion";
import type { EventData } from "../types";

interface EventDetailsProps {
  event: EventData;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
  return (
    <motion.div
      className="event-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h3 className="event-title">{event.title}</h3>
      <p className="event-date">{event.date}</p>
      <p className="event-time">{event.time}</p>

      <div className="event-divider">
        <i className="fas fa-building"></i>
      </div>

      <div className="event-location">
        <strong>{event.location}</strong>
        <br />
        <span className="event-address">{event.address}</span>
      </div>

      <a
        href={event.mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className="maps-button"
      >
        <i className="fas fa-map-marker-alt"></i>
        Google Maps
      </a>
    </motion.div>
  );
};

interface EventSectionProps {
  holyMatrimony: EventData;
  reception: EventData;
}

const EventSection: React.FC<EventSectionProps> = ({
  // holyMatrimony,
  reception,
}) => {
  return (
    <section className="event-section">
      <div className="event-background">
        <div className="event-content">
          {/* <div className="event-header">
            <img 
              src="https://tibra-invitation.id/wp-content/uploads/2024/10/ASSET-GOLD-WHITE-10-1-1024x339.webp" 
              alt="Decoration" 
              className="event-header-decoration"
            />
          </div> */}

          <div className="events-grid">
            {/* <EventDetails event={holyMatrimony} /> */}
            <EventDetails event={reception} />
          </div>

          {/* <div className="event-footer">
            <img 
              src="https://tibra-invitation.id/wp-content/uploads/2024/10/ASSET-GOLD-WHITE-12-1-1024x328.webp" 
              alt="Decoration" 
              className="event-footer-decoration"
            />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default EventSection;
