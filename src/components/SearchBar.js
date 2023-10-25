import React, { useState, useEffect, useRef } from "react";


const SearchBar = ({setSearchInput}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const initialRender = useRef(true)
useEffect(()=>{
    if(initialRender.current){
        initialRender.current = false
        return;
    }
    const timer = setTimeout(()=>{
       setSearchInput(searchTerm)
    }, 1000)
    return () => clearTimeout(timer)
},[setSearchInput, searchTerm])

const handleFetch = () => {
    
}
  return (
    <div className="absolute w-full h-20 flex justify-center items-center bg-[#880808]/60">
      <input
        type="text"
        placeholder="Search Movies"
        className="w-[95%] h-1/2 bg-black/80 rounded-full px-4 focus:outline-none text-white"
        onChange={(e)=> setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      <button onClick={handleFetch} className="p-2 border bg-black text-white">Search</button>
    </div>
  );
};

export default SearchBar;
