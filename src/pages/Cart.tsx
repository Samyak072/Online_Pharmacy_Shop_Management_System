import React from 'react';
import { useCartStore } from '../store/cartStore';
import { useNavigate } from 'react-router-dom'; // Assuming React Router is used for navigation
import { Trash2 } from 'lucide-react';

export default function Cart() {
  const { items, removeItem, updateQuantity, total } = useCartStore();
  const navigate = useNavigate(); // For navigation to the payment page

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <p className="text-gray-600">Add some medicines to your cart to see them here.</p>
      </div>
    );
  }

  // Function to handle the proceed to checkout
  const handleCheckout = () => {
    // Redirect to a payment page
    navigate('/payment');
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Shopping Cart</h2>
      <div className="bg-white rounded-xl shadow-sm">
        {items.map((item) => (
          <div key={item.medicineId} className="flex items-center p-6 border-b last:border-b-0">
            <img
              src={item.medicine.image}
              alt={item.medicine.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex-1 ml-6">
              <h3 className="text-lg font-semibold">{item.medicine.name}</h3>
              <p className="text-gray-600">${item.medicine.price}</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={item.quantity}
                onChange={(e) => updateQuantity(item.medicineId, Number(e.target.value))}
                className="px-3 py-2 border rounded-lg"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              <button
                onClick={() => removeItem(item.medicineId)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
        <div className="p-6 bg-gray-50 rounded-b-xl">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-2xl font-bold">${total.toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full mt-4 bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
