import React, {useState} from "react";
import { BsSearch } from "react-icons/bs";
import "./SearchBar.css"
const SearchBar = ({onSearch})=>{
    const [search, setSearch]= useState("");
    
    const handleSearchChange = (e)=>{
        const value = e.target.value;
        setSearch(value);
        
    };
    const handleKeyDown = (e)=>{
      if(e.key === "Enter"){
        onSearch(search);
      }
    }
    return (
        <div className="input-wrapper">
            <BsSearch id="search-icon"/>
            <input placeholder="Search" value={search} onChange={handleSearchChange} onKeyDown={handleKeyDown}/>
        </div>
    )
}

export default SearchBar