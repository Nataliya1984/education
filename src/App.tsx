import React, {useEffect, useState} from 'react';
import './styles/App.css'
import {HashRouter} from "react-router-dom";
import {Navbar} from "./components/UI/Navbar/Navbar";
import {AppRouter} from "./components/AppRouter";
import {AuthContext} from "./context/context";


function App() {
    const [isAuth, setIsAuth] = useState<boolean>(false)

    //создаем состояние с индикацией закончился запрос или нет
    const [isLoading, setIsLoading] = useState<boolean>(true)

    //что бы страница не перезагружалась необходимо сохранять авторизованы или не авторизованы. Cохраняем данные в localStorage. Проверку делаем в useEffect
    //при первом запуске приложения будем проверять авторизован пользователь или нет

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setIsAuth(true)
        }
        setIsLoading(false)
    }, [])


    return (
        //использовать именно HashRouter
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isLoading
        }}>
            <HashRouter>
                <Navbar/>
                <AppRouter/>
            </HashRouter>
        </AuthContext.Provider>

    )

}

export default App;
