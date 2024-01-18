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
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center md:flex md:justify-between md:items-center mb-4">
                <div className="mb-4 sm:mb-0 md:w-auto">
                    <select value={selectedCategory} onChange={handleCategoryChange} className="w-full px-4 py-2 rounded-lg border border-gray-300">
                        <option value="all">All</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="w-full sm:w-auto ">
                    <input name="search" placeholder="Type here to search" value={searchTerm} onChange={handleSearch} className="w-full px-4 py-2 rounded-lg border border-gray-300"/>
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
