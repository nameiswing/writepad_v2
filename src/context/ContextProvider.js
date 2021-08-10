import React, { useContext, useReducer } from "react";

const Context = React.createContext();
export const useContextProvider = () => useContext(Context);

const reducer = ( state, action ) => {

    const note = {
        title: action.title,
        details: action.details,
        id: action.id,
        date: action.date,
        time: action.time,
        important: action.important,
    }


    switch (action.type) {

        case "ADD_NOTE": {
            const keys = JSON.parse(localStorage.getItem('keys'));
            const uniqueKeys = Array.from(new Set(keys)); //remove duplicates

            const found = uniqueKeys.find(key => key === `${action.id}`)
            if(!found) {
                localStorage.setItem(
                    'keys', JSON.stringify([...uniqueKeys, `${action.id}`]));
            }
            localStorage.setItem(`${action.id}`, JSON.stringify(note));
            localStorage.setItem( 'currentNote', JSON.stringify(note));

            return { notes: [] }; //needs to clear notes every time to see updates when list NoteList reloads
        }

        case "GRAB_STORAGE": {
            try {
                const keys = JSON.parse(localStorage.getItem('keys'));
                keys.forEach( (keyItem) => {
                    const newItem = JSON.parse(localStorage.getItem(keyItem));
                    const found = state.notes.find(note => note.id === newItem.id);
                    if( !found ) state.notes = [ ...state.notes, newItem ];
                })
            }
            catch(error) { console.log(error.message) }
            finally { return { notes: [ ...state.notes ] }} 
        }

        case "DELETE_NOTE": {
            const keys = JSON.parse(localStorage.getItem('keys'));
            const index = keys.indexOf(`${action.id}`); 
            if(index > -1 ) keys.splice(index, 1); //remove selected id from keys
            console.log(keys)
            
            localStorage.setItem('keys', JSON.stringify(keys));
            localStorage.removeItem(`${action.id}`);
          
            return { notes: [ ...state.notes.filter( item => item.id !== action.id)] }
          }
        default: 
            console.log(state)

    }
};

const ContextProvider = ({ children }) => {

    function getTime() {
        const time = new Date();
        const hour = time.getHours();
        const minute = time.getMinutes();
        return { hour, minute }
    }

    const [ { notes }, dispatch ] = useReducer( reducer, { 
        notes: []
    } );

    const values = {  
        getTime, 
        notes,
        dispatch
    };

    return (
        <Context.Provider value={values}>
            { children }
        </Context.Provider>
    )
}

export default ContextProvider
