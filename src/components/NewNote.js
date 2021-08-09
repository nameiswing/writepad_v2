import styled from 'styled-components';
import { useContextProvider } from '../context/ContextProvider';
import { useState, useEffect } from 'react';
import { FlexWrap } from "../utils/components";
import { Button, Divider, IconButton, TextField, Tooltip } from "@material-ui/core";
import { NoteAddOutlined, ErrorOutline } from "@material-ui/icons";
import { Helmet as Head } from 'react-helmet';

const NewNote = () => {

    const { dispatch } = useContextProvider();

    const [ title, setTitle ] = useState('');
    const [ details, setDetails ] = useState('');
    const [ id, setId ] = useState('');
    const [ important, setImportant ] = useState(false);

    
    function date() {
        const months = [
            "01","02", "03", "04", "05", "06", 
            "07", "08", "09", "10", "11", "12"
        ]
    
        const d = new Date();
        const timeNow = d.toTimeString().substring(0, 5);
        const today = d.getDate().toString().length === 1 ? '0' + d.getDate() : d.getDate();
        const dateNow = `${months[d.getMonth()]}-${today}-${d.getFullYear()}`

        return { timeNow, dateNow };
    }
    


    async function saveNote() {

        const { timeNow, dateNow } = date();

        if(!title || !details) return;
        await dispatch({ 
            type: 'ADD_NOTE',
            title, details,
            id: id === '' ? Date.now() : id,
            date: dateNow,
            time: timeNow,
            important
        });

        grabCurrentNote();
    };

    function grabCurrentNote() {
        const currentNote = localStorage.getItem("currentNote")
        if( currentNote !== undefined || currentNote !== null ) {
            const parsedNote = JSON.parse(currentNote);
            if(parsedNote === null) return;
            setTitle(parsedNote.title);
            setDetails(parsedNote.details);
            setId(parsedNote.id);
            setImportant(parsedNote.important);
        }
    }

    function newNote() {
        setTitle('');
        setDetails('');
        setId('');
        setImportant(false);
        localStorage.removeItem('currentNote');
    }

    useEffect( () => {
        const keysNotNull = localStorage.getItem('keys') !== null;
        if(!keysNotNull) localStorage.setItem('keys', '[]')

        grabCurrentNote();
    }, [])

    return (
        <FlexContainer padding={1} grow="1" id="new-note">
            <Head>
                <title>Writepad - New Note</title>
            </Head>
            <Form autoComplete="off">
                <FlexWrap 
                    direction="row" 
                    align="center" 
                    padding={1}
                    bgcolor="var(--accent1)"    
                >
                    <TextField 
                        label={ important ? "Important" : "Title"}
                        fullWidth 
                        size="small" 
                        autoFocus
                        variant="outlined"
                        value={ title }
                        onChange={ e=>setTitle(e.target.value) }
                    />
                    <Icon 
                        onClick={()=>setImportant(!important)}
                        color={ important ? "secondary" : "default"}
                    >
                        <ErrorOutline />
                    </Icon>
                    <Tooltip 
                        enterDelay={200}
                        enterNextDelay={600}
                        title="Clear and Create New" 
                        arrow 
                    >
                        <Icon onClick={newNote}>
                            <NoteAddOutlined />
                        </Icon>
                    </Tooltip>
                </FlexWrap>
                <Divider />
                <FlexWrap padding={1} height="calc(100% - 4.25rem)" direction="column">
                    <TextArea 
                        placeholder="Enter note details here." 
                        value={ details }
                        onChange={ e=>setDetails(e.target.value) }
                    />
                    <Button 
                        disableElevation color="primary" 
                        variant="contained" 
                        fullWidth
                        onClick={saveNote}
                    >
                        Save Changes
                    </Button>
                </FlexWrap>
            </Form>
        </FlexContainer>
    )
}

export default NewNote

const FlexContainer = styled(FlexWrap)`
    @media only screen and (max-width: 500px) {
        height: 100vh;
    }
`

const Form = styled.form`
    /* background-color: #fffde7; */
    width: 100%;
    height: 100%;
    box-shadow: var(--shadow1);
    border-radius: 0.25rem;
    `
const Icon = styled(IconButton)`
    margin-left: .375rem;
    /* color: white !important; */
    `
const TextArea = styled.textarea`
    background-color: transparent;
    border-radius: 0.25rem;
    resize: none;
    height: 100%;
    width: 100%;
    padding: 0.5rem;
    /* transform: translateY(-.5rem); */
    font-size: .875rem !important;
    color: var(--text3);
    outline: none;
    border: none;
    margin-bottom: .5rem
`