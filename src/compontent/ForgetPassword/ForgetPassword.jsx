import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Forgetpassword() {
  let [errorMessage, setError] = useState(null);
  let [formDisplay, setformDisplay] = useState(true);
   
 let navg = useNavigate()

  let validYup = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
  });


  let valid2Yup = Yup.object({
    resetCode: Yup.string()
      .required("resetCode is required")
  });

  let initialValues = {
    email: "",
  };

  let  ForgetpasswordForm = useFormik({
    initialValues,
    onSubmit:  Forgetpassword,
    validationSchema: validYup,
  });

  let  verifyResetCodeForm = useFormik({
    initialValues:{
      resetCode:''
    },
    onSubmit:  verifyResetCodeApi,
    validationSchema: valid2Yup,
  });

  function verifyResetCodeApi(data){
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',data)
    .then((req) => {
      console.log(req.data);
      if(req.data.status == 'Success'){
        navg('/updatepassword')
      }
     
    })
    .catch((err) => {
      setError(err.response.data.message);
    });
  }  



   function  Forgetpassword(data) {
    //  console.log('submit', data);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", data)
      .then((req) => {
        console.log(req.data);
        if(req.data.statusMsg == "success"){
              setformDisplay(false)
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }

  return (
    <>
    
    {formDisplay ?
       <div>
       <h2> Forgetpassword : </h2>
 
         {errorMessage ? (
           <div
             className=" w-1/2 mx-auto p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
             role="alert"
           >
             {errorMessage}
         </div>) : " " }
 
         <form
           onSubmit={ForgetpasswordForm.handleSubmit}
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
               value={ForgetpasswordForm.values.email}
               onChange={ForgetpasswordForm.handleChange}
               onBlur={ForgetpasswordForm.handleBlur}
               type="email"
               id="email"
               name="email"
               className="shadow-sm   bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
             />
             {ForgetpasswordForm.touched.email && ForgetpasswordForm.errors.email ? (
               <p className="text-red-950">{ForgetpasswordForm.errors.email}</p>
             ) : (
               ""
             )}
           </div>
 
           <button
             disabled={!(ForgetpasswordForm.isValid && ForgetpasswordForm.dirty)}
             type="submit"
             className=" mt-4 disabled:bg-active disabled:bg-opacity-30 text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-active"
           >
             Sent
           </button>
         </form>
       </div> 
          :    
       <div>
       <h2>ResetCode : </h2>

      {errorMessage ? (
        <div
          className=" w-1/2 mx-auto p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {errorMessage}
      </div>) : " " }

      <form
        onSubmit={verifyResetCodeForm.handleSubmit}
        className="w-7/12 mx-auto shadow p-8"
      >


      <div className="mb-5">
          <label
            htmlFor="resetCode"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your resetCode
          </label>
          <input
            value={verifyResetCodeForm.values.resetCode}
            onChange={verifyResetCodeForm.handleChange}
            onBlur={verifyResetCodeForm.handleBlur}
            type="string"
            id="resetCode"
            name="resetCode"
            className="shadow-sm   bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
          {verifyResetCodeForm.touched.resetCode && verifyResetCodeForm.errors.resetCode ? (
            <p className="text-red-950">{verifyResetCodeForm.errors.resetCode}</p>
          ) : (
            ""
          )}
        </div>

        <button
          disabled={!(verifyResetCodeForm.isValid && verifyResetCodeForm.dirty)}
          type="submit"
          className=" mt-4 disabled:bg-active disabled:bg-opacity-30 text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-active"
        >
          verifyCode
        </button>
      </form>
       </div>
        }

    







   
      


    </>
  );
}
