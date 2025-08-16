import React from 'react';
import { FaLeaf, FaUtensils, FaRecycle } from 'react-icons/fa';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

const statsData = [
  {
    icon: <FaUtensils className="text-5xl text-secondary mx-auto mb-4" />,
    count: 12500,
    label: "Food Donated",
    unit: "kg",
    color: "text-secondary",
  },
  {
    icon: <FaRecycle className="text-5xl text-info mx-auto mb-4" />,
    count: 30000,
    label: "Meals Served",
    unit: "Meals",
    color: "text-info",
  },
  {
    icon: <FaLeaf className="text-5xl text-success mx-auto mb-4" />,
    count: 18,
    label: "CO₂ Reduced",
    unit: "Tons",
    color: "text-success",
  },
];

const ImpactStats = () => {
  return (
    <div className="mt-20 mb-30 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
          📊 Our Community Impact
        </h2>
        <p className="text-center mb-12">
          Track how our collective actions are reducing waste, serving meals, and saving the planet.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {statsData.map((stat, idx) => (
            <motion.div
              key={idx}
              className="bg-base-100 rounded-2xl shadow-md p-6 border border-gray-200 flex flex-col items-center justify-center hover:shadow-xl cursor-pointer transition duration-300"
              whileHover={{ scale: 1.05 }}
              data-aos="fade-up"
              data-aos-delay={idx * 150}
            >
              <div className={`p-2 rounded-full transition duration-300 hover:shadow-[0_0_20px_${stat.color}]`}>
                {stat.icon}
              </div>
              <h3 className={`text-2xl font-bold text-primary mt-2`}>
                <CountUp end={stat.count} duration={3} separator="," /> {stat.unit}
              </h3>
              <p className="text-sm text-secondary mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImpactStats;
