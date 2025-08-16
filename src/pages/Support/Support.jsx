import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const Support = () => {
    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center py-16">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Vision Section */}
                <motion.div
                    className="bg-green-700 text-white rounded-3xl shadow-xl p-8 md:p-16 mb-12 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Mission & Vision</h2>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto font-light">
                        MealBridge connects restaurants, charities, and volunteers to reduce food waste and feed those in need. Our goal is to build a strong, community-driven network that makes an impact every day.
                    </p>
                </motion.div>

                {/* Main Heading */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold mb-5">Need Support?</h1>
                    <p className="text-lg">Our team is here to help you navigate MealBridge and answer your questions.</p>
                </div>

                {/* Support Options */}
                <div className="grid md:grid-cols-3 gap-8">
                    <motion.div
                        className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                    >
                        <h3 className="text-2xl text-gray-900 font-semibold mb-3">Frequently Asked Questions</h3>
                        <p className=" mb-6 text-gray-900">Find answers about donations, requests, user roles, and platform features.</p>
                        <Link to="/faq" className="inline-flex items-center text-yellow-400 hover:text-yellow-500 font-bold transition-colors duration-300">
                            Go to FAQ →
                        </Link>
                    </motion.div>

                    <motion.div
                        className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                    >
                        <h3 className="text-2xl text-gray-900 font-semibold mb-3">Report an Issue</h3>
                        <p className="text-gray-900 mb-6">Found a bug or problem? Notify us so we can fix it promptly.</p>
                        <Link to="/report" className="inline-flex items-center text-yellow-400 hover:text-yellow-500 font-bold transition-colors duration-300">
                            Report Issue →
                        </Link>
                    </motion.div>

                    <motion.div
                        className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                    >
                        <h3 className="text-2xl text-gray-900 font-semibold mb-3">Contact Support</h3>
                        <p className="text-gray-900 mb-6">Didn't find what you need? Reach out directly to our support team.</p>
                        <Link to="/contact" className="inline-flex items-center text-yellow-400 hover:text-yellow-500 font-bold transition-colors duration-300">
                            Contact Us →
                        </Link>
                    </motion.div>
                </div>
                {/* Support Hours */}
                <div className="text-center mt-12">
                    <p className="text-lg">
                        Our support team is available <span className="font-semibold text-green-700">7 days a week, 9:00 AM - 9:00 PM</span>.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Support;
