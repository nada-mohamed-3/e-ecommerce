import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContextProvider";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {
  let { getUserCart,deleteUserCart, setnumsCartItems, clearUserCart, updataCartItemCount } = useContext(CartContext);
  let [cartData, setCartData] = useState(null);
  let [loading, setloading] = useState(true);
  let [loadingCount, setloadingCount] = useState(false);

  useEffect(() => {
    getCartData();
  }, []);

  function getCartData() {
    setloading(true);
    getUserCart()
      .then((req) => {
        console.log(req.data.data);
        setCartData(req.data.data);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  }


  function removeItem(id){
    deleteUserCart(id).then((req)=>{
      console.log(req);
      setnumsCartItems(req.data.numOfCartItems);
      setCartData(req.data.data);
      toast.success('Product Deleted')
      
    }).catch((err)=>{
      console.log(err);
    })
  }

  function clearItems(){
     clearUserCart()
     .then((req)=>{
      console.log(req);
      if(req.data.message == 'success'){
          setCartData(null)
          setnumsCartItems(null)
      }
    })
     .catch((err)=>{
      console.log(err);
    })
  }

   function updataCount(id,count){
    document.getElementById(id).innerHTML = `<i class="fa-solid fa-spinner fa-spin text-main"></i>`
  
        updataCartItemCount(id,count).then((req)=>{
          console.log(req);
          setCartData(req.data.data)
          document.getElementById(id).innerHTML = count;
        })
   }
  if (loading) {
    return (
      <div className="bg-slate-300 flex justify-center items-center h-screen">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <>
    <Toaster/>
      {cartData?.products.length > 0 ? (
        <div className="w-11/12 mx-auto my-5 ">
          <div className="bg-gray-100">
            <h1 className="text-2xl">Shop Cart</h1>
            <div className="flex justify-between">
                <h2 className=" text-main">
                  Total Cart Price : {cartData?.totalCartPrice}EGP
                </h2>

                <button onClick={clearItems} className="bg-red-600 text-white px-3 py-2 rounded">Clear</button>
            </div>

            <div className=" divide-y-2  divide-gray-300 p-2">
              {cartData?.products?.map((item) => {
                return (
                  <div key={item._id} className="flex items-center p-3">
                    <div className="w-10/12">
                      <div className="flex justify-around">
                        <div className="w-1/12 ">
                          <img
                            src={item.product.imageCover}
                            className="w-full"
                            alt=""
                          />
                        </div>
                        <div className="w-10/12">
                          <h2>{item.product.title}</h2>
                          <h2 className="text-main my-3">
                            Price {item.price} EGP
                          </h2>
                          <button onClick={()=>{removeItem(item.product._id)}} className="border border-red-500 px-5 py-2 rounded text-red-500 hover:bg-red-500 hover:text-white">
                            <i className="fa-solid fa-trash inline mr-2"></i>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="w-2/12">
                      <i onClick={()=>{updataCount(item.product._id, item.count+1)}} className="fa-solid fa-plus rounded border border-main p-2 cursor-pointer"></i>
                      {loadingCount ? <i className="fa-solid fa-spinner fa-spin text-main"></i>:
                      <span id={item.product._id} className="mx-2">{item.count}</span>
                      }
                      <i onClick={()=>{updataCount(item.product._id, item.count-1)}} className="fa-solid fa-minus rounded border border-main p-2 cursor-pointer"></i>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link to={'/shippingDetails/'+cartData._id} className="btn block text-center">Pay <i className=" fa-brands fa-cc-visa"></i></Link>
          </div>
        </div>
      ) : (
        <div className="bg-red-400 text-center">No Data</div>
      )}
  </>
  );

}

