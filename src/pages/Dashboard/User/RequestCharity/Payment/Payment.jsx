import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import RequestCharity from '../RequestCharity';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY)

const Payment = () => {
    return (
         <Elements stripe={stripePromise}>
        <RequestCharity></RequestCharity>
         </Elements>
    );
};

export default Payment;