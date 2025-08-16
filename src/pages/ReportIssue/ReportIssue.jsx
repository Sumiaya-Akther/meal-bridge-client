// 📁 src/pages/ReportIssue.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

const ReportIssue = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        issueType: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.issueType || !formData.description) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill out all fields.',
            });
            return;
        }

        try {
            console.log("Issue submitted:", formData);
            Swal.fire({
                icon: 'success',
                title: 'Thank You!',
                text: 'Your issue has been reported successfully!',
            });

            setFormData({ name: '', email: '', issueType: '', description: '' });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: 'Sorry! Your report could not be submitted. Please try again.',
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 font-sans">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    className="bg-white rounded-3xl shadow-2xl p-8 md:p-16"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center">
                        Report an Issue
                    </h2>
                    <p className="text-gray-600 mb-12 text-center">
                        Help us improve MealBridge by reporting any bugs, errors, or problems you face.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                            <label className="block text-gray-700 font-semibold mb-2">Your Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                                placeholder="Enter your name"
                            />
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                            <label className="block text-gray-700 font-semibold mb-2">Your Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                                placeholder="Enter your email"
                            />
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                            <label className="block text-gray-700 font-semibold mb-2">Issue Type</label>
                            <select
                                name="issueType"
                                value={formData.issueType}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                            >
                                <option value="">Select issue type</option>
                                <option value="Bug">Bug</option>
                                <option value="Error">Error</option>
                                <option value="Other">Other</option>
                            </select>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                            <label className="block text-gray-700 font-semibold mb-2">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="6"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-all duration-300 resize-none"
                                placeholder="Describe the issue you encountered..."
                            />
                        </motion.div>

                        <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                            <button
                                type="submit"
                                className="px-8 py-3 bg-green-700 text-white font-bold rounded-full shadow-lg hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 transform hover:scale-105"
                            >
                                Submit Issue
                            </button>
                        </motion.div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default ReportIssue;
