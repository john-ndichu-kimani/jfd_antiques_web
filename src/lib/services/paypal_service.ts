import axios from 'axios';
import { getAuthHeader } from '../utils/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface PayPalPaymentResponse {
  approvalUrl: string;
  paymentId: string;
}

// Handle PayPal payment confirmation callback
export const handlePaypalConfirmation = async (paymentId: string, PayerID: string): Promise<any> => {
  const { data } = await axios.get(`${API_URL}/orders/confirm?paymentId=${paymentId}&PayerID=${PayerID}`);
  return data;
};

// Get status of PayPal payment
export const getPayPalPaymentStatus = async (orderId: string): Promise<any> => {
  const config = {
    headers: getAuthHeader()
  };

  const { data } = await axios.get(`${API_URL}/orders/${orderId}/paypal/status`, config);
  return data;
};