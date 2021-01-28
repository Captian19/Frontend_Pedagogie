import axios from 'axios';
import {tokenConfig} from "../auth";
import URL from "./entry_URL"

//add Calendrier

export const add_Calendrier = (infos) => async (dispatch, getState) => {
    console.log(infos);
    return await axios.post(
        URL+'candidats/calendrier',
        infos);
}


// Get all Calendriers by Session

export const get_CalendriersBySession = (session) => async (dispatch, getState) => {
        return await axios.get(URL+`candidats/calendrier/${session}`)
}


// Get all Calendriers

export const get_Calendriers = () => async (dispatch, getState) => {
    try{
        return await axios.get(URL+'candidats/calendrier')
    }catch(e){
        console.log("not working");
    }
}

// Get particular Calendrier

export const get_Calendrier = id => async (dispatch, getState) => {
    const res = await axios.get(URL+`candidats/calendrier/${id}`, tokenConfig(getState));
    return res.data;
}


// EDIT Calendrier

export const edit_Calendrier = (id, informations) => async (dispatch, getState) => {
    return await axios.put(
        URL+`candidats/calendrier/${id}`,
        informations
    )
}

// DELETE Calendrier

export const delete_Calendrier = (id) => async (dispatch, getState) => {
    const res = await axios.delete(
        URL+`candidats/calendrier/${id}`,
        tokenConfig(getState)
    )
}