import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { ToastContainer, toast } from "react-toast";
import { CloseEye, OpenEye } from "../../utils/icons";
import { Field, Formik } from "formik";
import * as Yup from "yup";

const Register = () => {
  //For Form

  const [loading, setLoading] = useState(false);
  const { setTheme } = useTheme("light");

  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfirmPassword, setvisibleConfirmPassword] = useState(false);

  useEffect(() => {
    setTheme("light");
  }, []);

  const errorToast = (text) => {
    console.log("Password");
    toast.error(text);
  };

  const Schema = Yup.object().shape({
    password: Yup.string().required("This field is required"),
    confirmPassword: Yup.string().when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Password's didn't match"
      ),
    }),
  });

  const CustomInputComponent = ({ field, form, ...props }) => {
    return (
      <input
        className="bg-gray-800 flex-grow  text-white  dark:bg-gray-800 p-1 h-10 rounded-sm outline-none w-full text-md"
        {...field}
        {...props}
      />
    );
  };

  return (
    <>
      <section className="xl:container mx-auto">
        <div className="max-w-4xl mx-auto shadow-sm my-8 rounded-md overflow-hidden">
          <div className="p-3 bg-white ">
            <div className="text-center mt-10">
              <h1 className="text-center text-5xl font-normal text-gray-500 dark:text-white">
                Sign Up
              </h1>
              <p className="mt-2 text-gray-600 mb-10">
                Sign in to your Account
              </p>
            </div>

            <Formik
              initialValues={{
                password: "",
                confirmPassword: "",
              }}
              validationSchema={Schema}
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  actions.setSubmitting(false);
                }, 1000);
              }}
            >
              {({ values, errors, handleSubmit, handleChange, handleBlur }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <div className="max-w-sm mx-auto mt-3">
                      <Field
                        name="firstName"
                        component={CustomInputComponent}
                        placeholder="First Name"
                      />
                    </div>
                    <div className="max-w-sm mx-auto mt-3">
                      <label htmlFor="password" className="select-none">
                        Password
                      </label>
                      <div className="flex bg-gray-800 items-center rounded-md overflow-hidden px-4">
                        <input
                          className=" bg-gray-800 flex-grow  text-white  dark:bg-gray-800 p-1 h-10 rounded-sm outline-none w-full text-md"
                          type={!visiblePassword ? "password" : "text"}
                          placeholder="Password"
                          aria-label="password"
                          id="password"
                          value={values.password}
                          onBlur={handleBlur}
                          name="password"
                          onChange={handleChange}
                        />
                        <button
                          type="button"
                          onClick={() => setVisiblePassword(!visiblePassword)}
                          className="rounded-full hover:bg-gray-700 p-1 text-white"
                        >
                          {visiblePassword ? (
                            <OpenEye
                              customClass="fill-current text-gray-100"
                              height="18"
                              width="18"
                            />
                          ) : (
                            <CloseEye
                              customClass="fill-current text-gray-100"
                              height="18"
                              width="18"
                            />
                          )}
                        </button>
                      </div>
                      <span className="error" style={{ color: "red" }}>
                        {errors.password}
                      </span>
                    </div>
                    <div className="max-w-sm mx-auto mt-3">
                      <label htmlFor="confirmPassword" className="select-none">
                        Confirm Password
                      </label>
                      <div className="flex bg-gray-800 items-center rounded-md overflow-hidden px-4">
                        <input
                          className=" bg-gray-800 flex-grow  text-white  dark:bg-gray-800 p-1 h-10 rounded-sm outline-none w-full text-md"
                          type={!visibleConfirmPassword ? "password" : "text"}
                          placeholder="Password"
                          aria-label="password"
                          id="confirmPassword"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.confirmPassword}
                          name="confirmPassword"
                          // onBlur={() => handlePasswordMatch()}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setvisibleConfirmPassword(!visibleConfirmPassword)
                          }
                          className="rounded-full hover:bg-gray-700 p-1 text-white"
                        >
                          {visibleConfirmPassword ? (
                            <OpenEye
                              customClass="fill-current text-gray-100"
                              height="18"
                              width="18"
                            />
                          ) : (
                            <CloseEye
                              customClass="fill-current text-gray-100"
                              height="18"
                              width="18"
                            />
                          )}
                        </button>
                      </div>
                      <p className="text-red-500 mt-1 text-sm">
                        {errors.confirmPassword}
                      </p>
                      {/* {errorToast(errors.confirmPassword)} */}
                    </div>
                    <div className="text-center mb-8 max-w-sm mx-auto">
                      <div className="mt-5">
                        <button
                          type="submit"
                          className={` text-white px-6 py-2 rounded-md shadow-lg transition duration-500 ease-in-out w-full ${
                            loading
                              ? "bg-gray-600 cursor-not-allowed"
                              : "bg-blue-800 hover:bg-blue-600"
                          }`}
                        >
                          Sign Up{" "}
                        </button>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-center">
                          <span className="pr-2 text-gray-500">
                            Already Have Account?
                          </span>
                          <h1
                            className="hover:text-indigo-900 text-blue-800 font-bold transition duration-500 ease-in-out"
                            title="Signup Now"
                          >
                            <Link href={"/"} as={"/"}>
                              Login
                            </Link>
                          </h1>
                        </div>
                      </div>
                    </div>
                  </form>
                );
              }}
            </Formik>

            {/* <div className="max-w-sm mx-auto mt-3">
              <label htmlFor="UserName" className="select-none">
                User Name
              </label>
              <div className="flex items-center rounded-md overflow-hidden">
                <input
                  className="bg-gray-800 text-gray-100 px-4 dark:bg-gray-800 p-1 h-10 rounded-sm outline-none w-full text-md"
                  type="text"
                  placeholder="User Name"
                  aria-label="UserName"
                  id="UserName"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value.trim());
                  }}
                />
              </div>
            </div>

            <div className="max-w-sm mx-auto mt-3">
              <label htmlFor="email" className="select-none">
                Email Address
              </label>
              <div className="flex items-center rounded-md overflow-hidden">
                <input
                  className="bg-gray-800 text-gray-100 px-4 dark:bg-gray-800 p-1 h-10 rounded-sm outline-none w-full text-md"
                  type="email"
                  placeholder="Email"
                  aria-label="Email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value.trim());
                  }}
                />
              </div>
            </div>
            <div className="max-w-sm mx-auto mt-3">
              <label htmlFor="phoneNumber" className="select-none">
                Mobile Number
              </label>
              <div className="flex items-center rounded-md overflow-hidden">
                <input
                  className="bg-gray-800 text-gray-100 px-4 dark:bg-gray-800 p-1 h-10 rounded-sm outline-none w-full text-md"
                  type="tel"
                  placeholder="Phone Number"
                  pattern="(?:\+977[- ])?\d{2}-?\d{7,8}"
                  aria-label="Email"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value.trim());
                  }}
                />
              </div>
            </div>

            <div className="max-w-sm mx-auto mt-3">
              <label htmlFor="password" className="select-none">
                Password
              </label>
              <div className="flex bg-gray-800 items-center rounded-md overflow-hidden px-4">
                <input
                  className=" bg-gray-800 flex-grow  text-white  dark:bg-gray-800 p-1 h-10 rounded-sm outline-none w-full text-md"
                  type={!visiblePassword ? "password" : "text"}
                  placeholder="Password"
                  aria-label="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value.trim());
                  }}
                />
                <button
                  onClick={() => setVisiblePassword(!visiblePassword)}
                  className="rounded-full hover:bg-gray-700 p-1 text-white"
                >
                  {visiblePassword ? (
                    <OpenEye
                      customClass="fill-current text-gray-100"
                      height="18"
                      width="18"
                    />
                  ) : (
                    <CloseEye
                      customClass="fill-current text-gray-100"
                      height="18"
                      width="18"
                    />
                  )}
                </button>
              </div>
            </div>
            <div className="max-w-sm mx-auto mt-3">
              <label htmlFor="confirmPassword" className="select-none">
                Confirm Password
              </label>
              <div className="flex bg-gray-800 items-center rounded-md overflow-hidden px-4">
                <input
                  className=" bg-gray-800 flex-grow  text-white  dark:bg-gray-800 p-1 h-10 rounded-sm outline-none w-full text-md"
                  type={!visibleConfirmPassword ? "password" : "text"}
                  placeholder="Password"
                  aria-label="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value.trim());
                  }}
                  onBlur={() => handlePasswordMatch()}
                />
                <button
                  onClick={() =>
                    setvisibleConfirmPassword(!visibleConfirmPassword)
                  }
                  className="rounded-full hover:bg-gray-700 p-1 text-white"
                >
                  {visibleConfirmPassword ? (
                    <OpenEye
                      customClass="fill-current text-gray-100"
                      height="18"
                      width="18"
                    />
                  ) : (
                    <CloseEye
                      customClass="fill-current text-gray-100"
                      height="18"
                      width="18"
                    />
                  )}
                </button>
              </div>
            </div>

            <div className="text-center mb-8 max-w-sm mx-auto">
              <div className="mt-5">
                <Link href={"/"} as={"/"} passHref>
                  <button
                    className={` text-white px-6 py-2 rounded-md shadow-lg transition duration-500 ease-in-out w-full ${
                      loading
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-blue-800 hover:bg-blue-600"
                    }`}
                    onClick={(e) => onSubmitHandler(e)}
                    disabled={loading}
                  >
                    Sign Up{" "}
                  </button>
                </Link>
              </div>
              <div className="mt-4">
                <div className="flex justify-center">
                  <span className="pr-2 text-gray-500">
                    Already Have Account?
                  </span>
                  <h1
                    className="hover:text-indigo-900 text-blue-800 font-bold transition duration-500 ease-in-out"
                    title="Signup Now"
                  >
                    <Link href={"/"} as={"/"}>
                      Login
                    </Link>
                  </h1>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <ToastContainer delay={7000} position="bottom-right" />
      </section>
    </>
  );
};

export default Register;
