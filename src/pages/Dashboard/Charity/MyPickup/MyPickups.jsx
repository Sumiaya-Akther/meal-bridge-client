import { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../../provider/Authprovider";
import { Link } from "react-router";

const MyPickups = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const { user } = useContext(AuthContext);

    const { data: pickups = [], isLoading } = useQuery({
        queryKey: ["myPickups", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/charity/my-pickups?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const confirmPickup = useMutation({
        mutationFn: async (donationId) => {
            const res = await axiosSecure.patch(`/donations/pickup/${donationId}`);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire("Success!", "Donation marked as Picked Up.", "success");
            queryClient.invalidateQueries(["myPickups"]);
        },
    });

    if (isLoading) return <p className="text-center">Loading...</p>;

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pickups.map((pickup) => (
                <div key={pickup._id} className="card bg-base-100 shadow-lg border border-primary/30">
                    <div className="card-body">
                        <h2 className="text-xl font-bold text-primary">{pickup.donationTitle}</h2>
                        <p><strong>Restaurant:</strong> {pickup.restaurantName}</p>
                        <p><strong>Location:</strong> {pickup.location}</p>
                        <p><strong>Food Type:</strong> {pickup.foodType || "N/A"}</p>
                        <p><strong>Quantity:</strong> {pickup.quantity || "N/A"}</p>
                        <p><strong>Pickup Time:</strong> {pickup.pickupTime}</p>
                        <p><strong>Status:</strong>
                            <span className={`badge ml-2 ${pickup.donationStatus === "Picked Up" ? "badge-success" : "badge-warning"
                                }`}>
                                {pickup.donationStatus}
                            </span>
                        </p>
                        {pickup.donationStatus !== "Picked Up" && (
                            <Link to='/dashboard/received'>
                                <button
                                    className="btn bg-success text-white mt-4"
                                    onClick={() => confirmPickup.mutate(pickup.donationId)}
                                >
                                    Confirm Pickup
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyPickups;
