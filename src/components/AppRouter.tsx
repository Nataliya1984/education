import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Posts from "../pages/Posts";
import {About} from "../pages/About";
import {ErrorPage} from "../pages/ErrorPage";
import {PostIdPage} from "../pages/PostIdPage";
import {ROUTS} from "../router/routes";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path={ROUTS.DEFAULT} element={<Posts/>}/>
            <Route path={ROUTS.ABOUT} element={<About/>}/>
            <Route path={ROUTS.POSTS_ID_ID} element={<PostIdPage/>}/>
            <Route path={ROUTS.ERROR} element={<ErrorPage/>}/>
            <Route path="*" element={<Navigate to={ROUTS.ERROR}/>}/>
        </Routes>
    );
};
