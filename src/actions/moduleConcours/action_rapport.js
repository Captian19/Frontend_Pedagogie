import axios from 'axios';
import {tokenConfig} from "../auth";

//add rapport

export const add_Rapport = (infos) => async (dispatch, getState) => {
    console.log(infos);
    return await axios.post(
        URL+'scolarite/rapport/create',
        infos);
}


// Get all rapports

export const get_Rapports = () => async (dispatch, getState) => {

        return await axios.get(URL+'scolarite/rapport')

}

// Get particular rapport

export const get_Rapport = year => async (dispatch, getState) => {
    return await axios.get(URL+`scolarite/rapport/annee/${year}`);
}


// EDIT rapport

export const edit_Rapport = (id, informations) => async (dispatch, getState) => {
    return await axios.put(
        URL+`scolarite/rapport/${id}`,
        informations
    )
}

// DELETE rapport

export const delete_Rapport = (id) => async (dispatch, getState) => {
    return await axios.delete(
        URL+`candidats/rapport/${id}`
    )
}