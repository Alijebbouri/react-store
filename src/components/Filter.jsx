import React, { useEffect, useState } from 'react';
import ListProducts from './ListProducts';
import Loading from './Loading';
// import AddToCard from './AddToCard';

function Filter({addToCart}) {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading,setLoading] = useState(true);
    

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setFilteredProducts(data); 
                setLoading(false);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    if(loading){
        return (
            <Loading/>
        )
    }
    

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);

        if (category === 'all') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(item => item.category === category);
            setFilteredProducts(filtered);
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        const filtered = products.filter(
            (product) =>
                product.title.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const categories = [...new Set(products.map(item => item.category))];

    return (
        <div className='container mx-auto p-4'>
            <div className='flex justify-between items-center mb-4'>
                <div>
                    <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className='px-4 py-2 rounded-lg border border-gray-300'
                    >
                        <option value='all'>All</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <input
                        name='search'
                        placeholder='Type here to search'
                        value={searchTerm}
                        onChange={handleSearch}
                        className='px-4 py-2 rounded-lg border border-gray-300 '
                    />
                </div>
            </div>
            {filteredProducts.length === 0 ? (
                <p className='text-center'>No products found.</p>
            ) : (
                <>
                    <ListProducts products={filteredProducts} addToCart={addToCart}/>
                </>
            )}
        </div>
    );
}

export default Filter;
