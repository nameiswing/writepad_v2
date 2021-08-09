import styled from 'styled-components';
import { useEffect } from 'react';
import { Divider, ButtonBase } from '@material-ui/core';
import { FlexItem, FlexWrap } from '../utils/components';
import { useContextProvider } from '../context/ContextProvider';
import { Helmet as Head } from 'react-helmet';
import { HelpOutline } from '@material-ui/icons';

const NoteList = () => {

    const { notes, dispatch } = useContextProvider();


    function editItem(title, details, date, id, important) {
        const item = { title, details, date, id, important };
        const newNoteButton = document.getElementById('new-note');
        localStorage.setItem('currentNote', JSON.stringify(item));
        newNoteButton.click();
    }

    useEffect( () => {
        const keysNotNull = localStorage.getItem('keys') !== null;
        if(!keysNotNull) localStorage.setItem('keys', '[]');
        dispatch({ type: 'GRAB_STORAGE'})
    }, [dispatch])

    return (
        <MainContainer padding={1} grow={1}>
            <Head>
                <title>Writepad - Note List</title>
            </Head>
            <FlexContainer grow={1} direction="column">
                <Header
                    padding={1}
                    grow={0}
                    shrink={0}
                    height="4rem"
                    align="center"
                    bgcolor="var(--accent1)"
                >
                    <FlexItem width="25%">
                        Title
                    </FlexItem>
                    <Divider orientation="vertical" />
                    <FlexItem width="55%">
                        Details
                    </FlexItem>
                    <Divider orientation="vertical" />
                    <FlexItem width="20%">
                        Created
                    </FlexItem>
                </Header>
                <Divider />
                <NotesWrapper  direction="column">
                    {notes.length > 0 && notes.reverse().map( note => (
                        <ButtonBase key={ note.id } color={ note.important ? "error" : "" }>
                            <ContentWrap 
                                width="100%"   
                                height="3rem" 
                                align="center"
                                onDoubleClick={ () => editItem(
                                        note.title,
                                        note.details,
                                        note.date,
                                        note.id,
                                        note.important,
                                    )}
                            >
                                <FlexChild 
                                    width="25%" 
                                    color="var(--text1)" 
                                    bgcolor={ note.important ? "#ffcdd2" : "#b2ebf2" }
                                >
                                    { note.title }
                                </FlexChild>
                                <FlexChild width="55%" color="var(--text2)">
                                    { note.details }
                                </FlexChild>
                                <FlexChild width="20%" color="var(--text4)" title={note.time}>
                                    { note.date }
                                </FlexChild>
                            </ContentWrap>
                        </ButtonBase>
                    ))}
                </NotesWrapper>
                <Divider />
                <Footer padding={2} align="center">
                    <HelpOutline color="secondary" fontSize="small" />&nbsp;
                    <FlexWrap>Double click a note to edit.</FlexWrap>
                </Footer>
            </FlexContainer>
        </MainContainer>
    )
}

export default NoteList

const MainContainer = styled(FlexWrap)`
    max-height: 100vh;

    @media only screen and (max-width: 500px) {
        height: 100vh;
    }
`
const FlexContainer = styled(FlexWrap)`
    border-radius: 0.25rem;
    box-shadow: var(--shadow1);
`
const Header = styled(FlexWrap)`
    user-select: none;
    font-size: .875rem;
    color: var(--text4);
    font-weight: 600;
`
const ContentWrap = styled(FlexWrap)`
    user-select: none;
    padding: 1rem .375rem;

    /* &:first-child {
        margin-top: .5rem;
    } */

    &:hover {
        background-color: #f5f5f5;
    }
`
const FlexChild = styled.div`
    border-radius: 0.25rem;
    font-size: .875rem;
    overflow: hidden;
    padding: 0.375rem .5rem;
    margin: .5rem;
    text-overflow: ellipsis;
    align-items: center;
    /* text-align: center; */
    white-space: nowrap;
    width: ${ props => props.width };
    background-color: ${ props => props.bgcolor};
    color: ${ props => props.color};

    &:first-child {
        font-weight: 500;
    }
`
const NotesWrapper = styled(FlexWrap)`
    overflow-y: scroll;
    height: calc(100% - 7rem);
    scrollbar-width: none;

    &::-webkit-scrollbar { display: none; }
`
const Footer = styled(FlexWrap)`
    font-size: .875rem;
    color: var(--text3);
    justify-self: end;
`