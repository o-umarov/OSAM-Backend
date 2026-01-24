import React from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react';
import axios from 'axios';
import { backEndUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({token}) => {

const [image1, setImage1] = useState(false);
const [image2, setImage2] = useState(false);
const [image3, setImage3] = useState(false);
const [image4, setImage4] = useState(false);

const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [price, setPrice] = useState("");
const [category, setCategory] = useState("Men");
const [subCategory, setSubCategory] = useState("Topwear");
const [bestseller, setBestseller] = useState(false);
const [sizes, setSizes] = useState([]);

const onSubmitHandler = async (e)=>{
e.preventDefault();
try {
  const formData = new FormData()
  formData.append("name", name)
  formData.append("description", description)
  formData.append("price", price)
  formData.append("category", category)
  formData.append("subCategory", subCategory)
  formData.append("bestseller", bestseller)
  formData.append("sizes", JSON.stringify(sizes))

image1 && formData.append("image1",image1)
image2 && formData.append("image2",image2)
image3 && formData.append("image3",image3)
image4 && formData.append("image4",image4)

const response = await axios.post(backEndUrl + "/api/product/add", formData, {headers: {token}})
if (response.data.success) {
  toast.success(response.data.message)
  setName('')
  setDescription('')
  setImage1(false)
  setImage2(false)
  setImage3(false)
  setImage4(false)
  setPrice('')
} else{
  toast.error(response.data.message)
}
} catch (error) {
  console.log(error);
  toast.error(error.message);
}
}

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>UPLOAD IMAGE</p>
        <div className='flex gap-2'>
          <label htmlFor='image1'>
            <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input  onChange={(e)=>setImage1(e.target.files[0])} type='file' id='image1' hidden/>
          </label>
          <label htmlFor='image2'>
            <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
            <input  onChange={(e)=>setImage2(e.target.files[0])} type='file' id='image2' hidden/>
          </label>
          <label htmlFor='image3'>
            <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
            <input  onChange={(e)=>setImage3(e.target.files[0])} type='file' id='image3' hidden/>
          </label>
          <label htmlFor='image4'>
            <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e)=>setImage4(e.target.files[0])}  type='file' id='image4' hidden/>
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='product name' required/>
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <input onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder=' product content' required/>
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product category</p>
          <select onChange={(e)=>setCategory(e.target.value)} value={category} className='w-full px-3 py-2'>
            <option value="skincare">SKINCARE</option>
            <option value="makeup">MAKE UP</option>
            <option value="parfume">PARFUME</option>
          </select>
        </div>
        <div>
          <p className='mb-2'> Subcategory</p>
          <select onChange={(e)=>setSubCategory(e.target.value)} value={subCategory} className='w-full px-3 py-2'>
            <option value="face">FACE</option>
            <option value="body">BODY</option>
            <option value="hair">HAIR</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Product Price</p>
          <input onChange={(e)=>setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='$13' />
        </div>
      </div>

      <div>
        <p>Product Volumes</p>
        <div className='flex gap-3' >
          <div className='cursor-pointer active:text-white' onClick={()=>setSizes(prev => prev.includes('50 ml') ? prev.filter(item => item !== '50 ml') : [...prev, '50 ml'])}>
            <p className={`${sizes.includes("50 ml") ? "bg-pink-100" : "bg-slate-200"} bg-slate-200 px-3 py-1 cursor-pointer`}>50 ml</p>
          </div>

          <div className='cursor-pointer' onClick={()=>setSizes(prev => prev.includes('100 ml') ? prev.filter(item => item !== '100 ml') : [...prev, '100 ml'])}>
            <p className={`${sizes.includes("100 ml") ? "bg-pink-100" : "bg-slate-200"} bg-slate-200 px-3 py-1 cursor-pointer`}>100 ml</p>
          </div>

          <div className='cursor-pointer' onClick={()=>setSizes(prev => prev.includes('500 ml') ? prev.filter(item => item !== '500 ml') : [...prev, '500 ml'])}>
            <p className={`${sizes.includes("500 ml") ? "bg-pink-100" : "bg-slate-200"} bg-slate-200 px-3 py-1 cursor-pointer`}>500 ml</p>
          </div>

          <div className='cursor-pointer' onClick={()=>setSizes(prev => prev.includes('990 ml') ? prev.filter(item => item !== '990 ml') : [...prev, '990 ml'])}>
            <p className={`${sizes.includes("990 ml") ? "bg-pink-100" : "bg-slate-200"} bg-slate-200 px-3 py-1 cursor-pointer`}>990 ml</p>
          </div>
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input onChange={()=>setBestseller(prev=> !prev)} checked={bestseller} type="checkbox" id='bestseller' />
        <label className='cursor-pointer' htmlFor='bestseller'>ADD TO BESTSELLER</label>
      </div>

      <button type='submit' className='w-28 py py-3 mt-4 bg-black text-white active:bg-white active:text-black cursor-pointer'> ADD</button>
    </form>
  )
}

export default Add
