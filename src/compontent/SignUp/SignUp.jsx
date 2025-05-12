import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function SignUp() {
  let [errorMessage, setError] = useState(null);
   
 let navg = useNavigate()
  let validYup = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be at most 20 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        "password invalid"
      ),
    rePassword: Yup.string()
      .required("Password is required")
      .oneOf([Yup.ref("password")], "rePasswords must match"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^(20)?01[1250][0-9]{8}$/, "Phone number is not valid"),
  });

  let initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  let registerForm = useFormik({
    initialValues,
    onSubmit: registerApi,
    validationSchema: validYup,
  });

  async function registerApi(data) {
    //  console.log('submit', data);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", data)
      .then((req) => {
        if(req.data.message =='success'){
              navg('/login')
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }

  return (
    <>
      <h2>Register Now : </h2>

      {errorMessage ? (
        <div
          className=" w-1/2 mx-auto p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {errorMessage}
       </div>) : " " }

      <form
        onSubmit={registerForm.handleSubmit}
        className="w-7/12 mx-auto shadow p-8"
      >
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your Name
          </label>
          <input
            value={registerForm.values.name}
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            type="text"
            id="name"
            name="name"
            className="shadow-sm  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
          {registerForm.touched.name && registerForm.errors.name ? (
            <p className="text-red-950">{registerForm.errors.name}</p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your email
          </label>
          <input
            value={registerForm.values.email}
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            type="email"
            id="email"
            name="email"
            className="shadow-sm   bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
          {registerForm.touched.email && registerForm.errors.email ? (
            <p className="text-red-950">{registerForm.errors.email}</p>
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
            value={registerForm.values.password}
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            type="password"
            id="password"
            name="password"
            className="shadow-sm  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
          {registerForm.touched.password && registerForm.errors.password ? (
            <p className="text-red-950">{registerForm.errors.password}</p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="rePassword"
            className="block mb-2  text-sm font-medium text-gray-900"
          >
            Repeat password
          </label>
          <input
            value={registerForm.values.rePassword}
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            type="password"
            id="rePassword"
            name="rePassword"
            className="shadow-sm  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
          {registerForm.touched.rePassword && registerForm.errors.rePassword ? (
            <p className="text-red-950">{registerForm.errors.rePassword}</p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block mb-2  text-sm font-medium text-gray-900"
          >
            Phone
          </label>
          <input
            value={registerForm.values.phone}
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            type="tel"
            id="phone"
            name="phone"
            className="shadow-sm   bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
          {registerForm.touched.phone && registerForm.errors.phone ? (
            <p className="text-red-950">{registerForm.errors.phone}</p>
          ) : (
            ""
          )}
        </div>

        <button
          disabled={!(registerForm.isValid && registerForm.dirty)}
          type="submit"
          className=" disabled:bg-active disabled:bg-opacity-30 text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-active"
        >
          Submit
        </button>
      </form>
    </>
  );
}
