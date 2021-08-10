import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Divider, Popover } from '@material-ui/core';
import { FlexItem, FlexWrap } from '../utils/components';
import { useContextProvider } from '../context/ContextProvider';
import { Helmet as Head } from 'react-helmet';
import { HelpOutline } from '@material-ui/icons';
import DeleteAlert from './DeleteAlert';

const NoteList = () => {

    const { notes, dispatch } = useContextProvider();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [ { posX, posY }, setPosition ] = useState({ posX: 0, posY: 0 });
    const [ deleteAlert, setDeleteAlert ] = useState(false);
    const [ itemToDelete, setItemToDelete ] = useState(null);

    const [currentNote, setCurrentNote] = useState({ 
        title:'', details:'', date:'', id:'', important:'' 
    })
    

    function openPopover(e) {
        setPosition({ posX: e.clientX, posY: e.clientY })
        e.preventDefault();
        e.stopPropagation();
        setAnchorEl(e.target);
    }
    function closePopover() {
        setAnchorEl(null)
    }
    
    function openDeleteDialog() {
        setDeleteAlert(true)
        closePopover();
    }
    function closeDeleteDialog(e) {
        e.stopPropagation();
        setDeleteAlert(false);
    }
    
    
    async function editItem() {
        localStorage.removeItem('currentNote');
        localStorage.setItem('currentNote', JSON.stringify(currentNote))
        setTimeout(() => {
            const newNoteButtonBase = document.getElementById('new-note');
            newNoteButtonBase.click();
        }, 100)
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
                <NotesWrapper id="note-item" direction="column-reverse">
                    {notes.length > 0 && notes.map( note => (
                        <ContentWrap 
                            key={ note.id }
                            width="100%"   
                            height="3rem" 
                            align="center"
                            onContextMenu={ (e)=>{
                                openPopover(e);
                                setItemToDelete(note.id);
                                setCurrentNote({
                                    title: note.title,
                                    details: note.details,
                                    date: note.date,
                                    id: note.id,
                                    important: note.important,
                                })    
                            }}
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
                    ))}
                </NotesWrapper>
                <Popover
                    open={open}
                    onClose={closePopover}
                    anchorReference="anchorPosition"
                    anchorPosition={{ top: posY, left: posX }}
                >
                    <FlexWrap direction="column">
                        <ContextOption 
                            padding={1.1}
                            onClick={ () => editItem()}
                        >
                            Edit
                        </ContextOption>
                        <Divider />
                        <ContextOption 
                            padding={1.1}
                            onClick={openDeleteDialog}
                        >
                            Delete
                        </ContextOption>
                    </FlexWrap>
                </Popover>
                <DeleteAlert 
                    open={deleteAlert}
                    handleClose={closeDeleteDialog}
                    itemToDelete={itemToDelete}
                />
                <Divider />
                <Footer padding={2} align="center">
                    <HelpOutline color="secondary" fontSize="small" />&nbsp;
                    <FlexWrap>Right click on a note to see options.</FlexWrap>
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
    font-size: clamp(.75rem, 2vw, .875rem);
    overflow: hidden;
    padding: 0.375rem .5rem;
    margin: .5rem;
    text-overflow: ellipsis;
    align-items: center;
    text-align: center;
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
    justify-content: start;

    &::-webkit-scrollbar { display: none; }
`
const ContextOption = styled(FlexWrap)`
    font-size: .75rem;
    justify-content: center;
    cursor: pointer;
    /* margin: .25rem; */

    &:hover { 
        background-color: var(--text3);
    }
`
const Footer = styled(FlexWrap)`
    font-size: .875rem;
    color: var(--text3);
    justify-self: end;
`