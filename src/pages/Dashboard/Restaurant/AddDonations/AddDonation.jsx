import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { useMutation } from '@tanstack/react-query';
import { AuthContext } from '../../../../provider/Authprovider';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import axios from 'axios';

const imageHostingKey = import.meta.env.VITE_IMAGE_UPLOAD_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const AddDonation = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutateAsync: saveDonation } = useMutation({
    mutationFn: async (donationData) => {
      const res = await axiosSecure.post('/donations', donationData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire('Success!', 'Donation added successfully.', 'success');
      reset();
    },
    onError: () => {
      Swal.fire('Error', 'Failed to add donation', 'error');
    },
  });

  const onSubmit = async (data) => {
    setUploading(true);
    const imageFile = { image: data.image[0] };

    try {
      const imgRes = await axios.post(imageHostingApi, imageFile, {
        headers: { 'content-type': 'multipart/form-data' },
      });

      if (imgRes.data.success) {
        const donationData = {
          title: data.title,
          foodType: data.foodType,
          quantity: data.quantity,
          pickupTime: data.pickupTime,
          location: data.location,
          image: imgRes.data.data.display_url,
          restaurantName: user.displayName,
          restaurantEmail: user.email,
          status: 'Pending',
          created_at: new Date(),
        };

        await saveDonation(donationData);
      }
    } catch (err) {
      console.error('Image upload failed', err);
      Swal.fire('Error', 'Image upload failed', 'error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-base-200 p-8 rounded-xl mt-6">
      <h2 className="text-2xl font-bold mb-6 text-primary">Add Donation</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="Donation Title"
          {...register('title', { required: true })}
          className="input input-bordered w-full"
        />
        {errors.title && <span className="text-red-500">Title is required</span>}

        <input
          type="text"
          placeholder="Food Type (e.g., Bakery, Produce)"
          {...register('foodType', { required: true })}
          className="input input-bordered w-full"
        />
        {errors.foodType && <span className="text-red-500">Food type is required</span>}

        <input
          type="text"
          placeholder="Quantity (e.g., 10kg, 50 portions)"
          {...register('quantity', { required: true })}
          className="input input-bordered w-full"
        />
        {errors.quantity && <span className="text-red-500">Quantity is required</span>}

        <input
          type="text"
          placeholder="Pickup Time Window (e.g., 4PM-6PM)"
          {...register('pickupTime', { required: true })}
          className="input input-bordered w-full"
        />
        {errors.pickupTime && <span className="text-red-500">Pickup time is required</span>}

        <input
          type="text"
          placeholder="Location (e.g., address or coordinates)"
          {...register('location', { required: true })}
          className="input input-bordered w-full"
        />
        {errors.location && <span className="text-red-500">Location is required</span>}

        {/* Readonly user info */}
        <input
          type="text"
          value={user?.displayName || ''}
          readOnly
          className="input input-bordered w-full"
        />
        <input
          type="email"
          value={user?.email || ''}
          readOnly
          className="input input-bordered w-full"
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          {...register('image', { required: true })}
          className="file-input file-input-bordered w-full"
        />
        {errors.image && <span className="text-red-500">Image is required</span>}

        <button
          type="submit"
          className="btn btn-primary mt-4"
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Add Donation'}
        </button>
      </form>
    </div>
  );
};

export default AddDonation;
