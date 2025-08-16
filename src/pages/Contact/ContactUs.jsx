// 📁 src/pages/ContactUs.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import LocationMap from '../../component/LocationMap/LocationMap';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill out all fields.',
      });
      return;
    }

    try {
      console.log("Form data submitted:", formData);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Your message has been sent successfully!',
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error("Submission failed:", error);
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: 'Sorry! The message could not be sent. Please try again.',
      });
    }
  };

  return (
   <section>
     <div className="min-h-screen flex items-center justify-center py-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className=" rounded-3xl shadow-2xl p-8 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          {/* Left: Contact Details */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-primary mb-6">Contact Information</h2>
            <p className="text-lg mb-8">
              We're here to help and answer any questions. We look forward to hearing from you.
            </p>
            <ul className="space-y-6 text-lg">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-primary mt-1 mr-4 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold">Our Office</h4>
                  <p>Sylhet, Bangladesh, 98765</p>
                </div>
              </li>
              <li className="flex items-start">
                <FaPhone className="text-primary mt-1 mr-4 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold">Phone Number</h4>
                  <p>+880-1234-567890</p>
                </div>
              </li>
              <li className="flex items-start">
                <FaEnvelope className="text-primary mt-1 mr-4 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold">Email Address</h4>
                  <p>support@mealbridge.com</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Right: Contact Form */}
          <div>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { label: "Your Name", name: "name", type: "text", delay: 0.2 },
                { label: "Your Email", name: "email", type: "email", delay: 0.3 },
              ].map((field, idx) => (
                <motion.div
                  key={idx}
                  className="relative w-full group"
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: field.delay }}
                >
                  <label htmlFor={field.name} className="block font-semibold mb-2">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    id={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg bg-accent focus:ring-primary focus:border-primary transition-all duration-300"
                    required
                  />
                </motion.div>
              ))}

              <motion.div
                className="relative w-full group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <label htmlFor="message" className="block font-semibold mb-2">Your Message</label>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg bg-accent focus:ring-primary focus:border-primary transition-all duration-300 resize-none"
                  required
                ></textarea>
              </motion.div>

              <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-primary text-white font-bold rounded-full shadow-lg hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-primary transition-all duration-300 transform hover:scale-105"
                >
                  Send Message
                </button>
              </motion.div>
            </form>
          </div>

        </motion.div>
      </div>
    </div>
    <LocationMap></LocationMap>
   </section>
  );
};

export default ContactUs;
