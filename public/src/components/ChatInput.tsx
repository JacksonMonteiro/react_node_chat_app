import styled from 'styled-components';
import Picker from 'emoji-picker-react';

import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';
import { FormEvent, useState } from 'react';

type Props = {
    handleSendMsg: (msg: string) => void,
}

const ChatInput = ({ handleSendMsg } : Props) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState('');

    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    }

    const handleEmojiClick = (event: any, emoji: any) => {
        let message = msg;
        message += emoji.emoji;
        setMsg(message)
    }

    const sendChat = (event: FormEvent) => {
        event.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg('');
        }
    }

    return(
        <Container>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
                    {
                        showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}/>
                    }
                </div>
            </div>

            <form className='input-container' onSubmit={(e) => sendChat(e)}>
                <input type="text" placeholder="Digite sua mensagem aqui" value={msg} onChange={(e) => setMsg(e.target.value)} />
                <button className="submit">
                    <IoMdSend />
                </button>
            </form>
        </Container>
    );
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 5% 95%;
    align-items: center;
    background-color: #080420;
    padding: 0 2rem;
    padding-top: .5rem;
    height: 9%;

    .button-container {
        display: flex;
        align-items: center;
        color: #FFF;
        gap: 1rem;
        .emoji {
            position: relative;
            svg {
                font-size: 1.5rem;
                color: #FFFf00c8;
                cursor: pointer;
            }
        }

        .emoji-picker-react {
            position: absolute;
            top: -350px;
            background-color: #080420;
            box-shadow: 0 5px 10px #9a86f3;
            border-color: #9a86f3;

            .emoji-scroll-wrapper::-webkit-scrollbar {
                background-color: #080420;
                width: 5px;

                &-thumb {
                    background-color: #9a86f3;
                }
            }

            .emoji-categories {
                button {
                    filter: contrast(0);
                }
            }

            .emoji-search {
                background-color: transparent;
                border-color: #9186f3;
                color: #FFF;
            }

            .emoji-group:before {
                background-color: #080420;
            }
        }
    }

    .input-container {
        width: 100%;
        border-radius: 2rem;
        display: flex;
        align-items: center;
        gap: 2rem;
        background-color: #FFFFFF34;

        input {
            width:90%;
            height: 60%;
            background-color: transparent;
            color: #FFF;
            border: none;
            padding-left: 1rem;
            font-size: 1.2rem;
            outline: none;

            &::selection {
                background-color: #9186f3;
            }
        }

        button {
            padding: .5rem 2rem;
            border-radius: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #9a86f3;
            border:none;
            svg {
                font-size: 1rem;
                color: #FFF;
            }
        }
    }
`;

export default ChatInput;