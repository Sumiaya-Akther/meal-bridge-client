import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useContext } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../../provider/Authprovider";


const MyRequests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);

  const { data: myRequests = [], isLoading } = useQuery({
    queryKey: ["myDonationRequests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/charity/my-requests?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const cancelRequest = useMutation({
    mutationFn: async (requestId) => {
      const res = await axiosSecure.delete(`/donation-requests/${requestId}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Cancelled", "Your request has been removed.", "success");
      queryClient.invalidateQueries(["myDonationRequests"]);
    },
  });

  if (isLoading) return <div className="text-center">Loading...</div>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {myRequests.map((req) => (
        <div key={req._id} className="card shadow-xl bg-base-100 border border-primary/30">
          <div className="card-body">
            <h2 className="card-title text-primary">{req.donationTitle}</h2>
            <p><strong>Restaurant:</strong> {req.restaurantName}</p>
            <p><strong>Food Type:</strong> {req.foodType || "N/A"}</p>
            <p><strong>Quantity:</strong> {req.quantity || "N/A"}</p>
            <p><strong>Status:</strong> 
              <span className={`badge ml-2 ${
                req.status === "Accepted" ? "badge-success" :
                req.status === "Rejected" ? "badge-error" : "badge-warning"
              }`}>
                {req.status}
              </span>
            </p>
            {req.status === "Pending" && (
              <button
                onClick={() => cancelRequest.mutate(req._id)}
                className="btn btn-outline btn-error btn-sm mt-3"
              >
                Cancel Request
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyRequests;
