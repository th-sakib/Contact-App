import { BiSolidContact } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { useState } from "react";

const Navbar = ({ isOpen, onOpen, setParams, filteredData }) => {


    return (
        <div>
            <div className="bg-white rounded-lg flex intem-center justify-center flex items-center mt-4">
                <BiSolidContact className="text-3xl" />
                <h1 className="font-Protest-Guerrilla p-2 text-2xl font-bold ">
                    Contact App
                </h1>
            </div>
            <div className="flex items-center mt-3 relative">
                <FaSearch className="text-white absolute left-[0.6rem]" />
                <input
                    className="bg-transparent text-white border-[1px] rounded relative pl-8 h-10 w-full"
                    type="text"
                    placeholder="Search Contact"
                    onChange={filteredData}
                />
                <FaCirclePlus onClick={onOpen} className="text-white ml-2 font-thin text-5xl cursor-pointer"/>
            </div>
        </div>
    );
};

export default Navbar;
