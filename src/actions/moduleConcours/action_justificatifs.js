import axios from 'axios';
import URL from "./entry_URL"

// Create Note

export const add_Note = (infos) => async (dispatch, getState) => {
    console.log(infos);
    return await axios.post(
        URL+'candidats/correction',
        infos)
}


// Get all centres

export const get_Notes = () => async (dispatch, getState) => {
    return await axios.get(URL+'candidats/correction')
}

export const get_NotesByLots = (id_lot) => async (dispatch, getState) => {
    return await axios.get(URL+'candidats/correction/id_lot/'+id_lot)
}

// Get particular centre

export const get_Note = id => async (dispatch, getState) => {
    return await axios.get(URL+`candidats/correction/${id}`);
}


// EDIT centre

export const edit_Note = (id, informations) => async (dispatch, getState) => {
    return await axios.put(
        URL+`candidats/correction/${id}`,
        informations)
}

// DELETE centre

export const delete_Note = (id) => async (dispatch, getState) => {
    return await axios.delete(
        URL+`candidats/correction/${id}`)
}