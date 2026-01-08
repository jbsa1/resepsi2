import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../assets/css/BestWishes.css';

interface BestWishesProps {}

interface Wish {
  id?: string;
  name: string;
  wish: string;
  createdAt?: string;
}

const BestWishes: React.FC<BestWishesProps> = () => {
  const [formData, setFormData] = useState<Wish>({
    name: '',
    wish: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const wishesRef = useRef<HTMLDivElement>(null);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < wishes.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setTouchEnd(0);
    setTouchStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setTouchEnd(e.clientX);
  };

  const handleMouseUp = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < wishes.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    setCurrentIndex(0);
  }, [wishes]);

  useEffect(() => {
    fetchWishes(1);
  }, []);

  const fetchWishes = async (page: number = 1, append: boolean = false) => {
    if (isLoading || (!hasMore && page > 1)) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/wish?page=${page}&limit=10`);
      if (response.ok) {
        const data = await response.json();
        const newWishes = data.data || data; // Handle different response formats
        
        if (append) {
          setWishes(prev => [...prev, ...newWishes]);
        } else {
          setWishes(newWishes);
        }
        
        setCurrentPage(page);
        setHasMore(newWishes.length === 10); // If less than 10, no more pages
      }
    } catch (error) {
      console.error('Error fetching wishes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreWishes = () => {
    if (hasMore && !isLoading) {
      fetchWishes(currentPage + 1, true);
    }
  };

  useEffect(() => {
    // Auto-load more wishes when user reaches near the end
    if (wishes.length > 0 && currentIndex >= wishes.length - 3 && hasMore && !isLoading) {
      loadMoreWishes();
    }
  }, [currentIndex, wishes.length, hasMore, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.wish.trim()) {
      setSubmitMessage('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/wish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage('Thank you for your warm wishes!');
        setFormData({ name: '', wish: '' });
        // Add the new wish to the local list
        const newWish = {
          ...formData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString()
        };
        setWishes(prev => [newWish, ...prev]);
        // Refresh first page to get updated order
        fetchWishes(1, false);
      } else {
        setSubmitMessage('Failed to submit wish. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting wish:', error);
      setSubmitMessage('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="best-wishes-section">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="wishes-container"
      >
        <h2 className="wishes-title">Best Wishes</h2>
        <p className="wishes-subtitle">
          Share your heartfelt wishes for our journey ahead
        </p>

        <div className="wishes-content">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="wishes-form"
          >
            <form onSubmit={handleSubmit} className="wish-form">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="wish">Your Wish</label>
                <textarea
                  id="wish"
                  name="wish"
                  value={formData.wish}
                  onChange={handleInputChange}
                  placeholder="Write your heartfelt wishes here..."
                  rows={4}
                  required
                />
              </div>

              <button
                type="submit"
                className="submit-wish-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Wish'}
              </button>

              {submitMessage && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`submit-message ${submitMessage.includes('Thank you') ? 'success' : 'error'}`}
                >
                  {submitMessage}
                </motion.p>
              )}
            </form>
          </motion.div>

          <h3 className="wishes-display-title">Recent Wishes</h3>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="wishes-list">
              {wishes.length === 0 && !isLoading ? (
                <div className="no-wishes">
                  <p>Be the first to share your wishes!</p>
                </div>
              ) : wishes.length === 0 && isLoading ? (
                <div className="loading-wishes">
                  <p>Loading wishes...</p>
                </div>
              ) : (
                <div 
                  className="wishes-slider-container"
                  ref={wishesRef}
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  style={{ cursor: wishes.length > 1 ? 'grab' : 'default' }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                      className="wish-card"
                      style={{ cursor: wishes.length > 1 ? 'grab' : 'default' }}
                    >
                      <div className="wish-header">
                        <h4 className="wish-author">{wishes[currentIndex].name}</h4>
                        {wishes[currentIndex].createdAt && (
                          <span className="wish-date">
                            {new Date(wishes[currentIndex].createdAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <p className="wish-text">{wishes[currentIndex].wish}</p>
                      {wishes.length > 1 && (
                        <div className="swipe-indicators">
                          <span className="swipe-hint">
                            {currentIndex + 1} / {wishes.length}
                            {isLoading && ` (Loading more...)`}
                          </span>
                          <div className="dots-container">
                            {wishes.slice(0, 10).map((_, index) => (
                              <span
                                key={index}
                                className={`dot ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => setCurrentIndex(index)}
                                style={{ cursor: 'pointer' }}
                              />
                            ))}
                            {wishes.length > 10 && (
                              <span className="more-dots">...</span>
                            )}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                  {wishes.length > 1 && (
                    <div className="swipe-navigation">
                      <button
                        className="nav-button prev"
                        onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                        disabled={currentIndex === 0}
                      >
                        ‹
                      </button>
                      <button
                        className="nav-button next"
                        onClick={() => setCurrentIndex(Math.min(wishes.length - 1, currentIndex + 1))}
                        disabled={currentIndex === wishes.length - 1}
                      >
                        ›
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default BestWishes;