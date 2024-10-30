import React, { useContext } from 'react';
import logo from '../../images/Logo.svg';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../Contexts/UserContext';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    const menuItems = [
        { name: "Shop", path: "/" },
        { name: "Order Review", path: "/order" },
        { name: "Manage Inventory", path: "/inventory" },
    ].map((item) => (
        <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
                isActive
                    ? "border-b-4 border-b-[#FF9900] font-extrabold text-[#FF9900]"
                    : "hover:border-b-4 hover:border-b-[#FF9900] transition duration-300"
            }
        >
            {item.name}
        </NavLink>
    ));

    return (
        <div className="navbar text-white bg-[#1C2B35] p-5 shadow-2xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={1}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#1C2B35] rounded-box w-48"
                    >
                        {menuItems}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost">
                    <img src={logo} alt="Logo" className='w-28 lg:w-full' />
                </Link>
            </div>

            {/* Navbar Center */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0 gap-4">{menuItems}</ul>
            </div>

            {/* Navbar End */}
            <div className="navbar-end">
                {user?.uid ? (
                    <button className="btn btn-outline btn-error" onClick={logOut}>Log Out</button>
                ) : (
                    <Link to="/login" className="hover:text-[#FF9900] transition duration-200">
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Header;
