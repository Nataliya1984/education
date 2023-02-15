import React, {useEffect, useState} from 'react';
import './styles/App.css'
import {BrowserRouter, Link, Navigate, Route, Routes} from "react-router-dom";
import {About} from "./pages/About";
import Posts from "./pages/Posts";
import {Navbar} from "./components/UI/Navbar/Navbar";
import {ErrorPage} from "./pages/ErrorPage";


function App() {
return(
    <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path='/posts' element={<Posts />}/>
            <Route path='/about' element={<About />}/>
            <Route path="/error" element={<ErrorPage/>}/>
            <Route path="*" element={<Navigate to='error'/>}/>
        </Routes>
    </BrowserRouter>
)

}

export default App;
