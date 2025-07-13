
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation } from '@tanstack/react-query';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../../provider/Authprovider';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const RequestCharity = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const stripe = useStripe();
  const elements = useElements();

  const { register, handleSubmit, reset } = useForm();

  // 1. Check if user already has pending or approved request
  const { data: existingRequest, isLoading } = useQuery({
    queryKey: ['charity-request', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/charity-requests?email=${user.email}`);
      return res.data; // null if no request
    },
  });

  // 2. Create payment intent function
  const createPaymentIntent = async () => {
    const res = await axiosSecure.post('/create-payment-intent', { amount: 2500 }); // 25 USD in cents
    return res.data.clientSecret;
  };

  // 3. Mutation for submitting the request after payment
  const mutation = useMutation({
    mutationFn: async (formData) => {
      if (!stripe || !elements) throw new Error('Stripe has not loaded yet.');

      const clientSecret = await createPaymentIntent();

      const card = elements.getElement(CardElement);
      if (!card) throw new Error('Card Element not found.');

      // Create payment method
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card,
        billing_details: { email: user.email },
      });
      if (paymentMethodError) throw paymentMethodError;

      // Confirm card payment
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });
      if (confirmError) throw confirmError;

      // Send charity role request to backend
      const res = await axiosSecure.post('/charity-requests', {
        email: user.email,
        name: user.displayName,
        organizationName: formData.organization,
        mission: formData.mission,
        transactionId: paymentIntent.id,
        amount: 2500,
      });

      return res.data;
    },
    onSuccess: () => {
      Swal.fire('Success!', 'Charity role request sent!', 'success');
      reset();
    },
    onError: (error) => {
      Swal.fire('Error', error.response?.data?.message || error.message, 'error');
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  if (isLoading) return <p>Loading...</p>;

  // Disable form if request already pending or approved
  const isDisabled = existingRequest && (existingRequest.status === 'Pending' || existingRequest.status === 'Approved');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-base-200 p-6 rounded-lg space-y-4">
      <h2 className="text-xl font-bold text-center">Request Charity Role</h2>

      <input className="input input-bordered w-full" value={user?.displayName || ''} readOnly />
      <input className="input input-bordered w-full" value={user?.email || ''} readOnly />

      <input
        className="input input-bordered w-full"
        placeholder="Organization Name"
        {...register('organization')}
        required
        disabled={isDisabled}
      />
      <textarea
        className="textarea textarea-bordered w-full"
        placeholder="Mission Statement"
        {...register('mission')}
        required
        disabled={isDisabled}
      />

      <div className="p-3 bg-white rounded border">
        <CardElement options={{ hidePostalCode: true }} />
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={!stripe || !elements || mutation.isLoading || isDisabled}
      >
        {isDisabled
          ? existingRequest.status === 'Pending'
            ? 'Request Pending'
            : 'Request Approved'
          : mutation.isLoading
          ? 'Processing...'
          : 'Pay $25 & Request Role'}
      </button>
    </form>
  );
};

export default RequestCharity;
