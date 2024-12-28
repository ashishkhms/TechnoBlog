import { SigninInput } from "@ashishdtu007/common";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LabelledInput } from "./LabelledInput";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const SigninAuth = () => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SigninInput>({
        email: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = useState<string>("");
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postInputs);
            const jwt = response.data.jwt;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch (err: any) {
            const errorStatus = err.response?.status;
            const errorResponse = err.response;

            console.log({ errorStatus, errorResponse });

            if (errorResponse && errorStatus === 403) {
                setErrorMessage("Username or Password is incorrect.");

                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }

                timeoutRef.current = window.setTimeout(() => {
                    setErrorMessage("");
                    timeoutRef.current = null; 
                }, 5000);
            } else {
                alert("Error while sending the request");
            }
        }
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="flex flex-col">
                <div className="text-3xl font-extrabold px-10">Sign In Account</div>
                <div className="text-slate-400 font-semibold px-7">
                    Don't Have An Account ?
                    <Link to={"/signup"} className="pl-2 underline">
                        SignUp
                    </Link>
                </div>
                <LabelledInput
                    key={"email"}
                    label="Email"
                    type="text"
                    placeholder="Enter your Email"
                    onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            email: e.target.value
                        });
                    }}
                />
                <LabelledInput
                    key={"password"}
                    label="Password"
                    type="password"
                    placeholder="Enter your Password"
                    onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        });
                    }}
                />
                {errorMessage && (
                    <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
                )}
                <button
                    onClick={sendRequest}
                    type="button"
                    className="mt-5 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                    Sign In
                </button>
            </div>
        </div>
    );
};
