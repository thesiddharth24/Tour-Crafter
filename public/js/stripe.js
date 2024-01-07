/* eslint-disable */
import axios from 'axios';

import { showAlert } from './alert.js';
const stripe = Stripe(
  'pk_test_51OVvJMSI7X1kncihnBFQ2wZ2etb0qNkTQ4rpSKRMtpuPeABJTfrfHuiq0FoKYk0r1B7L1BnXpBjy8m1ceIpj6etA00bRjzVX3k'
);

export const bookTour = async (tourId) => {
  try {
    const session = await axios({
      method: 'GET',
      url: `/api/v1/bookings/checkout-session/${tourId}`,
      withCredentials: true,
    });

    console.log(session);

    // window.setTimeout(() => {
    //   location.assign(session.data.session.url);
    // }, 1500);

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};
