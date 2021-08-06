import styled from 'styled-components';
import { useState } from 'react';
import { FlexWrap } from '../utils/components';

const Hello = () => {

    const [ width, setWidth ] = useState(999);

    window.addEventListener('resize', () => setWidth(window.innerWidth));

    return (
        <Container padding={2} grow={1} direction="column" align="center" justifyContent="center">
            <HelloTag>Good Morning User!</HelloTag>
            <Instructions>To start, click the "+" button on the top left of the screen.</Instructions>
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
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 1.5rem;
    padding: 1rem 2rem;
    `
const Instructions = styled.div`
    color: var(--text3);
    font-size: .875rem; 
    text-align: center;
    line-height: 2rem;
`