import React, { useState } from 'react'
import { isLoggedIn, logout } from '../Helpers/auth';
import { Link } from 'react-router-dom';
import Searchbar from './Searchbar';
import useTheme from '../context/ThemeContext';

const Navbar = () => {

  const { Thememode, dark, light } = useTheme();
  



  return (
    <div>
      <nav
        className="
          fixed top-0 left-0 w-full 
          bg-white dark:bg-[#161B22] 
          text-[#1F2937] dark:text-[#E5E7EB]
          px-6 py-3 flex justify-between items-center 
          shadow-md dark:shadow-lg 
          border-b border-gray-300 dark:border-[#2D333B]
          transition-all duration-300 z-50
        "
      >

        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold text-[#3B82F6]">
            Notes Manager
          </h1>
        </div>

       

        {/* Theme Toggle */}
        <button
          onClick={() => {
            Thememode === "light" ? dark() : light();
          }}
          className="
            px-3 py-1 rounded-md 
            bg-gray-200 dark:bg-gray-700 
            text-[#1F2937] dark:text-white 
            hover:bg-gray-300 dark:hover:bg-gray-600 
            transition hover:cursor-pointer
          "
        >
          {Thememode === "light" ?"☀️ Light" :"🌙 Dark"  }
        </button>

        {/* Links */}
        <div className="flex items-center gap-4 text-sm font-medium">

          {!isLoggedIn() ?(
            <>
              <Link 
                to="/login" 
                className="hover:text-[#3B82F6] transition cursor-pointer">
                Login
              </Link>

              <span className="opacity-50">|</span>

              <Link 
                to="/register" 
                className="hover:text-[#3B82F6] transition cursor-pointer" >
                Register
              </Link>
            </>
          ): (
            <>

             {/* Search bar */}
        <Searchbar onSearch={(value)=>setSearch(value)} />
              <Link 
                to="/" 
                className="hover:text-[#3B82F6] transition">
                Home
              </Link>

              <span className="opacity-50">|</span>

              <Link 
                to="/profile" 
                className="hover:text-[#3B82F6] transition">
                Profile
              </Link>

              <span className="opacity-50">|</span>

              <button 
                onClick={logout} 
                className="hover:text-[#3B82F6] transition cursor-pointer">
                Logout
              </button>
            </>
          )  }

        </div>

      </nav>
    </div>
  );
};

export default Navbar;
