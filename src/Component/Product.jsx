import { useState, useEffect } from 'react'
function Product({ category, search }) {
    const [products, setProducts] = useState([])
    const fetchProducts = async () => {
        const response = await fetch('https://fakestoreapi.com/products')
        const data = await response.json()
        setProducts(data)
    }
    const filterProduct = products.filter(product => {
        const matchsCategory = (category ? product.category === category : true)
        const matchesSearch = (product.title.toLowerCase().includes(search.toLowerCase()))
        return matchsCategory && matchesSearch
    })
    useEffect(() => {
        fetchProducts()
    }, [category, search])
    return (
        <div>
            <h1 className="text-3xl font-bold text-center">Products</h1>
                {filterProduct.length == 0
                    ? <div className=' w-full text-2xl font-bold text-center mt-10'>No Product Found</div>

                    :
                    <div className="grid grid-cols-3 gap-4 pb-10">
                        {filterProduct.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
                    </div>
                }
        </div>
    )
}

export { Product }

function ProductCard({ product }) {
    return (
        <div className="border-2 border-gray-300 rounded-md p-4 text-start">
            <figure className='h-48 flex items-center justify-center'>
            <img src={product.image} alt={product.title} className="h-48 object-cover flex items-center justify-center" />
            </figure>
            <h2 className='truncate'><span className='font-bold'>Product Name: </span>{product.title}</h2>
            <p><span className='font-bold'>Category: </span>{product.category}</p>
            <p><span className='font-bold'>Price: </span>{product.price}</p>
        </div>
    )
}