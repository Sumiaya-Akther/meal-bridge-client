import React from 'react';
import { useMutation, useQuery, useQueryClient,  } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';



const ManageRequests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all donation requests
  const { data: requests = [], isLoading} = useQuery({
    queryKey: ['charity-requests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/charity-requests');
      return res.data;
    },
  });

  

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/admin/charity-requests/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['charity-requests']);
      Swal.fire('Deleted!', 'The request has been removed.', 'success');
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this request?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Charity Requests</h2>
      <table className="table w-full">
        <thead>
          <tr className="bg-base-200">
            <th>#</th>
            <th>Donation Title</th>
            <th>Charity Name</th>
            <th>Email</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req, index) => (
            <tr key={req._id}>
              <td>{index + 1}</td>
              <td>{req.donationTitle}</td>
              <td>{req.charityName}</td>
              <td>{req.charityEmail}</td>
              <td>{req.requestDescription}</td>
              <td>
                <button
                  onClick={() => handleDelete(req._id)}
                  className="btn btn-sm btn-error text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageRequests;
