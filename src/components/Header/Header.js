import React, { useContext } from 'react';
import logo from '../../images/Logo.svg'
// import './Header.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/UserContext';

const Header = () => {
    const { user, logOut } = useContext(AuthContext)
    return (
        <div className='navbar bg-[#1C2B35] drop-shadow-2xl p-4'>
            <div className="navbar-start ">
                <img src={logo} alt="" />
            </div>

            <div className="navbar-end lg:flex gap-4 me-10 text-[#FFFFFF]">
                <Link to="/" className='hover:text-[#FF9900]'>Shop</Link>
                <Link to="/order" className='hover:text-[#FF9900]'>Order Review</Link>
                <Link to="/inventory" className='hover:text-[#FF9900]'> Manage Inventory</Link>

                {
                    user?.uid ?
                        <button onClick={logOut} className='btn btn-error'>Log Out</button>
                        :
                        <Link to="/login" className='hover:text-[#FF9900]'>Login</Link>
                }
            </div>


        </div>

    );
};

export default Header;