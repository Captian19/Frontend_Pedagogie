import axios from 'axios';
import {tokenConfig} from "../auth";


export const add_Centre = (infos) => async (dispatch, getState) => {
    console.log(infos);
    return await axios.post(
        URL+'candidats/centre/create',
        infos);

}


// Get all centres

export const get_Centres = () => async (dispatch, getState) => {
    try {
        return await axios.get(URL+'candidats/centre');
    }catch(e){
        console.log("not working")
    }

}

// Get particular centre

export const get_Centre = id => async (dispatch, getState) => {
    const res = await axios.get(URL+`candidats/centre/${id}`);
    return res.data;
}


// EDIT centre

export const edit_Centre = (id, informations) => async (dispatch, getState) => {
    const res = await axios.put(
        URL+`candidats/centre/${id}`,
        informations
    )
}

// DELETE centre

export const delete_Centre = (id) => async (dispatch, getState) => {
    const res = await axios.delete(
        URL+`candidats/centre/${id}`
    )
}