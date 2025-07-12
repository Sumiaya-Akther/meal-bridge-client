import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const ManageDonations = () => {
  const axiosSecure = useAxiosSecure();

  const { data: donations = [], refetch, isLoading } = useQuery({
    queryKey: ['admin-manage-donations'],
    queryFn: async () => {
      const res = await axiosSecure.get('/donations');
      return res.data;
    }
  });

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await axiosSecure.patch(`/donations/${id}/status`, { status });
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          icon: 'success',
          title: `Donation ${status === 'Verified' ? 'verified' : 'rejected'}!`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to update donation status', 'error');
    }
  };

  if (isLoading) return <span className="loading loading-spinner text-primary"></span>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-primary">Manage Donations</h2>
      <div className="overflow-x-auto bg-base-200 rounded-xl shadow-md">
        <table className="table table-zebra w-full">
          <thead className="bg-primary text-primary-content">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Type</th>
              <th>Restaurant Name</th>
              <th>Email</th>
              <th>Quantity</th>
              <th>Status</th>
              <th colSpan={2} className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation, idx) => (
              <tr key={donation._id}>
                <td>{idx + 1}</td>
                <td>{donation.title}</td>
                <td>{donation.foodType}</td>
                <td>{donation.restaurantName}</td>
                <td>{donation.restaurantEmail}</td>
                <td>{donation.quantity}</td>
                <td>
                  <span className={`badge capitalize ${
                    donation.status === 'Pending'
                      ? 'badge-warning'
                      : donation.status === 'Verified'
                      ? 'badge-success'
                      : 'badge-error'
                  }`}>
                    {donation.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-xs btn-success"
                    disabled={donation.status !== 'Pending'}
                    onClick={() => handleUpdateStatus(donation._id, 'Verified')}
                  >
                    Verify
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-xs btn-error"
                    disabled={donation.status !== 'Pending'}
                    onClick={() => handleUpdateStatus(donation._id, 'Rejected')}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
            {donations.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center text-error font-semibold">No donations found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDonations;
