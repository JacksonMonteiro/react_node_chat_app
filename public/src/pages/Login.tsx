import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast, ToastContainer, ToastOptions } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import styled from "styled-components";
import Logo from '../assets/logo.svg';
import { loginRoute } from "../utils/Api";

const Login = () => {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        "username": "",
        "password": "",
    });

    const toastOptions: ToastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate('/chat');
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (handleValidation()) {
            const { password, username } = values;
            const { data } = await axios.post(loginRoute, {
                username,
                password,
            });

            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }

            if (data.status === true) {
                localStorage.setItem('chat-app-user', JSON.stringify(data.user));
                navigate('/chat');
            }
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleValidation = () => {
        const { password,  username } = values;

        if (username === '') {
            toast.error("O nome de usuário e a senha são obrigatorios", toastOptions);
            return false;
        } else if (password === '') {
            toast.error("O nome de usuário e a senha são obrigatorios", toastOptions);
            return false;
        } 


        return true;
    }

    return (
        <>
            <FormContainer>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className="brand">
                        <img src={Logo} alt="Logo" />
                        <h1>
                            RTChat
                        </h1>
                    </div>
                    <input type="text" name="username" id="username" placeholder="Nome de usuário" onChange={e => handleInputChange(e)} min={3} />
                    <input type="password" name="password" id="password" placeholder="Senha" onChange={e => handleInputChange(e)} min={8} />
                    <button type="submit"> Login </button>
                    <span>
                        Não tem uma conta? <Link to="/register">Crie uma</Link>
                    </span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    );
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction:column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;

    .brand {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;

        img {
            height: 5rem;
        }

        h1 {
            color: #FFF;
            text-transform: uppercase;
        }
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;

        input {
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: #FFF;
            width: 100%;
            font-size: 1rem;
            outline: none;

            &:focus {
                border: .1rem solid #997af0;
            }
        }

        button {
            background-color: #997af0;
            color: #FFF;
            padding: 1rem 2rem;
            border: none;
            font-weight:bold;
            cursor: pointer;
            border-radius: .4rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition: .5s ease-in-out;
            
            &:hover {
                background-color: #4e0eff;
            }
        }

        span {
            color: #FFF;
            text-transform: uppercase;

            a {
                color: #4e0eff;
                text-decoration: none;
                font-weight: bold;
            }
        }
    }
`;

export default Login;