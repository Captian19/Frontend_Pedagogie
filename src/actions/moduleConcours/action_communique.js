import axios from 'axios';
import {tokenConfig} from "../auth";

//add communique

export const add_Communique = (infos) => async (dispatch, getState) => {
    console.log(infos);
    return await axios.post(
        URL+'scolarite/communique/create',
        infos,)
}


// Get all communiques

export const get_Communiques = () => async (dispatch, getState) => {

        return await axios.get(URL+'scolarite/communique')

}

// Get particular communique

export const get_Communique = id => async (dispatch, getState) => {
    return await axios.get(URL+`scolarite/communique/${id}`);
}

// Get particular communique

export const get_CommuniqueYear = year => async (dispatch, getState) => {
    return await axios.get(URL+`scolarite/communique/annee/${year}`);
}


// EDIT communique

export const edit_Communique = (id, informations) => async (dispatch, getState) => {
    return await axios.put(
        URL+`scolarite/communique/${id}`,
        informations
    )
}

// DELETE communique

export const delete_Communique = (id) => async (dispatch, getState) => {
    return await axios.delete(
        URL+`scolarite/communique/${id}`
    )
}