import React from 'react';
import { FaLeaf, FaUtensils, FaRecycle } from 'react-icons/fa';
import CountUp from 'react-countup';

const ImpactStats = () => {
  return (
    <div className="mt-20 mb-30 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
          📊 Our Community Impact
        </h2>
        <p className=' text-center mb-12'>Track how our collective actions are reducing waste, serving meals, and saving the planet.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-base-100 rounded-2xl shadow p-6">
            <FaUtensils className="text-5xl text-secondary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-700">
              <CountUp end={12500} duration={30} separator="," />+ kg
            </h3>
            <p className="text-sm text-gray-500 mt-2">Food Donated</p>
          </div>

          {/* Card 2 */}
          <div className="bg-base-100 rounded-2xl shadow p-6">
            <FaRecycle className="text-5xl text-info mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-700">
              <CountUp end={30000} duration={30} separator="," />+ Meals
            </h3>
            <p className="text-sm text-gray-500 mt-2">Meals Served</p>
          </div>

          {/* Card 3 */}
          <div className="bg-base-100 rounded-2xl shadow p-6">
            <FaLeaf className="text-5xl text-success mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-700">
              <CountUp end={18} duration={30} /> Tons
            </h3>
            <p className="text-sm text-gray-500 mt-2">CO₂ Reduced</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactStats;
