import React, { useState } from "react";
import { motion } from "framer-motion";

interface RSVPFormData {
  name: string;
  address: string;
  attendance: "Yes" | "No" | "";
  guests: number;
}

interface RSVPProps {
  guest: string;
}

const RSVPForm: React.FC<RSVPProps> = ({ guest: _guest }) => {
  const [formData, setFormData] = useState<RSVPFormData>({
    name: "",
    address: "",
    attendance: "",
    guests: 1,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/rsvp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        console.error("Failed to submit RSVP");
        // You could add error handling here
      }
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      // You could add error handling here
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        className="rsvp-success"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <i className="fas fa-check-circle"></i>
        <h3>Thank You!</h3>
        <p>
          Your RSVP has been received. We look forward to celebrating with you!
        </p>
      </motion.div>
    );
  }

  return (
    <section className="rsvp-section">
      <div className="rsvp-content">
        <motion.div
          className="rsvp-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">RSVP FORM</h2>
          <p className="rsvp-description">
            Please help us prepare everything better by confirming your
            attendance at our wedding event with the following RSVP form:
          </p>

          {/* <div className="guest-links" style={{ marginTop: '20px', textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
              Quick access for special guests:
            </p>
            <a 
              href="#guest" 
              onClick={(e) => {
                e.preventDefault();
                setFormData(prev => ({
                  ...prev,
                  name: guest
                }));
              }}
              style={{
                display: 'inline-block',
                padding: '8px 16px',
                backgroundColor: '#f8f9fa',
                border: '1px solid #dee2e6',
                borderRadius: '20px',
                textDecoration: 'none',
                color: '#495057',
                fontSize: '14px',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#e9ecef';
                e.currentTarget.style.borderColor = '#adb5bd';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#f8f9fa';
                e.currentTarget.style.borderColor = '#dee2e6';
              }}
            >
               RSVP for {guest}
            </a>
          </div> */}
        </motion.div>

        <motion.form
          className="rsvp-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="attendance" className="form-label">
              Will you attend? *
            </label>
            <select
              id="attendance"
              name="attendance"
              value={formData.attendance}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select an option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="guests" className="form-label">
              Amount of Guest
            </label>
            <select
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              className="form-select"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </motion.form>

        <div className="rsvp-decoration">
          <img
            src="https://tibra-invitation.id/wp-content/uploads/2024/10/ASSET-GOLD-WHITE-15-Rev-1.webp"
            alt="Decoration"
          />
        </div>
      </div>
    </section>
  );
};

export default RSVPForm;
