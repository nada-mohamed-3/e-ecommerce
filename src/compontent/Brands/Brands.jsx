import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Link } from "react-router-dom";
import useApi from "../../Hooks/useApi";

export default function Brands() {
  let { data, isLoading} =   useApi('brands')
    
  if(isLoading){
    return <div className="bg-slate-300 flex justify-center items-center h-screen">
                <span className="loader"></span>
            </div>
  }
  return (
      <>
          <div className='flex flex-wrap'>
                {data?.data?.data?.map((brands)=>{
                    return(
                        <div key={brands._id} className="w-3/12">
                            <img src={brands.image} className='h-48 w-full object-cover object-top' alt="" />
                            <h5 className='text-center'>{brands.name}</h5>
                        </div>
                    )
                })}
          </div>
      </>
    )













































//   function getAllData(){
//     return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
//   }
//  let {isLoading, isError, error, data,refetch, isFetching} =  useQuery({
//   queryKey:['brands'],
//     queryFn:getAllData,
    
//     // refetchInterval:3000,
//     // refetchOnMount:false,//default true  //true=>refetch when component mount  //false=>not refetch when component mount لما ارجع مش هيعمل فيتش تاني 
//     // refetchOnWindowFocus:false,//default true //true=>refetch when tab active //false=>not refetch when tab active
//     // retry:2, // if error retry 2 times
//     // retryDelay:2000 //retry after 2 seconds بين كل ايرور وايرور  يستني ثانيتين 
//   //  gcTime:5000,
//   // staleTime:2000,
//   // enabled:false, //default true

//   })
//   console.log('data',data);

//   let brandList = data?.data?.data

//   if(isLoading) {
//     return <h1>Loading.................</h1>
//   }
//   if(isError) {
//     return <h1>{error.response.data.message}</h1>
//   }

  
  
//   return (
//     <div>
//        <h1>Brands</h1>
//        <button className=" my-5 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={refetch}>Get Data</button>
//         <div className="flex flex-wrap">
//               {brandList?.map((product)=>{ //1 data (useQuery) 2 data (axios) 3 data(api)
//                  let{_id,title,imageCover,price,ratingsAverage,category} = product;
//                  let {name} = category
//                  return(
//                   <div key={_id} className="lg:w-2/12 md:w-3/12 sm:w-6/12 w-full px-3 mb-3">
//                        <Link to={`/productdetails/${_id}`}>
//                           <div className="item overflow-hidden group p-2 border hover:border hover:border-main">
//                             <img src={imageCover} className='w-full' alt={title} />
//                             <h5 className='text-main'>{name}</h5>
//                             <h2>{title.split(' ').splice(0,2).join(' ')}</h2>

//                             <div className=' flex justify-between'>
//                                 <span>{price}EGP</span>
//                                 <span>
//                                 <i className="fa-solid fa-star text-yellow-500"></i>
//                                   {ratingsAverage}
//                                 </span>
//                             </div>
//                             <button className='btn mt-3 duration-500 translate-y-24 group-hover:translate-y-0'>Add To Cart</button>
//                           </div>
//                        </Link>
//                   </div>
//                  )
//               })}
//           </div> 
//     </div>
//   )
} 