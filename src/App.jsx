import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Layout from './compontent/Layout/Layout'
import Product from './compontent/Product/Product'
import Home from './compontent/Home/Home'
import Cart from './compontent/Cart/Cart'
import Login from './compontent/Login/Login'
import SignUp from './compontent/SignUp/SignUp'
import Notfound from './compontent/Notfound/Notfound'
import { RouterProvider } from 'react-router'
import Brands from './compontent/Brands/Brands'
import Categories from './compontent/Categories/Categories'
import Logout from './compontent/Logout/Logout'
import ForgetPassword from './compontent/ForgetPassword/ForgetPassword'
import UpdatePassword from './compontent/UpdatePassword/UpdatePassword'
import AuthContextProvider from './Context/AuthContextProvider'
import ProtectedRouting from './compontent/ProtectedRouting/ProtectedRouting'
import ProductDetails from './compontent/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from './Context/CartContextProvider'
import ShippingDetails from './compontent/ShippingDetails/ShippingDetails'


export default function App() {

let routers = createBrowserRouter([
    { 
      path:'',
      element:<Layout/>,
      errorElement:<Notfound/>,
      children:[
           {index:true,element:<ProtectedRouting><Home/></ProtectedRouting>},
           {path:'product',element:<ProtectedRouting><Product/></ProtectedRouting>},
           {path:'cart',element:<ProtectedRouting><Cart/></ProtectedRouting>},
           {path:'brands',element:<ProtectedRouting><Brands/></ProtectedRouting>},
           {path:'categories',element:<ProtectedRouting><Categories/></ProtectedRouting>},
           {path:'productdetails/:id',element:<ProtectedRouting><ProductDetails/></ProtectedRouting>},
           {path:'shippingDetails/:id',element:<ProtectedRouting><ShippingDetails/></ProtectedRouting>},
           {path:'login',element:<Login/>},
           {path:'signup',element:<SignUp/>},
           {path:'loguot',element:<Logout/>},
           {path:'forgetpassword',element:<ForgetPassword/>},
           {path:'updatepassword',element:<UpdatePassword/>},
           {path:'*',element:<Notfound/>},
    ],
  }
  ])

 let clients = new QueryClient()
  

  return (
    <>
        <QueryClientProvider client={clients}>
          <ReactQueryDevtools></ReactQueryDevtools>
              <AuthContextProvider>
                <CartContextProvider>
                  <RouterProvider router={routers}/>
                </CartContextProvider>
              </AuthContextProvider>
        </QueryClientProvider>    
    </>
         
  )
}

