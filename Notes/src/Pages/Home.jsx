import React, { useEffect, useState } from 'react'
import api from '../Helpers/axiosconfig'
import NoteCard from '../Component/NoteCard';
import { useSearch } from '../context/SearchContext';

const Home = () => {
  const[note,setNote]=useState([]);

  const {search}=useSearch();


  useEffect(()=>{
    fetchNotes();
  },[])
  const filteredNotes = note.filter(n =>
  n.title.toLowerCase().includes(search.toLowerCase()) 
);

  

  const fetchNotes =async()=>{
    
    const res =await api.get("/notes");
    // console.log(res.data);
    
    setNote(res.data)
    
    
  }
  return (
    <div className='min-h-screen py-20 w-full grid grid-cols-4 gap-4    bg-[#F8FAFC]   dark:bg-[#0D1117]'>
      
      {filteredNotes.length>0 && filteredNotes.map((n, i) => (
  <div key={i}>
    <NoteCard note={n} />
  </div>
))}
{filteredNotes.length===0 &&
(
  <div className="col-span-4 text-center text-gray-500 dark:text-gray-400 text-lg mt-10 ">
    No Notes With Such Title
  </div>
)}

      
    </div>
  )
}

export default Home
