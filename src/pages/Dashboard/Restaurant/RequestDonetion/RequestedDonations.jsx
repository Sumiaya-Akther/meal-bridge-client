import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const RequestedDonations = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['requestedDonations'],
    queryFn: async () => {
      const res = await axiosSecure.get('/restaurant/donation-requests');
      return res.data;
    }
  });
  console.log(requests);
  

  const acceptMutation = useMutation({
    mutationFn: async ({ requestId, donationId }) => {
      const res = await axiosSecure.patch(`/donation-requests/accept/${requestId}`, { donationId });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Accepted", "Donation request accepted", "success");
      queryClient.invalidateQueries(['requestedDonations']);
    }
  });

  const rejectMutation = useMutation({
    mutationFn: async (requestId) => {
      const res = await axiosSecure.patch(`/donation-requests/reject/${requestId}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Rejected", "Donation request rejected", "warning");
      queryClient.invalidateQueries(['requestedDonations']);
    }
  });

  if (isLoading) return <span className="loading loading-spinner text-center text-primary"></span>;

  return (
    <div className="p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-primary">Requested Donations</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Donation Title</th>
            <th>Charity Name</th>
            <th>Charity Email</th>
            <th>Request Description</th>
            <th>Pickup Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r, i) => (
            <tr key={r._id}>
              <td>{i + 1}</td>
              <td>{r.donationTitle}</td>
              <td>{r.charityName}</td>
              <td>{r.charityEmail}</td>
              <td className="line-clamp-1">{r.requestDescription}</td>
              <td>{r.pickupTime}</td>
              <td>{r.status}</td>
              <td>
                {r.status === 'Pending' ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => acceptMutation.mutate({ requestId: r._id, donationId: r.donationId })}
                      className="btn btn-success btn-sm"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => rejectMutation.mutate(r._id)}
                      className="btn btn-error btn-sm"
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <span className="text-gray-500">No actions</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestedDonations;
