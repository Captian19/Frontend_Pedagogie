import axios from 'axios';
import {tokenConfig} from "../auth";
import URL from "./entry_URL"


// Get all candidats

export const get_Candidats = () => async (dispatch, getState) => {
    return await axios.get(URL+'candidats/liste');
}


// GET candidat

export const get_Candidat = id => async (dispatch, getState) => {
    return await axios.get(URL+`candidats/${id}`);
}


// EDIT candidat

export const edit_Candidat = (id, informations) => async (dispatch, getState) => {
    return await axios.put(
        URL+`candidats/${id}`,
        informations
    )
}

// DELETE candidat

export const delete_Candidat = (id) => async (dispatch, getState) => {
    return await axios.delete(
        URL+`candidats/${id}`
    )
}