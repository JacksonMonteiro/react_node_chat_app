import { BiPowerOff } from 'react-icons/bi';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Logout = () => {
    const navigate = useNavigate();
    const handleClick = async() => {
        localStorage.clear();
        navigate('/');
    }

    return (
        <Button onClick={handleClick}>
            <BiPowerOff></BiPowerOff>
        </Button>
    );
}

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items:center;
    padding: .5rem;
    border-radius: .5rem;
    background-color: #9a86f3;
    border: none;
    cursor: pointer;
    
    svg {
        font-size: 1.2rem;
        color: #ebe7ff;
    }
`;

export default Logout;