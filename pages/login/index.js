import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { ToastContainer, toast } from "react-toast";
import { useAuth } from "../../utils/context/AuthContext";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { CloseEye, OpenEye } from "../../utils/icons";
import Spinner from "../../components/Spinner/Spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);

  const { theme, setTheme } = useTheme("light");
  const [state, dispatch] = useAuth();
  const { accessToken } = state;
  const router = useRouter();

  useEffect(() => {
    setTheme("light");
  }, []);

  async function onSubmitHandler(e) {
    e.preventDefault();
    let data = { email: email, password: password };
    console.log(data);

    /* validation handler */
    // const isValid = validationHandler(stateFormData);

    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    setLoading(!loading);
    const loginApi = await fetch(`/api/auth`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).catch((error) => {
      console.log("Caught Error");
      console.error("Error:", error);
    });
    let result = await loginApi.json();
    console.log(result);
    if (result.success && result.accessToken) {
      Cookies.set("token", result.accessToken);
      dispatch({
        type: "setAuthDetails",
        payload: {
          loading: true,
          user: result.payload,
        },
      });

      dispatch({
        type: "setAccessToken",
        payload: {
          loading: true,
          accessToken: result.accessToken,
        },
      });
      // window.location.href = referer ? referer : "/";
      // const pathUrl = referer ? referer.lastIndexOf("/") : "/";
      router.push("/");
    } else {
      if (result.error) emailOrPasswordWrong(result.error);
      console.log(result);
    }
    setLoading(false);
  }
  if (accessToken) {
    router.push("/");
    return <Spinner />;
  }

  useEffect(() => {
    console.log(email);
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        onSubmitHandler(event);
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [email, password]);

  const emailOrPasswordWrong = (text) => toast.error(text);

  return (
    <>
      <section className="xl:container mx-auto">
        <div className="max-w-4xl mx-auto shadow-sm my-8 rounded-md overflow-hidden">
          <div className="p-3 bg-white ">
            <div className="text-center mt-10">
              <h1 className="text-center text-5xl font-normal text-gray-500 dark:text-white">
                Sign in
              </h1>
              <p className="mt-2 text-gray-600 mb-10">
                Sign in to your Account
              </p>
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

            {/* <div className="max-w-sm mx-auto mt-3">
              <label htmlFor="password" className="select-none">
                Password
              </label>
              <div className="flex items-center rounded-md overflow-hidden">
                <input
                  className="bg-gray-800 text-white px-4 dark:bg-gray-800 p-1 h-10 rounded-sm outline-none w-full text-md"
                  type="password"
                  placeholder="Password"
                  aria-label="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value.trim());
                  }}
                />
              </div>
            </div> */}

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
                    Login{" "}
                  </button>
                </Link>
              </div>
              <div>
                <h1
                  className="hover:text-indigo-900 text-blue-800 font-bold py-3 transition duration-500 ease-in-out"
                  title="Reset Password"
                >
                  <Link href={"/"} as={"/"}>
                    Forgot Password ?
                  </Link>
                </h1>

                <div className="flex justify-center">
                  <span className="pr-2 text-gray-500">No Account?</span>
                  <h1
                    className="hover:text-indigo-900 text-blue-800 font-bold transition duration-500 ease-in-out"
                    title="Signup Now"
                  >
                    <Link href={"/"} as={"/"}>
                      Signup
                    </Link>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer delay={7000} position="bottom-right" />
      </section>
    </>
  );
};

export default Login;
