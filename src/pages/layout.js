import React, {useState} from "react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import MobileNavbar from "@/components/MobileNavbar";


const Layout = ({ children }) => {
  const [showsNav, setShowsNav] = useState(false)
  return (
    <>
      <Navbar searchTerm='movies' onOpen={()=> setShowsNav(true)}/>
      <div className={`md:hidden w-full absolute duration-200 top-10 ${!showsNav ? '-right-full': 'right-[0]'}`}>
        <MobileNavbar onClose={() => setShowsNav(false)}/>
      </div>
      {/* <SearchBar/> */}

      {children}
    </>
  );
};

export default Layout;
