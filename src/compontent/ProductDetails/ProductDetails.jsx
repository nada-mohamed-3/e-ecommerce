import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContextProvider";
import toast, { Toaster } from "react-hot-toast";

export default function ProductDetails() {
  let { id } = useParams();
  let {addUserCart, setnumsCartItems} = useContext(CartContext)

  let { isLoading, data } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: function () {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    },
  });

  function ChangeImage(e) {
    let imgSrc = e.target.getAttribute("src");
    document.getElementById("myImage").setAttribute("src", imgSrc);
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

      {isLoading ? (
        <div className="bg-slate-300 flex justify-center items-center h-screen">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="w-10/12 mx-auto my-5">
          <div className="flex justify-between items-center">
            <div className="w-3/12">
              {/* <img src={product?.imageCover} className='w-full' alt="" /> */}

              {/* <Slider dots>
                    {product?.images?.map((img,i)=>{
                        return <div key={i}>
                            <img src={img} className='w-full' alt="" />
                        </div>
                    })}
                </Slider> */}

              <img
                src={data?.data?.data?.imageCover}
                id="myImage"
                className="w-full"
                alt=""
              />
              <div className="flex">
                {data?.data?.data?.images?.map((img, i) => {
                  return (
                    <div key={i}>
                      <img
                        onClick={ChangeImage}
                        src={img}
                        className="w-full"
                        alt=""
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-8/12">
              <h2>{data?.data?.data?.title}</h2>
              <p className="text-gray-500 my-5">{data?.data?.data?.description}</p>
              <div className=" flex justify-between">
                <span>{data?.data?.data?.price}EGP</span>
                <span>
                  <i className="fa-solid fa-star text-yellow-500"></i>
                  {data?.data?.data?.ratingsAverage}
                </span>
              </div>
              <button onClick={()=>addCart(id)} className="btn mt-5">Add To Cart</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
