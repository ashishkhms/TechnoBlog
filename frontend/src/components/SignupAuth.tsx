import { SignupInput } from "@ashishdtu007/common";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LabelledInput } from "./LabelledInput";
import axios from "axios";
import { BACKEND_URL } from "../config";


export const SignupAuth = ()=>{
    const navigate = useNavigate();

    const [postInputs, setPostInputs] = useState<SignupInput>({
        name : "",
        email : "",
        password : ""
    });

    async function sendRequest(){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs);
            const jwt = response.data.jwt;
            localStorage.setItem("token", jwt);
            navigate("/blogs");  
        } catch(err){
            alert('Error while sending the request');
        }      
    }


    return ( 
    <div className="h-screen flex justify-center items-center">
        <div className="flex flex-col">
            <div className="text-3xl font-extrabold px-5">
                Create An Account
            </div>
            <div className="text-slate-400 font-semibold px-7">
            Already have an Account ?
                <Link to={"/signin"} className="pl-2 underline">Login</Link>
            </div>
            <LabelledInput label="Name" key={"name"} type="text" placeholder="Enter your Name" onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    name : e.target.value
                })
            }}/>
             <LabelledInput label="Email" key={"email"} type="text" placeholder="Enter your Email" onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    email : e.target.value
                })
            }}/>
             <LabelledInput label="Password" key={"password"} type="password" placeholder="Enter your Password" onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    password : e.target.value
                })
            }}/>
            <button type="button" onClick={sendRequest} className=" mt-5 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                Sign Up
            </button>
        </div>
    </div>
    );
}




