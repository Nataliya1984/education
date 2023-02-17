import React, {useContext} from 'react';
import {Link, NavLink} from "react-router-dom";
import {MyButton} from "../button/MyButton";
import {AuthContext} from "../../../context/context";

export const Navbar = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext)

    //когда мы нажимаем на кнопку выйти, нам необходимо эту запись из localStorage удалять
    const logout = ()=>{
        setIsAuth(false)
        localStorage.removeItem('auth')
    }

    return (
        <div className={'navbar'}>
            <MyButton onClick={logout}>Выйти</MyButton>
            <div className="navbar__links">
                <NavLink to={'/'} style={{textDecoration:'none'}}>Посты</NavLink>
                <NavLink to={'/about'} style={{textDecoration:'none'}}> О сайте </NavLink>
            </div>
        </div>
    );
};

