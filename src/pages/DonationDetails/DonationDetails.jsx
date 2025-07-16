import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../provider/Authprovider";

const DonationDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const [userRole, setUserRole] = useState("");
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [pickupTime, setPickupTime] = useState("");
  const [requestDesc, setRequestDesc] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);

  // Get user role
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/${user.email}/role`)
        .then((res) => setUserRole(res.data.role))
        .catch((err) => {
          console.error("Role fetch error:", err);
          setUserRole("user");
        });
    }
  }, [user?.email, axiosSecure]);

  const { data: donation = {}, isLoading } = useQuery({
    queryKey: ["donation", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/${id}`);
      return res.data;
    },
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/${id}/reviews`);
      return res.data;
    },
  });

  const favoriteMutation = useMutation({
    mutationFn: () =>
      axiosSecure.post("/favorites", {
        donationId: id,
        userEmail: user?.email,
        title: donation.title,
        image: donation.image,
        location: donation.location,
        quantity: donation.quantity,
        restaurant: donation.restaurantName,
      }),
    onSuccess: () => Swal.fire("Saved!", "Added to favorites", "success"),
  });

  const requestMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        donationId: donation._id,
        donationTitle: donation.title,
        restaurantName: donation.restaurantName,
        restaurantEmail: donation.restaurantEmail,
        charityName: user.displayName,
        charityEmail: user.email,
        requestDescription: requestDesc,
        pickupTime,
        status: "Pending",
      };
      return await axiosSecure.post("/donation-requests", payload);
    },
    onSuccess: () => {
      Swal.fire("Requested!", "Your request has been submitted", "success");
      queryClient.invalidateQueries(["donation", id]);
      setShowRequestModal(false);
    },
  });

  const pickupMutation = useMutation({
    mutationFn: () => axiosSecure.patch(`/donations/pickup/${id}`),
    onSuccess: () => {
      Swal.fire("Success", "Donation marked as picked up!", "success");
      queryClient.invalidateQueries(["donation", id]);
    },
  });

  const reviewMutation = useMutation({
    mutationFn: () =>
      axiosSecure.post(`/donations/${id}/reviews`, {
        restaurantName: donation.restaurantName,
        donationTitle: donation.title,
        reviewer: user?.displayName,
        reviewerEmail: user?.email,
        reviewText,
        rating: parseInt(rating),
      }),
    onSuccess: () => {
      Swal.fire("Thanks!", "Review submitted", "success");
      queryClient.invalidateQueries(["reviews", id]);
      setShowReviewModal(false);
    },
  });

  if (isLoading)
    return <span className="loading loading-spinner text-primary mx-auto block"></span>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="card bg-base-100 shadow-xl">
        <figure>
          <img
            src={donation.image}
            alt={donation.title}
            className="w-full max-h-[400px] object-cover"
          />
        </figure>
        <div className="card-body">
          <div className="flex justify-between gap-5">
            <h2 className="card-title text-primary">{donation.title}</h2>
            <span
              className={
                donation.donationStatus === "Available"
                  ? "badge badge-success"
                  : donation.donationStatus === "Requested"
                  ? "badge badge-warning"
                  : donation.donationStatus === "Picked Up"
                  ? "badge badge-info"
                  : "text-gray-500"
              }
            >
              {donation.donationStatus}
            </span>
          </div>
          <p>
            <strong>Food Type:</strong> {donation.foodType}
          </p>
          <p>
            <strong>Quantity:</strong> {donation.quantity}
          </p>
          <p>
            <strong>Pickup Time:</strong> {donation.pickupTime}
          </p>
          <p>
            <strong>Location:</strong> {donation.location}
          </p>
          <p>
            <strong>Restaurant:</strong> {donation.restaurantName}
          </p>

          <div className="mt-4 flex flex-wrap gap-4">
            {(userRole === "user" || userRole === "charity") && (
              <button
                className="btn btn-outline btn-info"
                onClick={() => favoriteMutation.mutate()}
              >
                Save to Favorites
              </button>
            )}

            {userRole === "charity" && (
              <button
                className="btn btn-primary text-white"
                disabled={donation.donationStatus === "Picked Up"}
                onClick={() => setShowRequestModal(true)}
              >
                Request Donation
              </button>
            )}

            {userRole === "charity" &&
              donation.donationStatus === "Requested" &&
              donation.charityEmail === user?.email && (
                <button
                  className="btn btn-success text-white"
                  onClick={() => pickupMutation.mutate()}
                >
                  Confirm Pickup
                </button>
              )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10 bg-base-100 rounded-xl p-5 shadow">
        <h3 className="text-2xl font-semibold mb-4 text-primary">Reviews</h3>
        {reviews.length ? (
          <div className="space-y-3">
            {reviews.map((r, idx) => (
              <div
                key={idx}
                className="border border-base-200 p-3 rounded-md"
              >
                <p className="font-bold">{r.reviewer}</p>
                <p>{r.reviewText}</p>
                <p className="text-sm text-secondary">⭐ {r.rating}/5</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews yet.</p>
        )}
        {(userRole === "user" || userRole === "charity") && (
          <button
            className="btn mt-4 btn-outline btn-secondary"
            onClick={() => setShowReviewModal(true)}
          >
            Add Review
          </button>
        )}
      </div>

      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-base-100 p-6 rounded-xl w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4 text-primary">
              Request Donation
            </h2>
            <p>
              <strong>Donation:</strong> {donation.title}
            </p>
            <p>
              <strong>Restaurant:</strong> {donation.restaurantName}
            </p>
            <p>
              <strong>Charity:</strong> {user.displayName}
            </p>
            <textarea
              placeholder="Request Description"
              className="textarea textarea-bordered w-full mt-3"
              value={requestDesc}
              onChange={(e) => setRequestDesc(e.target.value)}
            />
            <input
              type="text"
              placeholder="Pickup Time (e.g. 9:00 PM)"
              className="input input-bordered w-full mt-3"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                className="btn btn-outline"
                onClick={() => setShowRequestModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary text-white"
                onClick={() => requestMutation.mutate()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-base-100 p-6 rounded-xl w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4 text-primary">Add Review</h2>
            <textarea
              placeholder="Your review"
              className="textarea textarea-bordered w-full mt-3"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <input
              type="number"
              min={1}
              max={5}
              placeholder="Rating (1-5)"
              className="input input-bordered w-full mt-3"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                className="btn btn-outline"
                onClick={() => setShowReviewModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-success text-white"
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

export default DonationDetails;
