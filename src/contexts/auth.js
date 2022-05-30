import React, { createContext, useEffect, useState } from "react";
import api from '../services/api'

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const userToken = localStorage.getItem("user_token");

        if (userToken) {
            const hasUser = JSON.parse(userToken)
            api.defaults.headers["Authorization"] = `Bearer ${hasUser.token}`;

            if (hasUser) setUser(hasUser.user);
        }else {
            api.defaults.headers["Authorization"] = null;
        }
    }, []);

    const signin = async (email, password) => {
        const res = await api.post('auth', { email, password })
        const user = res.data.user
        const token = res.data.token
        setUser(user);
        localStorage.setItem("user_token", JSON.stringify({ user, token }));
        api.defaults.headers["Authorization"] = `Bearer ${token}`;
        return res
    };

    const signup = async (name, email, password) => {
        const res = await api.post('register', { name, email, password })
        return res
    };

    const signout = () => {
        setUser(null);
        localStorage.removeItem("user_token");
    };

    return (
        <AuthContext.Provider
            value={{ user, signed: !!user, signin, signup, signout }}
        >
            {children}
        </AuthContext.Provider>
    );
};
