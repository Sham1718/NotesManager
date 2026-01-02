import React, { useState } from 'react'
import api from '../Helpers/axiosconfig';

const Register = () => {

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const HandleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", { user, email, phone, pass });
      alert("User registered successfully!");
      window.location.href = "/login";

    } catch {
      alert("User already exists!");
    }
  };

  return (
    <div className="
      min-h-screen w-full 
      bg-[#F8FAFC] dark:bg-[#0D1117] 
      flex justify-center items-center 
      overflow-hidden p-4
    ">

      <div className="
        bg-white dark:bg-[#161B22] 
        shadow-xl rounded-2xl 
        p-10 flex flex-col items-center gap-6 
        border border-gray-300 dark:border-[#2D333B] 
        w-full max-w-md 
        transition-all
      ">

        {/* Title */}
        <h1 className="
          text-3xl font-extrabold tracking-wide 
          text-[#1F2937] dark:text-[#E5E7EB] text-center
        ">
          Register
        </h1>

        {/* Form */}
        <form className="w-full flex flex-col gap-4" onSubmit={HandleRegister}>

          {/* Username */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 dark:text-[#9CA3AF] text-sm font-medium">
              Enter Username:
            </label>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="
                p-2 rounded-lg 
                bg-white dark:bg-[#0D1117] 
                border border-gray-300 dark:border-[#2D333B]
                text-[#1F2937] dark:text-[#E5E7EB]
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 dark:text-[#9CA3AF] text-sm font-medium">
              Enter Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                p-2 rounded-lg 
                bg-white dark:bg-[#0D1117] 
                border border-gray-300 dark:border-[#2D333B]
                text-[#1F2937] dark:text-[#E5E7EB]
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 dark:text-[#9CA3AF] text-sm font-medium">
              Enter Phone No:
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="
                p-2 rounded-lg 
                bg-white dark:bg-[#0D1117] 
                border border-gray-300 dark:border-[#2D333B]
                text-[#1F2937] dark:text-[#E5E7EB]
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 dark:text-[#9CA3AF] text-sm font-medium">
              Enter Password:
            </label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="
                p-2 rounded-lg 
                bg-white dark:bg-[#0D1117] 
                border border-gray-300 dark:border-[#2D333B]
                text-[#1F2937] dark:text-[#E5E7EB]
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="
              mt-4 w-full bg-blue-600 
              hover:bg-blue-700 
              text-white py-2 rounded-lg 
              font-semibold transition duration-300 shadow-md
            "
          >
            Submit
          </button>

        </form>
      </div>

    </div>
  );
};

export default Register;
