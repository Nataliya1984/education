import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Posts from "../pages/Posts";
import {About} from "../pages/About";
import {ErrorPage} from "../pages/ErrorPage";
import {PostIdPage} from "../pages/PostIdPage";
import {ROUTS_PRIVATE, ROUTS_PUBLIC} from "../router/routes";
import {Login} from "../pages/Login";
import {AuthContext} from "../context/context";
import {Loader} from "./UI/Loader/Loader";

export const AppRouter = () => {
    //доступ к переменной isAuth

    const {isAuth, isLoading} = useContext(AuthContext)
    console.log(isAuth)

    //что бы незалогинированные пользователи не видели информацию о постах. Для этого создаем некий булеан флаг, где мы будем хранить информацию о том авторизован пользователь или нет
    //const isAuth = false

    //теперь в зависимости от значения этой переменной будем отрисовавать либо ROUTS_PRIVATE, либо ROUTS_PUBLIC

    if (isLoading){
        return <Loader/>
    }

    return (
        isAuth
            ? <Routes>
                <Route path={ROUTS_PRIVATE.DEFAULT} element={<Posts/>}/>
                <Route path={ROUTS_PRIVATE.ABOUT} element={<About/>}/>
                <Route path={ROUTS_PRIVATE.POSTS_ID_ID} element={<PostIdPage/>}/>
                {/*<Route path={ROUTS_PRIVATE.ERROR} element={<ErrorPage/>}/>*/}
                {/*<Route path="*" element={<Navigate to={ROUTS_PRIVATE.ERROR}/>}/>*/}
            </Routes>
            : <Routes>
                <Route path={ROUTS_PUBLIC.LOGIN} element={<Login/>}/>
                <Route path='*' element={<Navigate to={ROUTS_PUBLIC.LOGIN}/>}/>
            </Routes>

    );
};
