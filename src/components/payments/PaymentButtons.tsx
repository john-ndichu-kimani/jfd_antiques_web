import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { initiatePaypalPayment, updateOrderToPaid } from '../../lib/services/order_services';

interface PaymentButtonsProps {
  orderId: string;
  onSuccess: () => void;
  isPaid: boolean;
}

const PaymentButtons: React.FC<PaymentButtonsProps> = ({ orderId, onSuccess, isPaid }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handlePayPalPayment = async () => {
    try {
      setLoading(true);
      setError(null);
      const { approvalUrl } = await initiatePaypalPayment(orderId);
      window.location.href = approvalUrl;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to initiate PayPal payment');
      console.error('PayPal payment error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDirectPayment = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock payment result - in a real app, this would come from a payment gateway
      const paymentResult = {
        id: 'direct-' + Date.now(),
        status: 'COMPLETED',
        update_time: new Date().toISOString(),
        email_address: 'customer@example.com'
      };
      
      await updateOrderToPaid(orderId, paymentResult);
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to process payment');
      console.error('Direct payment error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (isPaid) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-md p-3 text-green-700">
        This order has been paid
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Payment Options</h2>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <div className="space-y-4">
        <button
          onClick={handlePayPalPayment}
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded flex items-center justify-center"
        >
          {loading ? 'Processing...' : 'Pay with PayPal'}
        </button>
        
        <button
          onClick={handleDirectPayment}
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded flex items-center justify-center"
        >
          {loading ? 'Processing...' : 'Pay with Credit Card'}
        </button>
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        <p>Your payment information is processed securely. We do not store your credit card details.</p>
      </div>
    </div>
  );
};

export default PaymentButtons;