import {$authHost, $host} from "./index";
import jwtDecode from 'jwt-decode';

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'ADMIN'})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("Токен отсутствует!");
        }
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token)
        }
        catch (error) {
            console.error("Ошибка авторизации:", error.response?.data?.message || error.message);
            throw error;
        }
}
