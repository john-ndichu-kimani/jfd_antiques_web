import React from 'react';
import { Order } from '../../lib/services/order_services';
import Link from 'next/link';
import Image from 'next/image';

interface OrderSummaryProps {
  order: Order;
  showDetailLink?: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ order, showDetailLink = true }) => {
  return (
    <div className="border rounded-lg p-4 mb-4 bg-white shadow-sm">
      <div className="flex justify-between mb-4">
        <div>
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-medium">{order._id}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Date</p>
          <p className="font-medium">
            {order.createdAt && new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total</p>
          <p className="font-medium">${order.totalPrice.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Status</p>
          <p className={`font-medium ${getStatusColor(order)}`}>
            {getOrderStatus(order)}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Items</h3>
        <div className="space-y-2">
          {order.orderItems.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              {item.image && (
                <div className="h-10 w-10 relative">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill
                    sizes="40px"
                    className="object-cover rounded"
                  />
                </div>
              )}
              <div className="flex-1">
                <p className="font-medium truncate">{item.name}</p>
              </div>
              <div>
                <p className="text-sm">{item.quantity} x ${item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showDetailLink && (
        <div className="text-right">
          <Link href={`/orders/${order._id}`} 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded text-sm">
            View Details
          </Link>
        </div>
      )}
    </div>
  );
};

// Helper function to determine order status for display
const getOrderStatus = (order: Order): string => {
  if (order.status === 'CANCELLED') return 'Cancelled';
  if (order.isDelivered) return 'Delivered';
  if (order.isPaid) return 'Paid';
  return 'Processing';
};

// Helper function to determine the color for the status
const getStatusColor = (order: Order): string => {
  if (order.status === 'CANCELLED') return 'text-red-600';
  if (order.isDelivered) return 'text-green-600';
  if (order.isPaid) return 'text-blue-600';
  return 'text-yellow-600';
};

export default OrderSummary;