import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import CustomLoader from "../../Admin/Components/CustomLoader";
import { getAPIUrl } from "../../lib/useLocalStorage";
import AccountLayout from "./AccountLayout";

const ChangePassword: NextPage = () => {
  const mainApiUrl = getAPIUrl() || process.env.API_URL;
  const headerProps = {
    pageTitle: "Hi Bidder : Login page",
    pageDescription: "hi Bidder Category details page",
  };
  const { data: session } = useSession();
  const [loginError, setLoginError] = useState(null);
  const [passwordExist, setPasswordExist] = useState(false);
  const [passwordType, setPasswordType] = useState({
    old_password: "password",
    password: "password",
    retype_password: "password",
  });
  const [faIcon, setFaIcon] = useState({
    old_password: "fa-eye-slash",
    password: "fa-eye-slash",
    retype_password: "fa-eye-slash",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [userLogin, setUserLogin] = useState({
    old_password: "",
    password: "",
    retype_password: "",
  });

  const showPassword = (inputName: any) => {
    const newPasswordType =
      passwordType[inputName] == "password" ? "text" : "password";
    const newIcon =
      passwordType[inputName] == "password" ? "fa-eye" : "fa-eye-slash";
    setFaIcon({ ...faIcon, [inputName]: newIcon });
    setPasswordType({ ...passwordType, [inputName]: newPasswordType });
  };
  const submitForm = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    // let data = userLogin
    const respo = await fetch(mainApiUrl + "user/change-password", {
      method: "POST",
      body: JSON.stringify(userLogin),
      headers: { "Content-Type": "application/json" },
    });
    const response = await respo.json();
    console.log(response);
    if (respo.ok) {
      if (response.status == "1") {
        toast.success(response.message, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          theme: "dark",
        });
        setUserLogin({
          old_password: "",
          password: "",
          retype_password: "",
        });
      } else {
        toast.error(response.message, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          theme: "dark",
        });
      }
    }
    setIsLoading(false);
  };
  const handleValidation = (e: any) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };

  const userData = async () => {
    const dataRecord = await fetch(mainApiUrl + "user/get-user-info");
    const userJson = await dataRecord.json();
    if (dataRecord.ok) {
      if (userJson.status == "1") {
        if (userJson.records.password) {
          setPasswordExist(true);
        }
      }
    }
  };

  useEffect(() => {
    userData();
  }, []);

  const sendPasswordReset = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const data = { user_role: "User", email: session.user.email };
    const resp = await fetch(mainApiUrl + "user/forgot-password", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const response = await resp.json();
    if (resp.ok) {
      if (response.status == 1) {
        setLoginError(response.message);
      }
    }
    setIsLoading(false);
  };

  return (
    <AccountLayout headerProps={headerProps}>
      <ToastContainer />
      <div>
        <div className="relative z-10">
          {isLoading && <CustomLoader />}
          <div className="inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center pt-3 px-3 sm:px-6 lg:px-8">
              <div className="border-1 rounded grid grid-flow-col bg-[#F2F2F2]">
                <div className="space-y-6 py-8 px-12 rounded-xl relative">
                  {!passwordExist &&
                    (loginError ? (
                      <div className="rounded-xl text-white text-center justify-content-center items-center flex absolute top-0 left-0 bottom-0 right-0 z-20 bg-primary-color/[50%]">
                        <div>
                          <div className="alert alert-success p-4 mx-6">
                            <i className="text-[50px] fa fa-envelope mr-3 mb-3"></i>
                            <p
                              dangerouslySetInnerHTML={{ __html: loginError }}
                            ></p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-xl text-white text-center justify-content-center items-center flex absolute top-0 left-0 bottom-0 right-0 z-20 bg-primary-color/[50%]">
                        <div>
                          <h3 className="text-2xl">No Password generated</h3>
                          <p>Opps! You have not password with your account.</p>
                          <button
                            onClick={sendPasswordReset}
                            className="mt-4 px-5 py-2 bg-primary-color rounded"
                          >
                            Reset Password
                          </button>
                        </div>
                      </div>
                    ))}
                  <h1 className="text-2xl text-gray-700 font-semibold border-b-2 pb-4">
                    Change Password
                  </h1>
                  <form action="#" method="POST">
                    <div className="mt-4 space-y-6 min-w-[350px]">
                      <div className="-space-y-px rounded-md">
                        <div className="mt-3 relative">
                          <label htmlFor="password" className="font-semibold">
                            Old Password
                          </label>
                          <input
                            onChange={handleValidation}
                            id="old_password"
                            name="old_password"
                            type={passwordType.old_password}
                            autoComplete="current-password"
                            required
                            className="shadow relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Old Password"
                          />
                          <i
                            className={`z-10 fa ${faIcon.old_password} absolute top-[42%] cursor-pointer right-[15px] text-2xl`}
                            onClick={() => showPassword("old_password")}
                          ></i>
                        </div>
                        <div className="mt-3 relative">
                          <label htmlFor="password" className="font-semibold">
                            New Password
                          </label>
                          <input
                            onChange={handleValidation}
                            id="password"
                            name="password"
                            type={passwordType.password}
                            autoComplete="current-password"
                            required
                            className="shadow relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="New Password"
                          />
                          <i
                            className={`z-10 fa ${faIcon.password} absolute top-[42%] cursor-pointer right-[15px] text-2xl`}
                            onClick={() => showPassword("password")}
                          ></i>
                        </div>
                        <div className="mt-3 relative">
                          <label htmlFor="password" className="font-semibold">
                            Retype New Password
                          </label>
                          <input
                            onChange={handleValidation}
                            id="retype_password"
                            name="retype_password"
                            type={passwordType.retype_password}
                            autoComplete="current-password"
                            required
                            className="shadow relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Retype New Password"
                          />
                          <i
                            className={`z-10 fa ${faIcon.retype_password} absolute top-[42%] cursor-pointer right-[15px] text-2xl`}
                            onClick={() => showPassword("retype_password")}
                          ></i>
                        </div>
                      </div>
                      <div>
                        <button
                          onClick={submitForm}
                          type="submit"
                          className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          <span className="absolute opacity-50 inset-y-0 left-0 flex items-center pl-3">
                            <i className="fa fa-2x fa-lock "></i>
                          </span>
                          Submit Now
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
};

export default ChangePassword;
