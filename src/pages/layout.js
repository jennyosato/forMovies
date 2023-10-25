import React from "react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar searchTerm='movies'/>
      {/* <SearchBar/> */}

      {children}
    </>
  );
};

export default Layout;
