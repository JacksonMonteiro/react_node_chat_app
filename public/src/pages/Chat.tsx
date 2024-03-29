import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ChatContainer from "../components/ChatContainer";
import Contact from "../components/Contact";
import Welcome from "../components/Welcome";
import { allUsersRoute, baseUrl, } from "../utils/Api";
import { io } from 'socket.io-client';

type CurrentUser = {
    _id: string
    isAvatarImageSet: boolean,
}

const Chat = () => {
    const socket = useRef<any>();

    const navigate = useNavigate();

    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState<CurrentUser>();
    const [currentChat, setCurrentChat] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            if (!localStorage.getItem('chat-app-user')) {
                navigate('/');
            } else {
                setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')!.toString()));
                setIsLoaded(true);
            }
        }

        checkUser();
    }, []);

    useEffect(() => {
        const getUsers = async() => {
            if (currentUser) {
                if (currentUser.isAvatarImageSet) {
                    const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                    setContacts(data.data);
                } else {
                    navigate('/setAvatar');
                }
            }
        }

        getUsers();
    }, [currentUser]);


    useEffect(() => {
        if (currentUser) {
            socket.current = io(baseUrl);
            socket.current.emit('add-user', currentUser._id);
        }
    }, [currentUser]);

    const handleChatChange = (chat: number) => {
        setCurrentChat(chat)
    }

    return(
        <Container>
            <div className="container">
                <Contact contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
                {
                    isLoaded && currentChat === 0 ?
                    (<Welcome currentUser={currentUser} />) :
                    (<ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />)
                }
            </div>
        </Container>
    );
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    background-color: #131324;

    .container {
        height: 85vh;
        width: 85vw;
        background-color: #00000076;
        display: grid;
        grid-template-columns: 25% 75%;

        @media screen and (min-width: 600px) and (max-width: 1080px) {
            grid-template-columns: 35% 65%;
        }
    }
`;

export default Chat;