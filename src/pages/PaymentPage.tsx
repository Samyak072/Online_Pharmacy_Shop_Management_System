import React from 'react';

interface CartItem {
  medicineId: string;
  medicine: {
    name: string;
    price: number;
  };
  quantity: number;
}

interface PaymentPageProps {
  cartItems: CartItem[];
  total: number;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ cartItems, total }) => {
  const handlePayment = () => {
    alert('Payment processed successfully!'); // Replace this with real payment processing logic
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Payment Page</h2>

      {/* Bill Summary */}
      <div>
        <h3 className="text-lg font-medium text-gray-600 mb-4">Bill Summary</h3>
        <ul className="divide-y divide-gray-200">
          {cartItems.map((item) => (
            <li key={item.medicineId} className="flex justify-between py-4">
              <div>
                <p className="font-medium">{item.medicine.name}</p>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              </div>
              <p className="font-medium">${(item.medicine.price * item.quantity).toFixed(2)}</p>
            </li>
          ))}
        </ul>
        <div className="flex justify-between py-4 border-t mt-4">
          <span className="font-semibold text-lg">Total:</span>
          <span className="font-semibold text-lg">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment Options */}
      <div>
        <h3 className="text-lg font-medium text-gray-600 mb-4">Choose a Payment Method</h3>
        <form className="space-y-4">
          <div>
            <input
              type="radio"
              id="creditCard"
              name="paymentMethod"
              className="mr-2"
            />
            <label htmlFor="creditCard" className="text-gray-700">
              Credit/Debit Card
            </label>
          </div>
          <div>
            <input type="radio" id="upi" name="paymentMethod" className="mr-2" />
            <label htmlFor="upi" className="text-gray-700">UPI</label>
          </div>
          <div>
            <input type="radio" id="cashOnDelivery" name="paymentMethod" className="mr-2" />
            <label htmlFor="cashOnDelivery" className="text-gray-700">Cash on Delivery</label>
          </div>
        </form>
      </div>

      {/* Download Bill */}
      <button
        onClick={() => {
          const billDetails = cartItems.map(
            (item) =>
              `${item.medicine.name} - Quantity: ${item.quantity} - $${(
                item.medicine.price * item.quantity
              ).toFixed(2)}`
          );
          const billText = `Bill Summary:\n${billDetails.join('\n')}\nTotal: $${total.toFixed(2)}`;
          const blob = new Blob([billText], { type: 'text/plain;charset=utf-8' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'Bill_Summary.txt';
          link.click();
        }}
        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
      >
        Download Bill
      </button>

      {/* Proceed Payment */}
      <button
        onClick={handlePayment}
        className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600"
      >
        Confirm Payment
      </button>
    </div>
  );
};

export default PaymentPage;
