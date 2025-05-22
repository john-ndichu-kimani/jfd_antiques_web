import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCart, CartItem } from '@/contexts/CartContext';
import { createOrder, updateOrderToPaid } from '@/lib/services/order_services';

interface ShippingInfo {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

interface PaymentInfo {
  method: 'paypal' | 'card';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardholderName?: string;
}

// PayPal payment interface
interface PaymentRequest {
  amount: number;
  currency: string;
  return_url: string;
  cancel_url: string;
}

interface PaymentResponse {
  approval_url: string;
  return_url?: string;
}

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const { cartItems, totalPrice, clearCart } = useCart();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: ''
  });
  
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    method: 'paypal'
  });

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      router.push('/cart');
    }
  }, [cartItems, router]);

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateShippingInfo()) {
      setCurrentStep(2);
    }
  };

  const validateShippingInfo = (): boolean => {
    const required = ['fullName', 'address', 'city', 'postalCode', 'country', 'phone'];
    for (const field of required) {
      if (!shippingInfo[field as keyof ShippingInfo]) {
        setError(`${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`);
        return false;
      }
    }
    setError(null);
    return true;
  };

  const validatePaymentInfo = (): boolean => {
    if (paymentInfo.method === 'card') {
      const required = ['cardNumber', 'expiryDate', 'cvv', 'cardholderName'];
      for (const field of required) {
        if (!paymentInfo[field as keyof PaymentInfo]) {
          setError(`${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`);
          return false;
        }
      }
    }
    setError(null);
    return true;
  };

  // Placeholder function for PayPal integration
  const initiatePayment = async (orderId: string, paymentData: PaymentRequest): Promise<PaymentResponse> => {
    // This would integrate with your actual PayPal API
    // For now, return a mock response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          approval_url: `https://www.sandbox.paypal.com/checkoutnow?token=mock_token_${orderId}`,
          return_url: paymentData.return_url
        });
      }, 1000);
    });
  };

  const calculateShippingPrice = (subtotal: number): number => {
    return subtotal > 100 ? 0 : 10;
  };

  const calculateTaxPrice = (subtotal: number): number => {
    return subtotal * 0.1; // 10% tax
  };

  const calculateTotalPrice = (subtotal: number): number => {
    return subtotal + calculateTaxPrice(subtotal) + calculateShippingPrice(subtotal);
  };

  // const handleCreateOrder = async () => {
  //   if (!validatePaymentInfo()) return;

  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const taxPrice = calculateTaxPrice(totalPrice);
  //     const shippingPrice = calculateShippingPrice(totalPrice);
  //     const finalTotal = calculateTotalPrice(totalPrice);

  //     const orderData = {
  //       orderItems: cartItems.map((item: CartItem) => ({
  //         product: item.productId,
  //         quantity: item.quantity,
  //         name,
  //         image:item.product.imageUrl,
  //         price: item.price,
  //       })),
  //       shippingAddress: shippingInfo,
  //       paymentMethod: paymentInfo.method,
  //       totalPrice: finalTotal,
  //       taxPrice: taxPrice,
  //       shippingPrice: shippingPrice,
  //     };

  //     // const order = await createOrder(orderData);
      
  //     if (paymentInfo.method === 'paypal') {
  //       // Initiate PayPal payment
  //       const paypalResponse = await initiatePayment(order._id, {
  //         amount: finalTotal,
  //         currency: 'USD',
  //         return_url: `${window.location.origin}/orders/paypal/confirm`,
  //         cancel_url: `${window.location.origin}/orders/paypal/cancel`
  //       });
        
  //       if (paypalResponse.approval_url) {
  //         // Redirect to PayPal for payment
  //         window.location.href = paypalResponse.approval_url;
  //       }
  //     } else {
  //       // Handle card payment here (integrate with your card processor)
  //       // For demonstration, we'll simulate a successful payment
  //       const mockPaymentResult = {
  //         paymentId: `card_payment_${Date.now()}`,
  //         status: 'COMPLETED',
  //         update_time: new Date().toISOString()
  //       };
        
  //       // In a real application, you would process the payment with your payment processor
  //       // and only mark as paid if the payment is successful
  //       await updateOrderToPaid(order._id, mockPaymentResult);
        
  //       clearCart();
  //       router.push(`/orders/${order._id}`);
  //     }
  //   } catch (err: any) {
  //     setError(err.message || 'Failed to create order');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    section: 'shipping' | 'payment'
  ) => {
    const { name, value } = e.target;
    
    if (section === 'shipping') {
      setShippingInfo(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      setPaymentInfo(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300'
        }`}>
          1
        </div>
        <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300'
        }`}>
          2
        </div>
        <div className={`w-16 h-1 ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-300'
        }`}>
          3
        </div>
      </div>
    </div>
  );

  const renderShippingForm = () => (
    <form onSubmit={handleShippingSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={shippingInfo.fullName}
          onChange={(e) => handleInputChange(e, 'shipping')}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={shippingInfo.phone}
          onChange={(e) => handleInputChange(e, 'shipping')}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <input
        type="text"
        name="address"
        placeholder="Street Address"
        value={shippingInfo.address}
        onChange={(e) => handleInputChange(e, 'shipping')}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          name="city"
          placeholder="City"
          value={shippingInfo.city}
          onChange={(e) => handleInputChange(e, 'shipping')}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        
        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={shippingInfo.postalCode}
          onChange={(e) => handleInputChange(e, 'shipping')}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        
        <select
          name="country"
          value={shippingInfo.country}
          onChange={(e) => handleInputChange(e, 'shipping')}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Country</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="UK">United Kingdom</option>
          <option value="AU">Australia</option>
          <option value="DE">Germany</option>
          <option value="FR">France</option>
        </select>
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue to Payment
      </button>
    </form>
  );

  const renderPaymentForm = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Method
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="method"
                value="paypal"
                checked={paymentInfo.method === 'paypal'}
                onChange={(e) => handleInputChange(e, 'payment')}
                className="mr-2"
              />
              PayPal
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="method"
                value="card"
                checked={paymentInfo.method === 'card'}
                onChange={(e) => handleInputChange(e, 'payment')}
                className="mr-2"
              />
              Credit/Debit Card
            </label>
          </div>
        </div>

        {paymentInfo.method === 'card' && (
          <div className="space-y-4">
            <input
              type="text"
              name="cardholderName"
              placeholder="Cardholder Name"
              value={paymentInfo.cardholderName || ''}
              onChange={(e) => handleInputChange(e, 'payment')}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={paymentInfo.cardNumber || ''}
              onChange={(e) => handleInputChange(e, 'payment')}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              maxLength={19}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                value={paymentInfo.expiryDate || ''}
                onChange={(e) => handleInputChange(e, 'payment')}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                maxLength={5}
              />
              
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={paymentInfo.cvv || ''}
                onChange={(e) => handleInputChange(e, 'payment')}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                maxLength={4}
              />
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => setCurrentStep(1)}
          disabled={loading}
          className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back to Shipping
        </button>
        
        <button
          type="button"
          onClick={() => setCurrentStep(3)}
          disabled={loading}
          className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Review Order
        </button>
      </div>
    </div>
  );

  const renderOrderReview = () => {
    const taxPrice = calculateTaxPrice(totalPrice);
    const shippingPrice = calculateShippingPrice(totalPrice);
    const finalTotal = calculateTotalPrice(totalPrice);

    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold mb-4">Order Review</h3>
        
        {/* Order Summary */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h4 className="font-medium mb-3">Order Items</h4>
          {cartItems.map((item: CartItem, index: number) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
              <div>
                <span className="font-medium">{item.product.name}</span>
                <span className="text-gray-600 ml-2">x{item.quantity}</span>
              </div>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* Pricing Breakdown */}
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>${taxPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>${shippingPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t border-gray-300 pt-2">
              <span>Total:</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h4 className="font-medium mb-2">Shipping Address</h4>
          <div className="text-gray-700">
            <p>{shippingInfo.fullName}</p>
            <p>{shippingInfo.address}</p>
            <p>{shippingInfo.city}, {shippingInfo.postalCode}</p>
            <p>{shippingInfo.country}</p>
            <p>{shippingInfo.phone}</p>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h4 className="font-medium mb-2">Payment Method</h4>
          <p className="text-gray-700 capitalize">{paymentInfo.method}</p>
          {paymentInfo.method === 'card' && paymentInfo.cardNumber && (
            <p className="text-gray-600 text-sm">
              **** **** **** {paymentInfo.cardNumber.slice(-4)}
            </p>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setCurrentStep(2)}
            disabled={loading}
            className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back to Payment
          </button>
          
          <button
            type="button"
            // onClick={handleCreateOrder}
            disabled={loading}
            className="flex-1 bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </div>
    );
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-4">Add some items to your cart before proceeding to checkout.</p>
        <button
          onClick={() => router.push('/products')}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
      
      {renderStepIndicator()}
      
      <div className="bg-white rounded-lg shadow-md p-6">
        {currentStep === 1 && renderShippingForm()}
        {currentStep === 2 && renderPaymentForm()}
        {currentStep === 3 && renderOrderReview()}
      </div>
    </div>
  );
};

export default CheckoutPage;