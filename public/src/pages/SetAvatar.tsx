import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import loader from '../assets/loader.gif';
import { toast, ToastContainer, ToastOptions } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { setAvatarRoute } from "../utils/Api";
import { Buffer } from "buffer";

const SetAvatar = () => {
    const api = 'https://api.multiavatar.com/45678945';
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    const toastOptions: ToastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    const setProfilePicture = async () => { };

    useEffect(() => {
        const fetchData = async () => {
            const data : string[] = [];

            for (let i = 0; i < 4; i++) {
                const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
                const buffer = new Buffer(image.data);
                data.push(buffer.toString("base64"));
            }
            
            // Fix Type never errro whe push a string to array 
            setAvatars(data);
            setIsLoading(false);
        }

        fetchData();
    }, []);

    return (
        <>
            <Container>
                <div className="title-container">
                    <h1>Escolha um avatar para ser sua foto de perfil</h1>
                    <div className="avatars">

                    </div>
                </div>
            </Container>
            <ToastContainer />
        </>
    );
}


const Container = styled.div``;

export default SetAvatar;