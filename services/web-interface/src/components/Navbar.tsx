"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/config/navigation";


const Navbar = () => {
    const pathname = usePathname()
    return (
        <div className="w-full h-20 bg-emerald-800 sticky top-0">
            <div className="flex justify-between items-center h-full">
                <ul className="hidden md:flex gap-x-6 text-white mx-4">
                    <li key={navigation[0].path}>
                        <Link href={navigation[0].path} className={ "mx-4 " + ((pathname === "" || pathname === "/") ? "bg-gray-900 text-white" : `'text-gray-300 hover:bg-gray-700 hover:text-white','rounded-md px-3 py-2 text-sm font-medium'`)}>
                            <p>{navigation[0].name}</p>
                        </Link>
                    </li>
                    {
                        navigation.slice(1).map(({ path, name }) => {
                            return (<li key={path}>
                                <Link href={path} className={pathname.startsWith(path) ? "bg-gray-900 text-white" : "'text-gray-300 hover:bg-gray-700 hover:text-white','rounded-md px-3 py-2 text-sm font-medium'"}>
                                    <p>{name}</p>
                                </Link>
                            </li>)
                        })
                    }
                </ul>
            </div>
        </div >
    );
};

export default Navbar;