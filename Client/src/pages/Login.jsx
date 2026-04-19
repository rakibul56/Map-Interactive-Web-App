//import { useEffect, useState } from "react";
//import { AuthContext } from "../contexts/UserContext";
import axios from "axios";
import {  useNavigate } from "react-router-dom";


const Login = () => {
 
  const naviget = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
 try {
   const response = await axios.post("http://localhost:3001/api/users/login", {
     email,
     password,
   });

   localStorage.setItem("user", JSON.stringify(response.data));
   //console.log(response);
   naviget("/EduInfoFinder");
 } catch (error) {
   if (error.response) {
     
     if (error.response.status === 401) {
       alert(error.response.data.message);
     } else {
       alert("An error occurred: " + error.response.data.message);
     }
   } else if (error.request) {
     
     alert("No response received from server");
   } else {
     
     alert("Error: " + error.message);
   }
 }
  };

  return (
    <div className="container mx-auto flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        {" "}
        <div> </div>
        <h2 className="mb-4 text-2xl font-bold">Login</h2>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded"
        >
          Login
        </button>
      </form>
      <div className="flex justify-center p-4">
        <button
          
          className="  p-2 bg-gray-400 text-white rounded mt-2"
        >
          LogIn with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
