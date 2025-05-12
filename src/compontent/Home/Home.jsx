import axios from 'axios';
import { useContext, useState } from 'react'
import MainSlider from '../MainSlider/MainSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CartContext } from '../../Context/CartContextProvider';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
let {addUserCart, setnumsCartItems} =  useContext(CartContext)
  let [page, setpage] = useState('1');

   function getAllproductList(){
    return  axios.get(`https://ecommerce.routemisr.com/api/v1/products?limit=10&page=${page}`)
   }


 let {data, isLoading, isError, error} =  useQuery({
    queryKey:['products',page],
    queryFn:getAllproductList,
  })

  function getPageNumber(e){
    let page = e.target.getAttribute('page')
    setpage(page)
    
  }


  if(isError){
    return <h2 className=' text-red-600'>{error.response.message}</h2>
  }

  function addCart(id){
    addUserCart(id)
    .then((req)=>{
      console.log(req.data);
      setnumsCartItems(req.data.numOfCartItems)
      toast.success(req.data.message)
    })
    .catch(()=>{
      toast.error(error.response.data.message)
    }) 
  }

  return (
    <>

    <Toaster/>
     
     {isLoading ? 
           <div className="bg-slate-300 flex justify-center items-center h-screen">
                <span className="loader"></span>
           </div>
        :
        <div className='w-11/12 mx-auto my-5 space-y-8'>
         
         <MainSlider/>

         <CategorySlider/>
        
        {/*
         <div className="flex flex-wrap">
              {data?.data?.data?.map((product)=>{
                 let{_id,title,imageCover,price,ratingsAverage,category} = product;
                 let {name} = category
                 return(
                  <div key={_id} className="lg:w-2/12 md:w-3/12 sm:w-6/12 w-full px-3 mb-3">
                       <Link to={`/productdetails/${_id}`}>
                          <div className="item overflow-hidden group p-2 border hover:border hover:border-main">
                            <img src={imageCover} className='w-full' alt={title} />
                            <h5 className='text-main'>{name}</h5>
                            <h2>{title.split(' ').splice(0,2).join(' ')}</h2>

                            <div className=' flex justify-between'>
                                <span>{price}EGP</span>
                                <span>
                                <i className="fa-solid fa-star text-yellow-500"></i>
                                  {ratingsAverage}
                                </span>
                            </div>
                          </div>
                       </Link>
                       <button className='btn mt-3 duration-500 translate-y-24 group-hover:translate-y-0'>Add To Cart</button>
                  </div>
                 )
              })}
          </div> */}







          <div className="flex flex-wrap">
                        {data?.data?.data?.map((product)=>{
                          let{_id,title,imageCover,price,ratingsAverage,category} = product;
                          let {name} = category
                          return(
                            <div key={_id} className="lg:w-2/12 md:w-3/12 sm:w-6/12 w-full px-3 mb-3">
                                <div className="item overflow-hidden group p-2 border hover:border hover:border-main">
                                <Link to={`/productdetails/${_id}`}>
                                      <img src={imageCover} className='w-full' alt={title} />
                                      <h5 className='text-main'>{name}</h5>
                                      <h2>{title.split(' ').splice(0,2).join(' ')}</h2>

                                      <div className=' flex justify-between'>
                                          <span>{price}EGP</span>
                                          <span>
                                          <i className="fa-solid fa-star text-yellow-500"></i>
                                            {ratingsAverage}
                                          </span>
                                      </div>
                                </Link>
                                <button onClick={()=> addCart(_id)}  className='btn mt-3 duration-500 translate-y-24 group-hover:translate-y-0'>Add To Cart</button>
                                </div>
                            </div>
                          )
                        })}
          </div>


          

        <nav aria-label="Page navigation example">
                  <ul className="flex items-center justify-center -space-x-px h-8 text-sm">
                    <li>
                      <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span className="sr-only">Previous</span>
                        <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 1 1 5l4 4" />
                        </svg>
                      </a>
                    </li>
                    {new Array(data?.data?.metadata?.numberOfPages)
                     .fill('')
                     .map((el,i)=>{
                      return (
                      <li onClick={getPageNumber} key={el}>
                        <a
                          page={i + 1}
                          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                          {i + 1}
                        </a>
                      </li> 
                      ) 
                        
                    })}
                    
                    
                    <li>
                      <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span className="sr-only">Next</span>
                        <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
                        </svg>
                      </a>
                    </li>
                  </ul>
        </nav>



        </div>
        }




       
    </>
  )
}
