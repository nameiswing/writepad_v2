import { 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle 
} from '@material-ui/core';
import styled from 'styled-components';
import { useContextProvider } from '../context/ContextProvider'

const DeleteAlert = ({ open, handleClose, itemToDelete }) => {

    const { dispatch } = useContextProvider();

    function deleteItem(e) {
        console.log(typeof itemToDelete)
        handleClose(e);
        dispatch({ type: 'DELETE_NOTE', id: itemToDelete });
    }

    return (
        <DeleteDialog
            open={open}
            onClose={handleClose}

        >
            <DialogTitle>
                Permanently delete this note?
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    There's no turning back once this note is deleted.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <ActionButton 
                    variant="contained" 
                    onClick={handleClose}
                    size="small"
                    bgcolor="var(--btn-primary)"
                    hover="var(--btn-primary-hovered)"
                    disableElevation
                    fontcolor="white"
                >
                    Keep
                </ActionButton>
                <ActionButton  
                    variant="outlined" 
                    onClick={deleteItem}
                    size="small"
                    fontcolor="var(--text4)"
                    id="delete"
                >
                    Delete
                </ActionButton>
            </DialogActions>
        </DeleteDialog>
    )
}

export default DeleteAlert

const DeleteDialog = styled(Dialog)`
    box-shadow: var(--shadow1) !important;
    background-color: ${ props => props.bgcolor};
`

const ActionButton = styled(Button)`
    font-size: .75rem;
    color: ${ props => props.fontcolor };
    background-color: ${ props => props.bgcolor};
    
    &:hover {
        background-color: ${ props => props.hover};
    }
`