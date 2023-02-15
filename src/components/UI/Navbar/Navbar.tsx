import React from 'react';
import {Link} from "react-router-dom";

export const Navbar = () => {
    return (
        <div className={'navbar'}>
            <div className="navbar__links">
                <Link to="/about" style={{textDecoration:'none'}}> О сайте </Link>
                <Link to="/posts" style={{textDecoration:'none'}}>Посты</Link>
            </div>
        </div>
    );
};

