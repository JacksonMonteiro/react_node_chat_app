import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast, ToastContainer, ToastOptions } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import styled from "styled-components";
import Logo from '../assets/logo.svg';
import { registerRoute } from "../utils/Api";

const Register = () => {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        "username": "",
        "email": "",
        "password": "",
        "confirm_password": ""
    });

    const toastOptions: ToastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (handleValidation()) {
            const { password, username, email } = values;
            const { data } = await axios.post(registerRoute, {
                username,
                email,
                password,
            });

            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }

            if (data.status === true) {
                localStorage.setItem('chat-app-user', JSON.stringify(data.user));
                navigate('/login');
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
        const { password, confirm_password, username, email } = values;

        if (username.length < 3) {
            toast.error("O nome de usuário deve possuir mais de 3 caracteres", toastOptions);
            return false;
        } else if (email === "") {
            toast.error("O E-mail é obrigatório", toastOptions);
            return false;
        } else if (password.length < 8) {
            toast.error("A senha deve possuir no mínimo 8 caracteres", toastOptions);
            return false;
        } else if (password != confirm_password) {
            toast.error("As senhas devem estar iguais nos dois campos", toastOptions);
            return
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
                    <input type="text" name="username" id="username" placeholder="Nome de usuário" onChange={e => handleInputChange(e)} />
                    <input type="email" name="email" id="email" placeholder="E-mail" onChange={e => handleInputChange(e)} />
                    <input type="password" name="password" id="password" placeholder="Senha" onChange={e => handleInputChange(e)} />
                    <input type="password" name="confirm_password" id="confirm_password" placeholder="Confirme sua senha" onChange={e => handleInputChange(e)} />
                    <button type="submit"> Criar Conta </button>
                    <span>
                        Já tem uma conta? <Link to="/login">Faça login</Link>
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

export default Register;