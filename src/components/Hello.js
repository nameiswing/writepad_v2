import styled from 'styled-components';
import { useContextProvider } from '../context/ContextProvider';
import { useState } from 'react';
import { FlexWrap } from '../utils/components';

const Hello = () => {

    const { getTime } = useContextProvider();
    const { hour } = getTime();

    const [ width, setWidth ] = useState(999);
    const [ greeting ] = useState(greet());

    function greet() {
        if(hour < 12 && hour > 1) return "Good Morning";
        if(hour < 18) return "Good Afternoon";
        if(hour < 24 || hour < 1) return "Good Evening";
        return "Hello"
    }


    window.addEventListener('resize', () => setWidth(window.innerWidth));

    return (
        <Container padding={2} grow={1} direction="column" align="center" justifyContent="center">
            <HelloTag>{ greeting }, User!</HelloTag>
            <Instructions>To add a note, click the "+" button on the top left corner of your browser.</Instructions>
            <Instructions>To view saved notes, click the "&#8801;" button.</Instructions>
            { width <= 500 &&
            <Instructions>If you can't see the buttons, try resizing your browser window.</Instructions>
            }
        </Container>
    )
}

export default Hello

const Container = styled(FlexWrap)`
    max-height: 100vh;

    @media only screen and (max-width: 500px) {
        height: 100vh;
    }
`
const HelloTag = styled(FlexWrap)`
    background-color: var(--accent1);
    border-radius: .5rem;
    color: var(--text3);
    font-size: clamp(2rem, 4vw, 2.5rem);
    font-weight: 500;
    margin-bottom: 1.5rem;
    padding: 1rem 2rem;
`
const Instructions = styled.div`
    color: var(--text3);
    font-size: clamp(.875rem, 2vw, 1rem); 
    line-height: 2rem;
    text-align: center;
`