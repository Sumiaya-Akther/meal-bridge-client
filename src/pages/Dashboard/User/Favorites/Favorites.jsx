import { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../provider/Authprovider";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const Favorites = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["favorites", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/favorites/${id}`),
    onSuccess: () => {
      Swal.fire("Removed!", "Donation removed from favorites.", "success");
      queryClient.invalidateQueries(["favorites", user?.email]);
    },
  });

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {favorites.map((fav) => (
        <div key={fav._id} className="card shadow-lg border border-primary/20 bg-base-100">
          <figure>
            <img src={fav.image} alt={fav.title} className="h-52 w-full object-cover" />
          </figure>
          <div className="card-body">
            <h2 className="text-xl font-bold text-primary">{fav.title}</h2>
            <p><strong>Restaurant:</strong> {fav.restaurant}</p>
            <p><strong>Location:</strong> {fav.location || "N/A"}</p>
            <p><strong>Status:</strong> {fav.donationStatus || "Pending"}</p>
            <p><strong>Quantity:</strong> {fav.quantity || "N/A"}</p>
            <div className="flex justify-between mt-4">
              <button
                className="btn btn-outline btn-info btn-sm"
                onClick={() => navigate(`/donations/${fav.donationId}`)}
              >
                Details
              </button>
              <button
                className="btn btn-outline btn-error btn-sm"
                onClick={() => removeFavoriteMutation.mutate(fav._id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
