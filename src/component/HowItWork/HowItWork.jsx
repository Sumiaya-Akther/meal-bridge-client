// 📁 src/pages/Home/HowItWork.jsx
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../provider/Authprovider';

const steps = [
    {
        number: 1,
        title: "Restaurants Donate",
        description:
            "Restaurants with verified accounts post their surplus food donations. They provide details like food type, quantity, and a convenient pickup time.",
        icon: (
            <svg
                className="w-7 h-7 md:w-9 md:h-9 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                ></path>
            </svg>
        ),
        color: "bg-primary",
    },
    {
        number: 2,
        title: "Charities Request",
        description:
            "Registered charities can browse available listings, make a request, and arrange for a pickup time. The platform ensures seamless communication.",
        icon: (
            <svg
                className="w-7 h-7 md:w-9 md:h-9 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2z"
                ></path>
            </svg>
        ),
        color: "bg-secondary",
    },
    {
        number: 3,
        title: "Food Is Saved",
        description:
            "Once a pickup is confirmed, the charity collects the food. This simple process reduces food waste and provides much-needed meals to the community.",
        icon: (
            <svg
                className="w-7 h-7 md:w-9 md:h-9 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                ></path>
            </svg>
        ),
        color: "bg-primary",
    },
];

const HowItWork = () => {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleJoinClick = () => {
        if (user) {
            navigate('/dashboard'); // Already logged in
        } else {
            navigate('/register'); // Not logged in
        }
    };

    return (
        <section className="mt-20 mb-30">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                        How Our Platform Works
                    </h2>
                    <p className="">
                        A simple, powerful way to connect surplus food with those who need it.
                    </p>
                </div>

                <div className="relative flex flex-col items-center">
                    {/* Vertical line behind steps only */}
                    <div className="absolute top-0 bottom-0 w-1 bg-gray-200 rounded-full hidden md:block z-0"></div>

                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            className={`flex flex-col md:flex-row ${idx % 2 !== 0 ? "md:flex-row-reverse" : ""
                                } items-center w-full my-8 md:my-12 z-10`}
                            data-aos="fade-up"
                            data-aos-delay={idx * 150}
                        >
                            {/* Step circle */}
                            <div
                                className={`flex-shrink-0 relative w-12 h-12 md:w-16 md:h-16 rounded-full ${step.color} flex items-center justify-center z-10`}
                            >
                                {step.icon}
                                <span className="absolute -top-6 text-sm md:text-base font-bold text-gray-800">
                                    {step.number}
                                </span>
                            </div>

                            {/* Step card */}
                            <motion.div
                                className={`${idx % 2 !== 0 ? "md:mr-8" : "md:ml-8"
                                    } mt-4 md:mt-0 max-w-md bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1`}
                                whileHover={{ scale: 1.03 }}
                            >
                                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 text-sm">{step.description}</p>
                            </motion.div>
                        </motion.div>
                    ))}

                    {/* CTA Button separately */}
                    <div className="text-center mt-12 z-10">
                        <p className="text-md">Ready to make a difference?</p>
                        <Link
                            onClick={handleJoinClick}
                            className="inline-block mt-4 px-8 py-3 bg-secondary text-white font-bold rounded-full shadow-lg hover:bg-orange-600 transition-colors duration-300 cursor-pointer"
                        >
                            Join Us Today
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWork;
