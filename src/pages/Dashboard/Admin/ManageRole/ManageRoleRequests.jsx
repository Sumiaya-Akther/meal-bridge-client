import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageRoleRequests = () => {
    const queryClient = useQueryClient();
    const axiosSecure = useAxiosSecure();

    // Get all charity role requests
    const { data: requests = [], isLoading } = useQuery({
        queryKey: ['charityRequests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/charity-role-requests');
            return res.data;
        },
    });

    // Approve request
    const approveRequest = useMutation({
        mutationFn: ({ id, email }) =>
            axiosSecure.patch(`/charity-role-requests/approve/${id}`, { email }),
        onSuccess: () => {
            Swal.fire({
                icon: 'success',
                title: 'Approved!',
                text: 'User has been granted Charity role.',
                confirmButtonColor: '#16a34a', // Tailwind green-600
            });
            queryClient.invalidateQueries(['charityRequests']);
        },
    });

    // Reject request
    const rejectRequest = useMutation({
        mutationFn: (id) =>
            axiosSecure.patch(`/charity-role-requests/reject/${id}`),
        onSuccess: () => {
            Swal.fire({
                icon: 'warning',
                title: 'Rejected!',
                text: 'Charity request has been rejected.',
                confirmButtonColor: '#dc2626', // Tailwind red-600
            });
            queryClient.invalidateQueries(['charityRequests']);
        },
    });

    if (isLoading) return <span className="loading loading-spinner text-primary"></span>;

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-primary">
                Manage Role Requests
            </h2>

            <div className="overflow-x-auto bg-base-200 rounded-xl shadow-md">
                <table className="table table-zebra w-full">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Organization</th>
                            <th>Mission</th>
                            <th>Transaction ID</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {requests.map((request, index) => (
                            <tr key={request._id} className="hover:bg-gray-50 transition-all">
                                <td>{index + 1}</td>
                                <td className="font-semibold">{request.name}</td>
                                <td>{request.email}</td>
                                <td>{request.organizationName}</td>
                                <td className="max-w-xs truncate">{request.mission}</td>
                                <td>{request.transactionId}</td>
                                <td>
                                    <span
                                        className={`badge ${request.status === 'Pending'
                                                ? 'badge-warning'
                                                : request.status === 'Approved'
                                                    ? 'badge-success'
                                                    : 'badge-error'
                                            }`}
                                    >
                                        {request.status}
                                    </span>
                                </td>

                                <td className="space-x-2">
                                    {request.status === 'Pending' ? (
                                        <>
                                            <button
                                                onClick={() =>
                                                    approveRequest.mutate({
                                                        id: request._id,
                                                        email: request.email,
                                                    })
                                                }
                                                className="btn btn-success btn-xs"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => rejectRequest.mutate(request._id)}
                                                className="btn btn-error btn-xs"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    ) : (
                                        <span className="text-gray-400 italic text-sm">No actions</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageRoleRequests;
