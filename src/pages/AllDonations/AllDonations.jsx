import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router'; // fix: 'react-router-dom'
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 220, damping: 24 },
  },
};

const AllDonations = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    AOS.init({ duration: 650, easing: 'ease-out-cubic', once: true, offset: 40 });
  }, []);

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ['allDonations', search, sortField, sortOrder],
    queryFn: async () => {
      const res = await axiosSecure.get('/all-donations', {
        params: { search, sort: sortField, order: sortOrder },
      });
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="px-4 py-10 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            All Verified Donations
          </h2>
          <p className="text-base-content/70 mt-2">Loading donations near you…</p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="relative card bg-base-200/60 border rounded-2xl overflow-hidden animate-pulse">
              <div className="h-48 w-full bg-base-300" />
              <div className="card-body">
                <div className="h-5 w-2/3 bg-base-300 rounded mb-2" />
                <div className="h-4 w-1/2 bg-base-300 rounded mb-1.5" />
                <div className="h-4 w-3/4 bg-base-300 rounded mb-1.5" />
                <div className="h-4 w-1/3 bg-base-300 rounded mb-1.5" />
                <div className="h-9 w-24 bg-base-300 rounded mt-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-10 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          All Verified Donations
        </h2>
        <p className="text-base-content/70 mt-2">
          Browse and request verified food donations near you.
        </p>
      </div>

      {/* Search & Sort */}
      <div
        className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-base-100/70 backdrop-blur border rounded-2xl p-4"
        data-aos="fade-up"
      >
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search by location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full pl-10"
          />
          <svg
            className="w-5 h-5 absolute left-3 top-3.5 text-base-content/50"
            xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeWidth="2" d="M21 21l-4.3-4.3m0 0A7 7 0 1010.4 17a7 7 0 006.3-6.3z" />
          </svg>
        </div>

        <div className="flex gap-3">
          <select
            className="select select-bordered"
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="quantity">Quantity</option>
            <option value="pickupTime">Pickup Time</option>
          </select>
          <select
            className="select select-bordered"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
      </div>

      {/* Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {donations.map((donation, idx) => (
          <motion.div
            key={donation._id}
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="group relative card bg-base-100/80 backdrop-blur border rounded-2xl shadow-xl overflow-hidden"
            data-aos="zoom-in-up"
            data-aos-delay={Math.min(idx * 45, 250)}
          >
            <figure className="relative overflow-hidden">
              <motion.img
                src={donation.image}
                alt={donation.title}
                className="w-full h-48 object-cover transition-transform duration-500"
                whileHover={{ scale: 1.08 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-base-100/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-3 left-3">
                <span className={statusBadgeClass(donation.donationStatus)}>
                  {donation.donationStatus}
                </span>
              </div>
            </figure>

            <div className="card-body">
              <div className="flex items-start justify-between gap-3">
                <h2 className="card-title leading-tight line-clamp-2">
                  <span className="text-primary">{donation.title}</span>
                </h2>
                <div className="text-xs md:text-sm text-base-content/70 whitespace-nowrap inline-flex items-center gap-1 px-2 py-1 rounded-full bg-base-200">
                  <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {donation.pickupTime}
                </div>
              </div>

              <div className="mt-2 space-y-1.5 text-sm">
                <p><strong>Food:</strong> {donation.foodType}</p>
                <p><strong>Quantity:</strong> {donation.quantity}</p>
                <p><strong>Restaurant:</strong> {donation.restaurantName} — {donation.location}</p>
                <p><strong>Charity:</strong> {donation.charityName || 'N/A'}</p>
              </div>

              <div className="card-actions mt-4 flex items-center justify-between">
                <div className="text-xs text-base-content/60">
                  ID: {donation._id?.slice(-6)}
                </div>
                <Link
                  to={`/donations/${donation._id}`}
                  className="btn btn-primary btn-sm normal-case group/btn"
                >
                  Details
                  <svg
                    className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-0.5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Hover ring accent */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 ring-primary/20 transition-all" />
          </motion.div>
        ))}
      </motion.div>

      {donations.length === 0 && (
        <div
          className="mt-10 mx-auto max-w-md text-center bg-base-100/70 border rounded-2xl p-6"
          data-aos="fade-up"
        >
          <div className="mx-auto mb-3 w-10 h-10 rounded-full bg-base-200 flex items-center justify-center">
            <svg className="w-5 h-5 text-base-content/70" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeWidth="2" d="M21 21l-4.3-4.3M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-base-content/70">No donations found.</p>
          {(search || sortField || sortOrder !== 'asc') && (
            <button
              onClick={() => { setSearch(''); setSortField(''); setSortOrder('asc'); }}
              className="btn btn-ghost btn-sm mt-3"
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AllDonations;

// Helper: status badge styles
function statusBadgeClass(status) {
  switch (status) {
    case 'Available':
      return 'badge badge-success';
    case 'Requested':
      return 'badge badge-warning';
    case 'Picked Up':
      return 'badge badge-info';
    case 'Pending':
      return 'badge badge-neutral';
    default:
      return 'badge';
  }
}