import axios from 'axios';
import {tokenConfig} from "../auth";

//add sujet

export const add_Sujet = (infos) => async (dispatch, getState) => {
    console.log(infos);
    return await axios.post(URL+'scolarite/concours/sujet/create', infos,
        {
            headers: {
                "Accept":"application/json",
            }
        });
}


// Get all sujets

export const get_Sujets = () => async (dispatch, getState) => {
    return await axios.get(URL+'scolarite/concours/sujet');
}

// Get particular sujet

export const get_Sujet = id => async (dispatch, getState) => {
    return await axios.get(URL+`scolarite/concours/sujet/${id}`);
}


// Get sujet of a special year

export const get_SujetofYear = (annee) => async (dispatch, getState) => {
    return await axios.get(URL+'scolarite/concours/sujet/' + annee);
}


// EDIT sujet

export const edit_Sujet = (id, informations) => async (dispatch, getState) => {
    return await axios.put(URL+`scolarite/concours/sujet/${id}`, informations)
}

// DELETE sujet

export const delete_Sujet = (id) => async (dispatch, getState) => {
    return await axios.delete(URL+`scolarite/concours/sujet/${id}`)
}