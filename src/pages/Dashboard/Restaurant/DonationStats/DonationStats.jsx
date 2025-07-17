import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import { AuthContext } from "../../../../provider/Authprovider";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const DonationStats = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: stats = [], isLoading } = useQuery({
    queryKey: ["donationStats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/restaurant/donations/statistics?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <span className="loading loading-spinner text-primary"></span>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Your Donation Statistics</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={stats}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="foodType" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalQuantity" fill="#4CAF50" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonationStats;
