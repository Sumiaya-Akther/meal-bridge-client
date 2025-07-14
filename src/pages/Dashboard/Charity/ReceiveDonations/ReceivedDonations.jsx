import { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../provider/Authprovider";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const ReceivedDonations = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedDonationId, setSelectedDonationId] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);

  const { data: received = [], isLoading } = useQuery({
    queryKey: ["receivedDonations", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/charity/received-donations?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const reviewMutation = useMutation({
    mutationFn: () =>
      axiosSecure.post(`/donations/${selectedDonationId}/reviews`, {
        reviewer: user?.displayName,
        reviewText,
        rating: parseInt(rating),
      }),
    onSuccess: () => {
      Swal.fire("Thanks!", "Review submitted.", "success");
      setSelectedDonationId(null);
      setReviewText("");
      setRating(5);
      queryClient.invalidateQueries(["receivedDonations"]);
    },
  });

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {received.map((donation) => (
        <div key={donation._id} className="card bg-base-100 shadow-lg border border-primary/30">
          <div className="card-body">
            <h2 className="text-xl font-bold text-primary">{donation.title}</h2>
            <p><strong>Restaurant:</strong> {donation.restaurantName}</p>
            <p><strong>Food Type:</strong> {donation.foodType || "N/A"}</p>
            <p><strong>Quantity:</strong> {donation.quantity || "N/A"}</p>
            <p><strong>Pickup Date:</strong> {new Date(donation.pickedUpAt).toLocaleDateString()}</p>

            <button
              className="btn btn-outline btn-secondary mt-4"
              onClick={() => setSelectedDonationId(donation._id)}
            >
              Leave a Review
            </button>
          </div>
        </div>
      ))}

      {/* Review Modal */}
      {selectedDonationId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4 text-primary">Add Review</h2>
            <textarea
              placeholder="Your review"
              className="textarea textarea-bordered w-full"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <input
              type="number"
              min={1}
              max={5}
              className="input input-bordered w-full mt-3"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
            <div className="flex justify-end mt-4 gap-2">
              <button
                className="btn btn-outline"
                onClick={() => setSelectedDonationId(null)}
              >
                Cancel
              </button>
              <button
                className="btn bg-success text-white"
                onClick={() => reviewMutation.mutate()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceivedDonations;
