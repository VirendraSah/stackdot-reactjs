import { useState } from 'react'
import { Product } from './Component/product'
function App() {
  let [category, usecategory]=useState('All')

  const onsubmit=(e)=>{
    usecategory(e.target.value)
  }
  return (

    <div className='grid grid-cols-[15%_85%] px-5 mt-5 gap-3'>
      <div className='flex flex-col gap-5 '>
        <h3 className='text-2xl font-bold text-center'>filter</h3>
        <div>
          <select onChange={onsubmit} name="categoryfilter"  id="" className='w-full p-2 rounded-md border-2 border-gray-300'>
            <option value="all">All</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value="men's clothing">Men's Clothing</option>
          </select>
        </div>
      </div>
      <div className='w-full'>
        <Product category={category}/>
      </div> 
    </div>

  )
}

export default App
