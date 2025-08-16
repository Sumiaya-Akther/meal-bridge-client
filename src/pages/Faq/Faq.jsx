import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuestionCircle, FaChevronDown } from 'react-icons/fa';

const faqs = [
    { question: "How do I become a charity?", answer: "To become a charity, register on MealBridge and submit a charity role request. Admins will review and approve your request." },
    { question: "How can restaurants post donations?", answer: "Restaurants can register, login, and add donations through the Restaurant Dashboard. You can manage all donations from there." },
    { question: "Can users save favorite donations?", answer: "Yes! General users can browse donations and save them to their favorites for quick access." },
    { question: "How does pickup confirmation work?", answer: "After a charity requests a donation, the restaurant can approve it. Once picked up, the charity confirms the pickup and the status updates automatically." },
    { question: "What if I face a technical issue?", answer: "You can report issues via the Support page, and our team will address them as soon as possible." },
];

const Faq = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

    return (
        <section className="font-sans min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl font-bold text-primary mb-4">Frequently Asked Questions</h1>
                    <p className="text-lg text-gray-600">Find answers to the most common questions about MealBridge.</p>
                </motion.div>

                <div className="space-y-6">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <button
                                className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
                                onClick={() => toggle(i)}
                            >
                                <div className="flex items-start">
                                    <FaQuestionCircle className="text-green-700 mt-1 mr-4" size={20} />
                                    <h3 className="text-xl font-semibold text-gray-800">{faq.question}</h3>
                                </div>
                                <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                    <FaChevronDown className="text-gray-500" size={20} />
                                </motion.div>
                            </button>

                            <AnimatePresence initial={false}>
                                {openIndex === i && (
                                    <motion.div
                                        key="content"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden pl-14 pr-6 pb-6 text-gray-600"
                                    >
                                        {faq.answer}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Faq;
