import axios from 'axios';
import { getAuthHeader } from '../utils/auth';


const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface OrderItem {
  product: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Order {
  _id?: string;
  user?: string;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid?: boolean;
  paidAt?: Date;
  isDelivered?: boolean;
  deliveredAt?: Date;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PaymentResult {
  id: string;
  status: string;
  update_time: string;
  email_address?: string;
}

// Create a new order
export const createOrder = async (orderData: Order): Promise<Order> => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    }
  };

  const { data } = await axios.post<Order>(`${API_URL}/orders`, orderData, config);
  return data;
};

// Get logged in user's orders
export const getUserOrders = async (): Promise<Order[]> => {
  const config = {
    headers: getAuthHeader()
  };

  const { data } = await axios.get<Order[]>(`${API_URL}/orders`, config);
  return data;
};

// Get order by ID
export const getOrderById = async (id: string): Promise<Order> => {
  const config = {
    headers: getAuthHeader()
  };

  const { data } = await axios.get<Order>(`${API_URL}/orders/${id}`, config);
  return data;
};

// Update order to paid (generic payment)
export const updateOrderToPaid = async (orderId: string, paymentResult: PaymentResult): Promise<Order> => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    }
  };

  const { data } = await axios.post<Order>(`${API_URL}/orders/${orderId}/pay`, paymentResult, config);
  return data;
};

// Initiate PayPal payment
export const initiatePaypalPayment = async (orderId: string): Promise<{ approvalUrl: string }> => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    }
  };

  const { data } = await axios.post<{ approvalUrl: string }>(`${API_URL}/orders/${orderId}/paypal`, {}, config);
  return data;
};

// Cancel order
export const cancelOrder = async (orderId: string): Promise<Order> => {
  const config = {
    headers: getAuthHeader()
  };

  const { data } = await axios.put<Order>(`${API_URL}/orders/${orderId}/cancel`, {}, config);
  return data;
};

// Admin: Get all orders
export const getAllOrders = async (): Promise<Order[]> => {
  const config = {
    headers: getAuthHeader()
  };

  const { data } = await axios.get<Order[]>(`${API_URL}/orders/admin/all`, config);
  return data;
};

// Admin: Update order status
export const updateOrderStatus = async (orderId: string, status: string): Promise<Order> => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    }
  };

  const { data } = await axios.put<Order>(`${API_URL}/orders/${orderId}/status`, { status }, config);
  return data;
};