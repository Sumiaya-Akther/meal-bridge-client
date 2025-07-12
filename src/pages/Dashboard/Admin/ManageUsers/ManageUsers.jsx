import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { AuthContext } from '../../../../provider/Authprovider';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user: loggedInUser } = useContext(AuthContext);

  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ['all-users'],
    enabled: !!loggedInUser?.email,
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  const handleMakeRole = async (id, role) => {
    try {
      const res = await axiosSecure.patch(`/users/${id}/role`, { role });
      if (res.data.result?.modifiedCount > 0) {
        refetch();
        Swal.fire({
          icon: 'success',
          title: 'Role Updated!',
          text: `User is now ${role}.`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      Swal.fire('Error', 'Failed to update role', 'error');
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This user will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/users/${id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'User has been removed.',
            timer: 1500,
            showConfirmButton: false,
          });
        }
      }
    });
  };

  if (isLoading) return <span className="loading loading-spinner text-primary"></span>;

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-primary">Manage Users</h2>
      <div className="overflow-x-auto bg-base-200 p-4 rounded-xl shadow-md">
        <table className="table table-zebra w-full">
          <thead className="bg-primary text-primary-content">
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center" colSpan={3}>Assign Role</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center text-error font-semibold">
                  No users found
                </td>
              </tr>
            )}
            {users.map((user, idx) => {
              const isSelf = user.email === loggedInUser?.email;
              return (
                <tr key={user._id} className="hover:bg-base-100">
                  <td>{idx + 1}</td>
                  <td>{user.name || 'N/A'}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className="badge badge-outline badge-info capitalize">
                      {user.role || 'user'}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleMakeRole(user._id, 'admin')}
                      disabled={user.role === 'admin' || isSelf}
                      className="btn btn-xs btn-primary"
                    >
                      Admin
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleMakeRole(user._id, 'restaurant')}
                      disabled={user.role === 'restaurant' || isSelf}
                      className="btn btn-xs btn-accent"
                    >
                      Restaurant
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleMakeRole(user._id, 'charity')}
                      disabled={user.role === 'charity' || isSelf}
                      className="btn btn-xs btn-warning text-white"
                    >
                      Charity
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(user._id)}
                      disabled={isSelf}
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
