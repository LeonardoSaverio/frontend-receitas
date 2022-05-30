import React, { Fragment } from 'react'
import { BrowserRouter, Route, Switch, Routes } from 'react-router-dom'

import Home from './pages/Home'
import RegisterReceita from './pages/RegisterReceita'
import MyReceitas from './pages/MyReceitas'
import Header from './components/Header'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ReceitaDetail from './pages/ReceitaDetail'

import useAuth from "./hooks/useAuth";

const Private = ({ Item }) => {
    const { signed } = useAuth();

    return signed > 0 ? <Item /> : <SignIn />;
};

const AppRoutes = () => (
    <>
        <Header />
        <Routes>
            <Route exact path="/home" element={<Private Item={Home} />} />
            <Route exact path="/my-receitas" element={<Private Item={MyReceitas} />} />
            <Route exact path="/receita-new" element={<Private Item={RegisterReceita} />} />
            <Route exact path="/receita/:id" element={<Private Item={ReceitaDetail} />} />

        </Routes>
    </>

)

const AuthRoutes = () => (
    <Routes>
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/" element={<SignIn />} />
        <Route path="*" element={<SignIn />} />
    </Routes>
)

export default function IndexRoutes() {
    const { signed } = useAuth();

    return (
        <BrowserRouter>
            <Fragment>
                {signed > 0 ? <AppRoutes /> : <AuthRoutes />}
            </Fragment>
        </BrowserRouter>
    )
}
