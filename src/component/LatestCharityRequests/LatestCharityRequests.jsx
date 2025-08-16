import React from 'react';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading/Loading';
import { motion } from 'framer-motion';

const LatestCharityRequests = () => {
  const axiosInstance = useAxios();
  const { data: requests = [], isLoading, isError } = useQuery({
    queryKey: ['requestedCharity'],
    queryFn: async () => {
      const res = await axiosInstance.get('/latest/charity-requests');
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-center text-error">Failed to load requests.</p>;

  return (
    <div className="mt-20 mb-30 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-3">
        Latest Charity Requests
      </h2>
      <p className="text-center mb-12">
        See how local charities are reaching out for support — your surplus can be their lifeline.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {requests.map((req, idx) => (
          <motion.div
            key={idx}
            data-aos="fade-up"
            className="bg-base-100 border border-gray-200 rounded-2xl shadow-md overflow-hidden p-6 flex flex-col justify-between transition-transform hover:scale-105 hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-lg">
                {req.organizationName?.charAt(0)}
              </div>
              <h4 className="ml-4 text-primary font-semibold text-lg">
                {req.organizationName}
              </h4>
            </div>

            <p className="text-gray-600 text-sm line-clamp-4 mb-4">
              📝 {req.mission}
            </p>

            <p className="text-sm text-info font-semibold mt-auto">
              🍱 Requested On:{" "}
              <span className="text-secondary">
                {new Date(req.requestDate).toLocaleString('en-US', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </span>
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LatestCharityRequests;
