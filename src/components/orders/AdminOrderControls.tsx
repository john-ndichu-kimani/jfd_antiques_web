import React, { useState } from 'react';
import { Order, updateOrderStatus } from '../../lib/services/order_services';

interface AdminOrderControlsProps {
  order: Order;
  onOrderUpdated: (updatedOrder: Order) => void;
}

const AdminOrderControls: React.FC<AdminOrderControlsProps> = ({ order, onOrderUpdated }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState(order.status || '');

  const statuses = ['PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  };

  const handleUpdateStatus = async () => {
    if (!selectedStatus || selectedStatus === order.status) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const updatedOrder = await updateOrderStatus(order._id!, selectedStatus);
      onOrderUpdated(updatedOrder);
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update order status');
      console.error('Update status error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsDelivered = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const updatedOrder = await updateOrderStatus(order._id!, 'DELIVERED');
      onOrderUpdated(updatedOrder);
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to mark order as delivered');
      console.error('Mark as delivered error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Admin Controls</h2>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Update Order Status</label>
        <div className="flex space-x-2">
          <select
            value={selectedStatus}
            onChange={handleStatusChange}
            className="flex-1 border rounded-md px-3 py-2"
            disabled={loading}
          >
            <option value="" disabled>Select status</option>
            {statuses.map(status => (
              <option key={status} value={status}>
                {status.charAt(0) + status.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
          <button
            onClick={handleUpdateStatus}
            disabled={loading || !selectedStatus || selectedStatus === order.status}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
      
      {!order.isDelivered && (
        <div>
          <button
            onClick={handleMarkAsDelivered}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
          >
            {loading ? 'Processing...' : 'Mark as Delivered'}
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminOrderControls;