import React, { useState } from 'react'
import { useCallback } from 'react';
import debounce from "lodash.debounce";
import { useSearch } from '../context/SearchContext';

const Searchbar = ({onSearch}) => {
 const{setSearch}=useSearch();
 const handleSearch=useCallback(debounce((value)=>{setSearch(value)},300),[])
  
  return (
    <div>
      <input type="text"
      placeholder='search notes'  
      onChange={(e)=>handleSearch(e.target.value)}
      className=" p-2 rounded-md 
        bg-[#F1F5F9] dark:bg-[#1F2937] 
        border border-black dark:border-[#374151] 
        text-[#1F2937] dark:text-white 
        focus:outline-none focus:ring-2 focus:ring-[#3B82F6] 
        transition w-52 md:w-72"/>
    </div>
  )
}

export default Searchbar
