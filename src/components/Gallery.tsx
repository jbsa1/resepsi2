import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryProps {
  photos: string[];
}

const Gallery: React.FC<GalleryProps> = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (photo: string, index: number) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const navigatePhoto = (direction: "prev" | "next") => {
    const newIndex =
      direction === "prev"
        ? (currentIndex - 1 + photos.length) % photos.length
        : (currentIndex + 1) % photos.length;
    setCurrentIndex(newIndex);
    setSelectedPhoto(photos[newIndex]);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;

      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        navigatePhoto("prev");
      } else if (e.key === "ArrowRight") {
        navigatePhoto("next");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [selectedPhoto, currentIndex, photos.length]);

  return (
    <section className="gallery-section">
      <div className="gallery-content">
        <motion.h2
          className="gallery-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Our Gallery
        </motion.h2>

        <div className="gallery-grid">
          {photos.map((photo, index) => (
            <motion.div
              key={photo}
              className="gallery-item"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              onClick={() => openLightbox(photo, index)}
            >
              <img src={photo} alt={`Gallery ${index + 1}`} loading="lazy" />
              <div className="gallery-overlay"></div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              className="lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              {/* Navigation buttons - desktop only */}
              <button
                className="lightbox-nav lightbox-prev"
                onClick={(e) => {
                  e.stopPropagation();
                  navigatePhoto("prev");
                }}
                aria-label="Previous photo"
              >
                <i className="fas fa-chevron-left"></i>
              </button>

              <motion.img
                src={selectedPhoto}
                alt="Selected photo"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              />

              <button
                className="lightbox-nav lightbox-next"
                onClick={(e) => {
                  e.stopPropagation();
                  navigatePhoto("next");
                }}
                aria-label="Next photo"
              >
                <i className="fas fa-chevron-right"></i>
              </button>

              {/* Close button */}
              <button
                className="lightbox-close"
                onClick={closeLightbox}
                aria-label="Close lightbox"
              >
                <i className="fas fa-times"></i>
              </button>

              {/* Photo counter */}
              <div className="lightbox-counter">
                {currentIndex + 1} / {photos.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;
