"use client";

import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function forgotPassword(){
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: ""
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


    const onforgetPassword = async ()=>{
        try {
            setLoading(true);
            const response = await axios.post("/api/users/forgotPassword", user);
            console.log("Forget Password Page", response.data);
            router.push("/login");
        } catch (error:any) {
            console.log("User Not found", error.message);
            toast.error(error.message);
        } finally{
        setLoading(false);
        }

    }

     useEffect(() => {
            if(user.email.length > 0) {
                setButtonDisabled(false);
            } else{
                setButtonDisabled(true);
            }
        }, [user]);
    

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Forgot Password Page" }</h1>
            <hr />
            <label htmlFor="email">Enter your registered Email...</label>
            <input 
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({...user,email: e.target.value})}
                placeholder="Enter your Email..."
            />

            <button
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            onClick={onforgetPassword}
            >Forgot Password</button>
        </div>
    )
}

