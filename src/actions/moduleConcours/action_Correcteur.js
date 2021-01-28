import axios from "axios";
import URL from "./entry_URL"

export const add_Correcteur = (infos) => async (dispatch, getState) => {
    console.log(infos);
    return await axios.post(
        URL+'candidats/correcteurs',
        infos);
}

export const get_Correcteurs = () => async (dispatch, getState) => {
    return await axios.get(URL+'candidats/correcteurs')
}

// Get particular correcteur

export const get_Correcteur = id => async (dispatch, getState) => {
    return await axios.get(URL+`candidats/correcteurs/id_correcteur/${id}`);
}


// EDIT correcteur

export const edit_Correcteur = (id, informations) => async (dispatch, getState) => {
    return await axios.put(
        URL+`candidats/correcteur/${id}`,
        informations
    )
}

// DELETE correcteur

export const delete_Correcteur = (id) => async (dispatch, getState) => {
    return await axios.delete(
        URL+`candidats/correcteur/${id}`
    )
}