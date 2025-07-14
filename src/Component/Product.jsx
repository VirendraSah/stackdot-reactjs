import { useState, useEffect } from 'react'
function Product({ category, search }) {
    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const perPageItems = 5;

    // Fetch product from API
    const fetchProducts = async () => {
        const response = await fetch('https://fakestoreapi.com/products')
        const data = await response.json()
        setProducts(data)
    }
    // Category & Search Logic
    const filterProduct = products.filter(product => {
        const matchsCategory = (category ? product.category === category : true)
        const matchesSearch = (product.title.toLowerCase().includes(search.toLowerCase()))
        return matchsCategory && matchesSearch
    })

    // Pagination Logic
    const totalPages = Math.ceil(filterProduct.length / perPageItems)
    const PaginationProduct = filterProduct.slice((currentPage - 1) * perPageItems, currentPage * perPageItems)

    // jump Page
    const onSubmitNextPage = (i) => {
        setCurrentPage(i + 1)
    }

    useEffect(() => {
        fetchProducts()
    }, [category, search])

    return (
        <>
            <div className='pb-10'>
                <h1 className="text-3xl font-bold text-center">Products</h1>
                {PaginationProduct.length == 0
                    ? <div className=' w-full text-2xl font-bold text-center mt-10'>No Product Found</div>
                    : <div className="grid grid-cols-3 gap-4 pb-10">
                        {PaginationProduct.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
                    </div>
                }
            </div>
            <div className='w-full flex items-center justify-center gap-3 mb-5'>
                {
                    [...Array(totalPages)].map((e, i) => (
                        <button key={i} className='border py-2 px-3' onClick={() => onSubmitNextPage(i)}>{i + 1}</button>
                    ))
                }
            </div>
        </>
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