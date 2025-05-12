// import axios from 'axios'
// import { useFormik } from 'formik'
// import React, { useState } from 'react'
// import { useNavigate} from 'react-router-dom'
// import * as Yup from 'yup'

// export default function Login() {

//    let navg = useNavigate()
//    let [errMessage,setError] = useState(null)
//    let initialValues = {
//     email:"",
//     password:"",
//    }
//    let validationSchema = Yup.object({
//     email:Yup.string().required('email is required').email('enter vaild Email'),
//     password:Yup.string().required('password required')
//    })
//    let loginForm = useFormik({
//     initialValues,
//     onSubmit: loginApi,
//     validationSchema
//    })

//    function loginApi(data){
//     axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',data)
//     .then((req)=>{
//       console.log(req);
//       if(req.data.message == 'success')
//         navg('/')
//     })
//     .catch((err)=>{
//       setError(err.response.data.message)
//     })

//    }

//   return (
//     <>
//        <div className=" container py-10 ">

//         <form onSubmit={loginForm.handleSubmit} className="max-w-sm mx-auto shadow p-8">
         
//           <div className="mb-5">
//             <label
//               htmlFor="email"
//               className="block mb-2 text-sm font-medium text-gray-900 "
//             >
//               Your email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name='email'
//               className="shadow-sm outline-none border-none  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
//               placeholder="name@flowbite.com" 
//               value={loginForm.values.email}
//               onChange={loginForm.handleChange}
//               onBlur={loginForm.handleBlur}
//             />
//           </div>
//           <div className="mb-5">
//             <label
//               htmlFor="password"
//               className="block mb-2 text-sm font-medium text-gray-900"
//             >
//               Your password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name='password'
//               value={loginForm.values.password}
//               onChange={loginForm.handleChange}
//               onBlur={loginForm.handleBlur}
//               className="shadow-sm outline-none border-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
//               required
//             />
//           </div>
//               <button>submit</button>
//         </form>
//       </div>
//     </>
//   )
// }










import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AuthContext } from "../../Context/AuthContextProvider";

export default function Login() {
  let [errorMessage, setError] = useState(null);
 let {setToken} = useContext(AuthContext)
   
 let navg = useNavigate()
  let validYup = Yup.object({

    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),

    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        "password invalid"
      ),
  });

  let initialValues = {
    email: "",
    password: "",
  };

  let LoginForm = useFormik({
    initialValues,
    onSubmit: LoginApi,
    validationSchema: validYup,
  });

  async function LoginApi(data) {
    //  console.log('submit', data);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", data)
      .then((req) => {
        if(req.data.message =='success'){
          setToken(req.data.token)
          localStorage.setItem('token',req.data.token)
          decodeData(req.data.token)   
          navg('/')
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }

  return (
    <>
      <h2>Login Now : </h2>

      {errorMessage ? (
        <div
          className=" w-1/2 mx-auto p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {errorMessage}
       </div>) : " " }

      <form
        onSubmit={LoginForm.handleSubmit}
        className="w-7/12 mx-auto shadow p-8"
      >
       
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your email
          </label>
          <input
            value={LoginForm.values.email}
            onChange={LoginForm.handleChange}
            onBlur={LoginForm.handleBlur}
            type="email"
            id="email"
            name="email"
            className="shadow-sm   bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
          {LoginForm.touched.email && LoginForm.errors.email ? (
            <p className="text-red-950">{LoginForm.errors.email}</p>
          ) : (
            ""
          )}
        </div>
        
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your password
          </label>
          <input
            value={LoginForm.values.password}
            onChange={LoginForm.handleChange}
            onBlur={LoginForm.handleBlur}
            type="password"
            id="password"
            name="password"
            className="shadow-sm  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
          {LoginForm.touched.password && LoginForm.errors.password ? (
            <p className="text-red-950">{LoginForm.errors.password}</p>
          ) : (
            ""
          )}
        </div>
       
       
         <Link to="/forgetpassword">Forget Password ?</Link>
          <br />

        <button
          disabled={!(LoginForm.isValid && LoginForm.dirty)}
          type="submit"
          className=" mt-4 disabled:bg-active disabled:bg-opacity-30 text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-active"
        >
          Login
        </button>
      </form>
    </>
  );
}
