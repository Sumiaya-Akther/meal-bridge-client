import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AllDonations = () => {
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState('');
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const { data: donations = [], isLoading } = useQuery({
        queryKey: ['allDonations', search, sortField, sortOrder],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-donations', {
                params: { search, sort: sortField, order: sortOrder },
            });
            return res.data;
        },
    });

    if (isLoading) return <span className="loading loading-spinner text-center text-primary"></span>;

    return (
        <div className="px-4 py-8 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6">All Verified Donations</h2>

            {/* Search and Sort Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by location"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input input-bordered w-full md:w-1/3"
                />

                <div className="flex items-center gap-3">
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

            {/* Donations Grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {donations.map((donation) => (
                    <div key={donation._id} className="card bg-base-100 shadow-xl border">
                        <figure className='overflow-hidden'>
                            <img src={donation.image} alt={donation.title} className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300" />
                        </figure>
                        <div className="card-body">
                            <div className='flex justify-between gap-5'>
                                <h2 className="card-title text-primary">{donation.title}</h2>
                                <p>
                                    <span className=""></span>
                                    <span className={
                                        donation.donationStatus === 'Pending' ? 'badge badge-success' :
                                        donation.donationStatus === 'Available' ? 'badge badge-success' :
                                        donation.donationStatus === 'Requested' ? 'badge badge-warning' :
                                        donation.donationStatus === 'Picked Up' ? 'badge badge-primary' : 'text-gray-500'
                                    }>
                                        {donation.donationStatus}
                                    </span>
                                </p>
                            </div>
                            <p><strong>Food:</strong> {donation.foodType}</p>
                            <p><strong>Quantity:</strong> {donation.quantity}</p>
                            <p><strong>Pickup Time:</strong> {donation.pickupTime}</p>
                            <p><strong>Restaurant:</strong> {donation.restaurantName} - {donation.location}</p>

                            <p><strong>Charity:</strong> {donation.charityName || 'N/A'}</p>
                            <div className="card-actions mt-4">
                                <Link
                                    to={`/donations/${donation._id}`}
                                    className="btn btn-outline btn-primary btn-sm"
                                >
                                    Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {donations.length === 0 && (
                <p className="text-center mt-10 text-gray-500">No donations found.</p>
            )}
        </div>
    );
};

export default AllDonations;
