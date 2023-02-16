import React from 'react';
import {Link, NavLink} from "react-router-dom";

export const Navbar = () => {
    return (
        <div className={'navbar'}>
            <div className="navbar__links">
                <NavLink to='/' style={{textDecoration:'none'}}>Посты</NavLink>
                <NavLink to="/about" style={{textDecoration:'none'}}> О сайте </NavLink>
            </div>
        </div>
    );
};

