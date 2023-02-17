import React, {useContext} from 'react';
import {MyInput} from "../components/UI/Input/MyInput";
import {MyButton} from "../components/UI/button/MyButton";
import {AuthContext} from "../context/context";

export const Login = () => {

    //достаем из контекста
    const {isAuth, setIsAuth} = useContext(AuthContext)

    //сохраняем в localStorage
    //по ключу auth будем сохранять строку true
    const login =(event:any)=>{
        //для того, что бы страница не обновлялась
        event.preventDefault()
        setIsAuth(true)
        localStorage.setItem('auth', 'true')
    }

    return (
        <div>
            <h1>Страница логинизации</h1>
            <form onSubmit={login}>
               <MyInput type='text' placeholder={'Введите логин'}/>
               <MyInput type='password' placeholder={'Введите пароль'}/>
                <MyButton onClick={()=>{}}>Войти</MyButton>
            </form>
        </div>
    );
};
