import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import useApi from '../../Hooks/useApi';

export default function CategorySlider() {
    
    //let [categoryList, setcategoryList] = useState(null);
    // function getAllCategory(){
    //     axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    //     .then((req) =>{
    //         // console.log(req);
    //         setcategoryList(req.data.data)
    //     })
    //     .catch((err)=>{
    //         console.log(err)
    //     })
    // }

    // useEffect(()=>{
    //     getAllCategory()
    // },[])







 let {data}  =  useApi('categories')
   
  return (
    <div className='my-5'>
          <Slider slidesToShow={6} infinite autoplay speed={500} slidesToScroll={6} >
            {data?.data?.data?.map((category)=>{
                return(
                    <div key={category._id}>
                        <img src={category.image} className='h-48 w-full object-cover' alt="" />
                        <h5 className='text-center'>{category.name}</h5>
                    </div>
                )
            })}

          </Slider>
    </div>
  )
}
