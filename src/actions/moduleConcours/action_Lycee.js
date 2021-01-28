import axios from 'axios';
import {tokenConfig} from "../auth";

//add lycee

export const add_Lycee = (infos) => async (dispatch, getState) => {
    console.log(infos);
    const res = await axios.post(
        URL+'candidats/lycee',
        infos);
    return res.data
}


// Get all lycees

export const get_Lycees = () => async (dispatch, getState) => {
    try{
        return await axios.get(URL+'candidats/lycee')
    }catch(e){
        console.log("not working");
    }
}

// Get particular lycee

export const get_Lycee = id => async (dispatch, getState) => {
    const res = await axios.get(URL+`candidats/lycee/${id}`);
    return res.data;
}


// EDIT lycee

export const edit_Lycee = (id, informations) => async (dispatch, getState) => {
    const res = await axios.put(
        URL+`candidats/lycee/${id}`,
        informations
    )
}

// DELETE lycee

export const delete_Lycee = (id) => async (dispatch, getState) => {
    const res = await axios.delete(
        URL+`candidats/lycee/${id}`
    )
}