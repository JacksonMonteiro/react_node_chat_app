import styled from 'styled-components';
import robot from '../assets/robot.gif';

const Welcome = ({ currentUser } : any) => {
    return(
        <Container>
            <img src={robot} alt="robot" />
            <h1>
                Seja bem-vindo, <span>{currentUser.username}!</span>
            </h1>
            <h3>Por favor, selecione um contato para iniciar uma conversa</h3>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #FFF;
    img {
        height: 20rem;
    }

    span {
        color: #9186f3;
    }
`;

export default Welcome;