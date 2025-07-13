import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const FeatureDonations = () => {
  const axiosSecure = useAxiosSecure();

  const { data: donations = [], refetch } = useQuery({
    queryKey: ['verified-donations'],
    queryFn: async () => {
      const res = await axiosSecure.get('/donations-data/verified');
      return res.data;
    },
  });

  const handleFeature = async (id) => {
    const res = await axiosSecure.patch(`/donations/${id}/feature`);
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        icon: 'success',
        title: 'Featured!',
        text: 'This donation is now featured.',
        timer: 1500,
        showConfirmButton: false,
      });
      refetch();
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-secondary">Feature Donations</h2>
      <div className="overflow-x-auto border border-secondary rounded-xl bg-base-200 shadow">
        <table className="table table-zebra w-full">
          <thead className="bg-secondary text-secondary-content">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Food Type</th>
              <th>Restaurant</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation, idx) => (
              <tr key={donation._id}>
                <td>{idx + 1}</td>
                <td>
                  <div className="w-16 h-16 overflow-hidden rounded">
                    <img src={donation.image} alt={donation.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                  </div>
                </td>
                <td>{donation.title}</td>
                <td>{donation.foodType}</td>
                <td>{donation.restaurantName}</td>
                <td>
                  {donation.featured ? (
                    <span className="badge badge-success">Featured</span>
                  ) : (
                    <button
                      onClick={() => handleFeature(donation._id)}
                      className="btn btn-xs btn-primary"
                    >
                      Feature
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {donations.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-error">No verified donations found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeatureDonations;
