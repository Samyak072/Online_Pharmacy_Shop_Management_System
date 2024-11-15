import React from 'react';
import { useAuthStore } from '../store/authStore';

const mockOrders = [
  {
    id: '1',
    date: '2024-03-15',
    status: 'completed',
    total: 45.97,
    items: [
      { name: 'Paracetamol 500mg', quantity: 2, price: 5.99 },
      { name: 'Vitamin C Syrup', quantity: 1, price: 12.99 },
    ]
  },
  {
    id: '2',
    date: '2024-03-10',
    status: 'processing',
    total: 24.99,
    items: [
      { name: 'Omega-3 Fish Oil', quantity: 1, price: 24.99 }
    ]
  }
];

export default function Orders() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold mb-4">Please login to view your orders</h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Your Orders</h2>
      <div className="space-y-6">
        {mockOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                  <p className="text-gray-600">{order.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm capitalize
                  ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {order.status}
                </span>
              </div>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.quantity}x {item.name}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 bg-gray-50">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total</span>
                <span className="text-lg font-bold">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}