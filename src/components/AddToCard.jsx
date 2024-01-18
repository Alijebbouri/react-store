import React from 'react';

function AddToCard({ cartItems }) {
  return (
    <div className="py-4  m-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Items in Cart</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Price
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cartItems && cartItems.length > 0 ? (
              Array.from(new Set(cartItems.map((item) => item.title))).map((title) => {
                const itemsWithSameTitle = cartItems.filter((item) => item.title === title);
                const totalPrice = itemsWithSameTitle.reduce((acc, item) => acc + item.price, 0);
                return (
                  <tr key={title}>
                    <td className="px-6 py-4 whitespace-nowrap">{title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${itemsWithSameTitle[0].price}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${totalPrice}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-4 whitespace-nowrap text-gray-500 text-center">
                  No items in the cart
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AddToCard;