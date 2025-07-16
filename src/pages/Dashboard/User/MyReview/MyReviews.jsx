import { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import moment from "moment";
import { AuthContext } from "../../../../provider/Authprovider";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["myReviews", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?email=${user?.email}`);
      return res.data;
    },
  });

  const deleteReviewMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/reviews/${id}`),
    onSuccess: () => {
      Swal.fire("Deleted!", "Review has been removed.", "success");
      queryClient.invalidateQueries(["myReviews", user?.email]);
    },
  });

  if (isLoading)
    return (
      <span className="loading loading-spinner text-center text-primary mx-auto block"></span>
    );

  return (
    <div className="p-6">
      {reviews.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No reviews added yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="card shadow border border-primary/10 bg-base-100"
            >
              <div className="card-body">
                <h2 className="text-lg font-bold text-primary">
                  {review.donationTitle}
                </h2>
                <p>
                  <strong>Restaurant:</strong> {review.restaurantName}
                </p>
                <p>
                  <strong>Time:</strong>{" "}
                  {moment(review.createdAt).format("MMMM D, YYYY h:mm A")}
                </p>
                <p>
                  <strong>Description:</strong> {review.reviewText}
                </p>
                <div className="text-right mt-4">
                  <button
                    onClick={() => deleteReviewMutation.mutate(review._id)}
                    className="btn btn-outline btn-error btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
