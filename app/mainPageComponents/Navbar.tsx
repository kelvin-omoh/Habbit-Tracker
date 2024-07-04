'use client'
import { useRouter } from "next/navigation";
import React from "react";
import { FaLeaf } from 'react-icons/fa'

function Navbar() {
    const defaultColor = "#d90429";
    const backgroundColorStyle = {
        backgroundColor: defaultColor
    };

    const navigate = useRouter()
    return (
        <header>
            <div className="p-8 px-20">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="text-center sm:text-left mb-7 sm:mb-0">
                        {/* Icon + Name of The App */}
                        <div className="flex gap-2 items-center sm:justify-start justify-center">
                            {/* The Icon */}
                            <div style={backgroundColorStyle} className="p-2 rounded-md">
                                <FaLeaf />
                            </div>
                            {/* The Name of the app */}
                            <span style={{ color: "#d90429" }} className="font-bold text-maincolor">
                                Habit Stacker
                            </span>
                            <span className="font-light"> Stacker</span>
                        </div>
                    </div>
                    {/* The buttons */}
                    <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                        <button
                            style={backgroundColorStyle}
                            className={`block sm:w-32 w-full rounded-lg px-9 py-3 text-sm font-medium text-white transition focus:outline-none`}
                            type="button"
                            onClick={() => navigate.push('/sign-in')}
                        >
                            Sign In
                        </button>
                        <button
                            className={`block sm:w-32 w-full border rounded-lg px-9 py-3 text-sm font-medium transition focus:outline-none hover:bg-customRed hover:text-white border-customRed text-customRed`}
                            type="button"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
