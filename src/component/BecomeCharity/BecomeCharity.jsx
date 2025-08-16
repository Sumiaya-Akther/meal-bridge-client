// 📁 src/pages/Home/BecomeCharity.jsx
import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 100, damping: 10, staggerChildren: 0.2 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.08, boxShadow: '0 10px 20px rgba(0,0,0,0.25)', transition: { duration: 0.3 } },
};

const BecomeCharity = () => (
    <motion.section
        className=" max-w-7xl mx-auto relative mt-20 mb-30 px-4 py-24 rounded-2xl overflow-hidden text-center
               bg-gradient-to-r from-green-500 via-green-600 to-green-700 shadow-lg"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
    >
        <motion.h2
            className="relative z-10 text-4xl font-extrabold text-white mb-6"
            variants={itemVariants}
        >
            ❤️ Become a Charity Partner
        </motion.h2>

        <motion.p
            className="relative z-10 text-white/90 text-lg md:text-xl font-light max-w-3xl mx-auto mb-12 leading-relaxed"
            variants={itemVariants}
        >
            Join our growing network of charities and gain access to a consistent stream of surplus food donations.
            Together, we can make a real difference and ensure no one in our community goes hungry.
        </motion.p>

        <motion.div
            className="relative z-10 inline-block"
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
        >
            <Link
                to="/register"
                className="btn bg-white text-green-600 font-bold text-lg rounded-full
                   shadow-lg hover:bg-gray-100 transition-all duration-300"
            >
                Register Now
            </Link>
        </motion.div>
    </motion.section>
);

export default BecomeCharity;
