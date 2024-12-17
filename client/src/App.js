import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        
        const token = localStorage.getItem("token");
        if (token) {
            check()
            .then((data) => {
                user.setUser(data);
                user.setIsAuth(true);
            }).finally(() => setLoading(false))
            .catch((error) => {
                console.error("Ошибка проверки токена:", error);
                localStorage.removeItem("token");
            });
        } else {
            console.log("Токен отсутствует. Пользователь не авторизован.");
        }
        
        if (loading) {
            return <Spinner animation={"grow"}/>
        }
    }, [])

    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
        </BrowserRouter>
    );
});

export default App;
