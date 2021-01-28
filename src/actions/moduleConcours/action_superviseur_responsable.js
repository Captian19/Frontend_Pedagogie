import axios from 'axios';

//add Responsable

export const add_Responsable = (infos) => async (dispatch, getState) => {
    console.log(infos);
    return await axios.post(
        URL+'candidats/responsable',
        infos)
}

//add Superviseur

export const add_Superviseur = (infos) => async (dispatch, getState) => {
    console.log(infos);
    return await axios.post(
        URL+'candidats/superviseur',
        infos)
}


// Get all superviseurs

export const get_Superviseurs = () => async (dispatch, getState) => {
        return await axios.get(URL+'candidats/superviseur')
}

// Get all responsables

export const get_Responsables = () => async (dispatch, getState) => {
    return await axios.get(URL+'candidats/responsable')
}