import { useForm } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../../provider/Authprovider';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import axios from 'axios';

const imgbb_api_key = import.meta.env.VITE_IMAGE_UPLOAD_KEY;

const UpdateDonation = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();

  // Fetch existing donation data
  const { data: donation, isLoading } = useQuery({
    queryKey: ['donation', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Prefill form fields once donation is loaded
  useEffect(() => {
    if (donation) {
      reset({
        title: donation.title,
        foodType: donation.foodType,
        quantity: donation.quantity,
        pickupTime: donation.pickupTime,
        location: donation.location,
        // image is not prefilled because it's a file input
      });
    }
  }, [donation, reset]);

  const onSubmit = async (data) => {
    try {
      let imageUrl = donation.image;

      // If a new image is uploaded
      if (data.image && data.image.length > 0) {
        const formData = new FormData();
        formData.append('image', data.image[0]);

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgbb_api_key}`,
          formData
        );

        imageUrl = res.data.data.display_url;
      }

      const updatedDonation = {
        title: data.title,
        foodType: data.foodType,
        quantity: data.quantity,
        pickupTime: data.pickupTime,
        restaurantName: user.displayName,
        restaurantEmail: user.email,
        location: data.location,
        image: imageUrl,
      };

      const res = await axiosSecure.patch(`/donations/${id}`, updatedDonation);
      if (res.data.modifiedCount > 0) {
        Swal.fire('Updated!', 'Donation updated successfully!', 'success');
        navigate('/dashboard/my-donations');
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to update donation', 'error');
    }
  };

  if (isLoading) return <span className="loading loading-spinner text-primary"></span>;

  return (
    <div className="max-w-2xl mx-auto bg-base-200 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-primary mb-6">Update Donation</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register('title')}
          type="text"
          placeholder="Donation Title"
          className="input input-bordered w-full"
          required
        />

        <input
          {...register('foodType')}
          type="text"
          placeholder="Food Type (e.g., Bakery, Produce)"
          className="input input-bordered w-full"
          required
        />

        <input
          {...register('quantity')}
          type="text"
          placeholder="Quantity (e.g., 5kg, 10 portions)"
          className="input input-bordered w-full"
          required
        />

        <input
          {...register('pickupTime')}
          type="text"
          placeholder="Pickup Time (e.g., 3PM - 5PM)"
          className="input input-bordered w-full"
          required
        />

        <input
          type="text"
          value={user?.displayName}
          className="input input-bordered w-full"
          readOnly
        />
        <input
          type="text"
          value={user?.email}
          className="input input-bordered w-full"
          readOnly
        />

        <input
          {...register('location')}
          type="text"
          placeholder="Location (address or coordinates)"
          className="input input-bordered w-full"
          required
        />

        <input
          {...register('image')}
          type="file"
          className="file-input file-input-bordered w-full"
          accept="image/*"
        />

        <button type="submit" className="btn btn-primary w-full">
          Update Donation
        </button>
      </form>
    </div>
  );
};

export default UpdateDonation;
