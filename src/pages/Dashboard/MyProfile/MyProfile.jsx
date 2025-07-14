import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../../../provider/Authprovider'; 
import useAxiosSecure from '../../../hooks/useAxiosSecure'; 

const MyProfile = () => {
  const { user } = useContext(AuthContext); 
  const axiosSecure = useAxiosSecure();

  
  const { data: userInfo = {}, isLoading } = useQuery({
    queryKey: ['user-info', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const emailEncoded = encodeURIComponent(user.email);
      const res = await axiosSecure.get(`/users/${emailEncoded}`);
      return res.data;
    },
  });

  if (isLoading) return <span className="loading loading-spinner text-center text-primary"></span>;

  return (
    <div className="max-w-md mx-auto bg-base-200 p-6 rounded-xl shadow-lg mt-8 text-center">
      <div className="avatar mb-4">
        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mx-auto">
          <img src={user?.photoURL || 'https://i.ibb.co/tYTCvYt/default-user.png'} alt="Profile" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-primary mb-2">{user?.displayName || 'Anonymous'}</h2>
      <p className="text-base text-neutral">{user?.email}</p>

     
      {userInfo.role && userInfo.role !== 'user' && (
        <div className="mt-3">
          <span className="badge badge-info capitalize">Role: {userInfo.role}</span>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
