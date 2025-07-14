import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../../provider/Authprovider";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const TransactionHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['userTransactions', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-transactions/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <div className="text-center text-primary">Loading...</div>;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6 text-primary">Transaction History</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions found.</p>
      ) : (
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200 text-base font-semibold">
              <th>#</th>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Request Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={tx.transactionId}>
                <td>{index + 1}</td>
                <td>{tx.transactionId}</td>
                <td>${tx.amount}</td>
                <td>{new Date(tx.date).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`badge ${
                      tx.status === "Approved"
                        ? "badge-success"
                        : tx.status === "Rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionHistory;
