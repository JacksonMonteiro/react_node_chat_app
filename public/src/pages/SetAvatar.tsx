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
    const [avatars, setAvatars] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState<number>(-1);

    const toastOptions: ToastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    const setProfilePicture = async () => {
        if (selectedAvatar === -1) {
            toast.error('Por favor, escolha um avatar', toastOptions);
        } else {
            const user = await JSON.parse(localStorage.getItem('chat-app-user')!.toString());
            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar],
            });

            if (data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem('chat-app-user', JSON.stringify(user));
                navigate('/chat');
            } else {
                toast.error('Erro ao definir avatar, por favor, tente novamente', toastOptions);
            }
        }
    };

    useEffect(() => {
        if (!localStorage.getItem('chat-app-user')) {
            navigate('/');
        }

        const fetchData = async () => {
            const data = [];

            for (let i = 0; i < 4; i++) {
                const image = await axios.get(
                    `${api}/${Math.round(Math.random() * 1000)}`
                );
                const buffer = new Buffer(image.data);
                data.push(buffer.toString("base64"));
            }

            setAvatars(data);
            setIsLoading(false);
        }

        fetchData();
    }, []);

    return (
        <>
            {
                isLoading ? <Container>
                    <img src={loader} alt="loader" className="loader" />
                </Container> : (
                    <Container>
                        <div className="title-container">
                            <h1>Escolha um avatar para ser sua foto de perfil</h1>
                            <div className="avatars">
                                {
                                    avatars.map((avatar, index) => {
                                        return (
                                            <div key={index} className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                                                <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={() => setSelectedAvatar(index)} />
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                        <button className="submit-btn" onClick={setProfilePicture}>Escolher Avatar</button>
                    </Container>
                )
            }
            <ToastContainer />
        </>
    );
}


const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
    flex-direction: column;
    gap:3rem;
    background-color: #131324;
    height: 100vh;
    width: 100vw;

    .loader {
        max-inline-size: 100%;
    }

    .title-container {
        h1 {
            color: white;
        }
    }

    .avatars {
        display: flex;
        justify-content: space-between;
        gap: 2rem;
        padding-top: 2rem;

        .avatar {
            border: .4rem solid transparent;
            padding: .4rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: .5s ease-in-out;
            
            img {
                height: 6rem;
            }
        }

        .selected {
            border: .4rem solid #4e0eff;
        }
    }
    .submit-btn {
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
`;

export default SetAvatar;