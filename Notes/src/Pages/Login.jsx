import React, { useState } from 'react'
import api from '../Helpers/axiosconfig'
import { Link } from 'react-router-dom';

const Login = () => {

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { user, pass });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="
      min-h-screen w-full 
      bg-[#F8FAFC] dark:bg-[#0D1117] 
      flex justify-center items-center 
      transition-all duration-300 p-4
    ">

      <div className="
        bg-white dark:bg-[#161B22] 
        shadow-xl rounded-2xl 
        p-10 flex flex-col items-center gap-6 
        border border-gray-300 dark:border-[#2D333B]
        w-full max-w-md
        transition-all
      ">

        {/* Header */}
        <div className='flex flex-col items-center gap-2 text-center'>
          <h1 className='text-3xl font-bold text-[#3B82F6]'>
            <i>Notes</i>
            <span className='text-[#1F2937] dark:text-[#E5E7EB]'>Manager</span>
          </h1>

          <h2 className='text-2xl font-semibold text-[#1F2937] dark:text-[#E5E7EB]'>
            Welcome Back
          </h2>

          <p className='font-medium text-gray-600 dark:text-[#9CA3AF]'>
            Don't have an account?{" "}
            <Link 
              to="/register" 
              className='text-[#3B82F6] hover:text-[#60A5FA] underline'
            >
              Register
            </Link>
          </p>
        </div>

        {/* Form */}
        <form 
          onSubmit={handleLogin} 
          className='w-[90%] max-w-80 flex flex-col gap-4'
        >

          <input 
            className="
              border border-gray-300 dark:border-[#2D333B] 
              bg-white dark:bg-[#0D1117] 
              text-[#1F2937] dark:text-[#E5E7EB] 
              rounded-md py-2 px-3 
              focus:outline-none focus:ring-2 focus:ring-[#3B82F6]
              transition
            " 
            type="text" 
            placeholder='Username'
            value={user}
            onChange={(e)=>setUser(e.target.value)}
          />

          <input 
            className="
              border border-gray-300 dark:border-[#2D333B] 
              bg-white dark:bg-[#0D1117] 
              text-[#1F2937] dark:text-[#E5E7EB] 
              rounded-md py-2 px-3
              focus:outline-none focus:ring-2 focus:ring-[#3B82F6]
              transition
            "
            type="password"
            placeholder='Password'
            value={pass}
            onChange={(e)=>setPass(e.target.value)}
          /> 

          <button 
            type='submit'
            className='
              bg-[#3B82F6] text-white py-2 rounded-md font-semibold 
              hover:bg-[#2563EB] transition
            '
          >
            Login
          </button>

        </form>

      </div>
    </div>
  );
};

export default Login;
