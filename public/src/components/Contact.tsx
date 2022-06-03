import { useEffect, useState } from "react";
import styled from "styled-components";
import logo from '../assets/logo.svg';

const Contact = ({ contacts, currentUser, changeChat }: any) => {
    const [currentUserName, setCurrentUserName] = useState('');
    const [currentUserImage, setCurrentUserImage] = useState('');
    const [currentSelected, setCurrentSelected] = useState(-1);

    useEffect(() => {
        if (currentUser) {
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);
        }
    }, [currentUser]);

    const changeCurrentChat = (index: number, contact: any) => {
        setCurrentSelected(index);
        changeChat(contact);
    }

    return (
        <>
            {
                currentUserImage && currentUserName && (
                    <Container>
                        <div className="brand">
                            <img src={logo} alt="logo" />
                            <h3>RTChat</h3>
                        </div>
                        <div className="contacts">
                            {
                                contacts.map((contact: any, index: any) => {
                                    return (
                                        <div className={`contact ${index === currentSelected ? 'selected' : ''}`} key={index} onClick={() => changeCurrentChat(index, contact)}>
                                            <div className="avatar">
                                                <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" />
                                            </div>
                                            <div className="username">
                                                <h3>{contact.username}</h3>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <div className="current-user">
                            <div className="avatar">
                                <img src={`data:image/svg+xml;base64, ${currentUserImage}`} alt="avatar" />
                            </div>
                            <div className="username">
                                <h2>{currentUserName}</h2>
                            </div>
                        </div>
                    </Container>
                )
            }
        </>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 75% 15%;
    overflow: hidden;
    background-color: #080420;
    
    .brand {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        
        img {
            height: 2rem;
        }

        h3 {
            color: #FFF;
            text-transform: uppercase;
        }
    }

    .contacts {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: .8rem;

        &::-webkit-scrollbar {
            width: .2rem;
            &::-thumb {
                background-color: #FFFFFF39;
                width: 1rem;
                border-radius: 1rem;
            }
        }
        
        .contact {
            background-color: #FFFFFF39;
            min-height: 5rem;
            width: 90%;
            cursor: pointer;
            border-radius: .2rem;
            padding: .4rem;
            gap: 1rem;
            align-items: center;
            display:flex;
            transition: .5 ease-in-out;

            .avatar {
                img {
                    height: 3rem;
                }
            }

            .username {
                h3 {
                    color: #FFF;
                }
            }
        }

        .selected {
            background-color: #9186f3;
        }
    }

    .current-user {
        background-color: #0d0d30;
        display: flex;
        align-items: center;
        gap: 1rem;
        padding-left: 1rem;

        .avatar {
            img {
                height: 3rem;
                max-inline-size: 100%;
            }
        }

        .username {
            h2 {
                color: #FFF;
            }
        }

        @media screen and (min-width: 720px) and (max-width: 1080px) {
            gap: .5rem;
            .username {
                h2 {
                    font-size: 1rem;
                }
            }
        }
    }
`;

export default Contact;