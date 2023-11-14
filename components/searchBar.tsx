import React from "react"

const SearchBar = () => {

    return (
        <>
        <div className="relative">
            <form name="search">
                <input type="text" className="p-5 w-50 h-10 border-4 border-teal-700 rounded-full box-border font-sans text-sm" name="txt" />
            </form>
            <i className="fas fa-search"></i>
        </div>
        </>
    
    );
}

export default SearchBar