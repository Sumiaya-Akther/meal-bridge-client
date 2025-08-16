// 📁 src/pages/AboutUs.jsx
import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const AboutUs = () => {
  return (
    <div className="bg-base-100 font-urbanist leading-relaxed tracking-wide">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto relative bg-primary text-white py-24 md:py-32 overflow-hidden">
        <div className=" px-6 text-center z-10 relative">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Mission: A Community Without Food Waste
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-3xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We connect restaurants with surplus food and charities in need, helping reduce food waste and protect our planet.
          </motion.p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={itemVariants}>
              <img
                src="https://i.ibb.co.com/7xPpc2Hg/food8.png"
                alt="Our Story"
                className="rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-105"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Our Story</h2>
              <p className="mb-4">
                Our journey began with a simple idea: to solve two problems with one solution. We saw perfectly good food going to waste while many people in our community faced hunger. By building a bridge between restaurants and charities, we created a powerful network for good.
              </p>
              <p>
                Since our inception, we have been committed to creating a platform that is not just efficient, but also fosters a sense of community. Every meal rescued, and every person helped, brings us closer to a world where no one goes hungry.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            How It Works
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {[
              { emoji: '👨‍💼', title: 'For Users', text: 'General users can browse and save donation listings, and request to become a charity.' },
              { emoji: '🍽️', title: 'For Restaurants', text: 'Restaurants can post and manage surplus food donations, helping to reduce waste.' },
              { emoji: '❤️', title: 'For Charities', text: 'Charities can request and pick up food donations to support their programs.' },
              { emoji: '⚙️', title: 'For Admins', text: 'Admins manage the platform, user roles, and donation verification, ensuring smooth operations.' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-accent p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <span className="text-4xl mb-4 block">{item.emoji}</span>
                <h3 className="text-xl font-semibold text-primary mb-2">{item.title}</h3>
                <p>{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Impact & Team Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            Our Impact & Team
          </motion.h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Impact */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-primary mb-4 text-left">Our Impact So Far</h3>
              <ul className="text-left space-y-4">
                {[
                  'Over 50,000 meals rescued and counting.',
                  'Partnered with 100+ local restaurants and bakeries.',
                  'Supported 50+ charities and shelters across the city.',
                  'Engaged a network of 2,000+ passionate community members.',
                ].map((text, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-secondary text-xl mr-3">✓</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Team */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-primary mb-6 text-left">Meet Our Team</h3>
              <div className="grid grid-cols-2 gap-8">
                {[
                  { name: 'Sumiaya Akther', role: 'Founder & CEO', img: 'https://i.ibb.co/Rtp9m6H/user1.png' },
                  { name: 'Jane Smith', role: 'Head of Operations', img: 'https://i.ibb.co/7x9SCp4y/admin.png' },
                ].map((member, idx) => (
                  <div key={idx} className="text-center">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg transition-transform duration-500 hover:scale-105"
                    />
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm">{member.role}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;
