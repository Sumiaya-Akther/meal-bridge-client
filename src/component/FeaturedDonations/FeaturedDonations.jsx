import React, { useEffect } from 'react';
import { Link } from 'react-router';
import Loading from '../Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';

const FeaturedDonations = () => {
    const axiosInstance = useAxios();

    const { data: featuredDonations = [], isLoading } = useQuery({
        queryKey: ['featured-donations'],
        queryFn: async () => {
            const res = await axiosInstance.get('/featured/donations');
            return res.data;
        },
    });

    useEffect(() => {
        Aos.init({ duration: 800, once: true });
    }, []);

    if (isLoading) return <Loading />;

    return (
        <div className="my-30 px-4 max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-3">
                🌟 Featured Donations
            </h2>
            <p className="text-center mb-12">
                Discover handpicked food donations that are ready to make a difference in your community.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {featuredDonations.slice(0, 8).map((donation, index) => (
                    <motion.div
                        key={donation._id}
                        data-aos="fade-up"
                        data-aos-delay={index * 100} // staggered effect
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: 'spring', stiffness: 120 }}
                        className="bg-base-100 border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col"
                    >
                        <img
                            src={donation.image}
                            alt={donation.title}
                            className="w-full h-48 object-cover rounded-t-2xl"
                        />
                        <div className="p-5 flex-1 flex flex-col justify-between">
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-secondary">
                                    {donation.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    🍱 <span className="font-medium text-primary">{donation.foodType}</span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    🍽️ <span className="text-secondary font-medium">{donation.restaurantName}</span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    📍 {donation.location}
                                </p>
                                <p className="text-sm font-semibold text-info">
                                    🏷️ {donation.donationStatus}
                                </p>
                            </div>
                            <div className="mt-4">
                                <Link
                                    to={`/donations/${donation._id}`}
                                    className="btn btn-primary btn-sm w-full rounded-full shadow hover:scale-[1.02] transition-transform"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedDonations;
