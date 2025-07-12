import { useState, useEffect } from 'react'
function Product ({category}){
    console.log(category)
    const [products, setProducts] = useState([])
    const [filterproduct, setFilterproduct]= useState()
    const fetchProducts = async () => {
        const response = await fetch('https://fakestoreapi.com/products')
        const data = await response.json()
        setProducts(data)
    }
    // const (products.filter((item)=> item.category==category) 
    useEffect(() => {
        fetchProducts()
    }, [category])
    return(
        <div>
            <h1 className="text-3xl font-bold text-center">Products</h1>
            <div className="grid grid-cols-3 gap-4">
                {products.map((product, index) => (
                        <ProductCard key={index} product={product}/>
                    ))}
                
            </div>
        </div>
    )
}

export {Product}

function ProductCard({product}){
    return(
        <div className="border-2 border-gray-300 rounded-md p-4 text-start">
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover"/>
            <h2 className='truncate'><span className='font-bold'>Product Name: </span>{product.title}</h2>
            <p><span className='font-bold'>Category: </span>{product.category}</p>
            <p><span className='font-bold'>Price: </span>{product.price}</p>
        </div>
    )
}