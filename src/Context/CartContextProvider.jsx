import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export let CartContext = createContext()

export default function CartContextProvider({children}) {
let [numsCartItems,setnumsCartItems] = useState(null)
let baseUrl = 'https://ecommerce.routemisr.com/api/v1/cart'
let headerOption = {
        headers:{
            token: localStorage.getItem('token')
        }
 }
   
   useEffect(()=>{
    if(localStorage.getItem('token')){
          getUserCart()
          .then((req)=>{
            console.log(req.data.numOfCartItems);
            setnumsCartItems(req.data.numOfCartItems)
          })
          .catch((err)=>{
             console.log(err);
          })
    }
   },[])

   function getUserCart(){
    return axios.get(baseUrl,headerOption)
   }

   function addUserCart(id){
     let data = {
        productId: id
     }
     return axios.post(baseUrl, data ,headerOption)
   }
  
  function deleteUserCart(id){
      return axios.delete(`${baseUrl}/${id}`, headerOption)
  }
  function clearUserCart(){
      return axios.delete(`${baseUrl}`, headerOption)
  }
  function updataCartItemCount(id,count){
    let data ={
       count:count
    }
     return axios.put(`${baseUrl}/${id}`,data,headerOption)
  }
  return (
    <CartContext.Provider value={{getUserCart, numsCartItems, setnumsCartItems, addUserCart, deleteUserCart, clearUserCart, updataCartItemCount}}>
      {children}
    </CartContext.Provider>
  )
}
