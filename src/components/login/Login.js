import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextError from "../../utils/TextError";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import appConstant from "../../utils/ApiRoutes";

const initialValues = {
  email: "",
  password: "",
};
const formSchema = Yup.object({
  email: Yup.string().email("Invalid Email Format").required("Required!"),
  password: Yup.string().required("Required!"),
});

const Login = () => {
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, [navigate]);

  const onSubmit = async (values) => {
    console.log(values);
    axios
      .post(`${appConstant.authURL}/login`, values)
      .then((res) => {
        console.log(res);
        toast(`Hey ${res.data.user.username}, Welcome Back!`);
        localStorage.setItem("chat-app-user", JSON.stringify(res.data.user));
        navigate("/");
      })
      .catch((error) => {
        toast(error.response.data.error);
      });
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={formSchema}
    >
      <Form className="flex flex-col justify-center items-center h-screen bg-[#0f360a]">
        <div className="bg-[#cef5c9] rounded-md w-[80vw] max-w-md p-3 flex flex-col gap-4 ">
          <h2 className="text-center font-sans font-bold text-xl text-[#0f360a]">
            Login
          </h2>
          <Field
            type="email"
            name="email"
            placeholder="Email"
            className="p-3 rounded block w-full border-2 border-[#0f360a] focus:outline-none focus:border-[#4cda3a]"
          />
          <ErrorMessage name="email" component={TextError} />
          <Field
            type="password"
            name="password"
            placeholder="Password"
            className="p-3 rounded block w-full border-2 border-[#0f360a] focus:outline-none focus:border-[#4cda3a] "
          />
          <ErrorMessage name="password" component={TextError} />
          <button
            type="submit"
            className="p-3 w-full cursor-pointer rounded-md bg-[#0f360a] text-white block hover:bg-[#effced] hover:text-[#0f360a] duration-500"
          >
            Login
          </button>
          <span className="text-black">
            Didn't have a account?
            <Link
              to="/register"
              className="hover:underline text-[#23691a] duration-500 ml-1"
            >
              Create One
            </Link>
          </span>
        </div>
        <ToastContainer />
      </Form>
    </Formik>
  );
};

export default Login;
