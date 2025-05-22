import React from 'react';
import { Order } from '../../lib/services/order_services';
import Image from 'next/image';

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  return (
    <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Order #{order._id}</h2>
        <div className="flex flex-wrap gap-6">
          <div className="flex-1 min-w-[250px]">
            <h3 className="font-semibold text-gray-700 mb-2">Shipping Information</h3>
            <div className="text-gray-600">
              <p>{order.shippingAddress.address}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
              <p>{order.shippingAddress.country}</p>
            </div>
            <div className="mt-2">
              <p className="text-sm">
                Status:{' '}
                <span className={`font-semibold ${order.isDelivered ? 'text-green-600' : 'text-yellow-600'}`}>
                  {order.isDelivered ? `Delivered on ${new Date(order.deliveredAt!).toLocaleDateString()}` : 'Not Delivered'}
                </span>
              </p>
            </div>
          </div>
          
          <div className="flex-1 min-w-[250px]">
            <h3 className="font-semibold text-gray-700 mb-2">Payment Method</h3>
            <p className="text-gray-600">{order.paymentMethod}</p>
            <div className="mt-2">
              <p className="text-sm">
                Status:{' '}
                <span className={`font-semibold ${order.isPaid ? 'text-green-600' : 'text-yellow-600'}`}>
                  {order.isPaid ? `Paid on ${new Date(order.paidAt!).toLocaleDateString()}` : 'Not Paid'}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">Order Items</h3>
        <div className="border rounded-md overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4 text-right">Price</th>
                <th className="py-3 px-4 text-right">Quantity</th>
                <th className="py-3 px-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {order.orderItems.map((item, index) => (
                <tr key={index}>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      {item.image && (
                        <div className="h-12 w-12 relative">
                          <Image 
                            src={item.image} 
                            alt={item.name} 
                            fill
                            sizes="48px"
                            className="object-cover rounded"
                          />
                        </div>
                      )}
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">${item.price.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right">{item.quantity}</td>
                  <td className="py-3 px-4 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="font-semibold text-gray-700 mb-3">Order Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Items</span>
            <span>${order.itemsPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${order.shippingPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${order.taxPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold pt-2 border-t">
            <span>Total</span>
            <span>${order.totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;