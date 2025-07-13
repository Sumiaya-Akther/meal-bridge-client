import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../../provider/Authprovider';

const MyDonations = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: donations = [], refetch, isLoading } = useQuery({
        queryKey: ['my-donations', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/donations/restaurant/${user.email}`);
            return res.data;
        },
    });

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'This donation will be permanently deleted.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirm.isConfirmed) {
            const res = await axiosSecure.delete(`/donations/${id}`);
            if (res.data.deletedCount > 0) {
                Swal.fire('Deleted!', 'Your donation has been removed.', 'success');
                refetch();
            }
        }
    };

    if (isLoading) return <span className="loading loading-spinner text-primary"></span>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {donations.map((donation) => (
                <div key={donation._id} className="card bg-base-200 p-2 shadow-md">
                    <figure className="relative overflow-hidden border-secondary border rounded-lg group">
                        <img
                            src={donation.image}
                            alt={donation.title}
                            className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-110"
                        />
                    </figure>
                    <div className="card-body px-2 py-3">
                        <div className='flex justify-between gap-6'>
                            <h2 className="card-title text-primary">{donation.title}</h2>
                            <p>
                                <span className={`ml-2 badge ${donation.status === 'Pending' ? 'badge-warning' :
                                    donation.status === 'Verified' ? 'badge-success' :
                                        'badge-error'
                                    }`}>
                                    {donation.status}
                                </span>
                            </p>
                        </div>
                        <p>Type: {donation.foodType}</p>
                        <p>Quantity: {donation.quantity}</p>
                        <p>Restaurant: {donation.restaurantName}</p>

                        <div className="mt-4 flex justify-between items-center">
                            {donation.status !== 'Rejected' && (
                                <button
                                    onClick={() => navigate(`/dashboard/update-donation/${donation._id}`)}
                                    className="btn btn-sm btn-info"
                                >
                                    Update
                                </button>
                            )}
                            <button
                                onClick={() => handleDelete(donation._id)}
                                className="btn btn-sm btn-error"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyDonations;
