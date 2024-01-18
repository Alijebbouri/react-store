// ListProducts.jsx
import React from 'react';

export default function ListProducts({ products , addToCart  }) {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {products.map((product, index) => (
                <div className='border rounded-lg overflow-hidden' key={index}>
                    <img
                        src={product.image}
                        alt={product.title}
                        className='w-max h-48 m-auto'
                    />
                    <div className='p-4'>
                        <h2 className='text-xl font-semibold mb-2'>{product.title}</h2>
                        <p className='text-gray-600 mb-4'>{product.category}</p>
                        <p className='text-lg font-semibold mb-2'>$ {product.price}</p>
                        <div className='flex items-center mb-2'>
                            <span className='text-yellow-500'>
                                {product.rating.rate} ★
                            </span>
                            <span className='text-gray-600 ml-2'>
                                ({product.rating.count} reviews)
                            </span>
                        </div>
                        <button className='bg-neutral-950 text-white py-2 px-4 rounded-md hover:bg-neutral-700' onClick={() => addToCart(product)}>
                            Add to Card
                        </button>
                        
                    </div>
                </div>
            ))}
        </div>
    );
}
