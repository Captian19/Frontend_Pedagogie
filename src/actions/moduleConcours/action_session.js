import axios from 'axios';
import {tokenConfig} from "../auth";

//add Session

export const add_Session = (infos) => async (dispatch, getState) => {
    console.log(infos);
    return await axios.post(
        URL+'candidats/session',
        infos);
}


// Get last Session

export const get_LatestSession = () => async (dispatch, getState) => {

    return await axios.get(URL+'candidats/session/latest')

}

// Get all Session

export const get_SessionsAll = () => async (dispatch, getState) => {
    return await axios.get(URL+'candidats/session')

}

// Get particular Session

export const get_Session = id => async (dispatch, getState) => {
    const res = await axios.get(URL+`candidats/session/${id}`, tokenConfig(getState));
    return res.data;
}


// EDIT Session

export const edit_Session = (id, informations) => async (dispatch, getState) => {
    return await axios.put(
        URL+`candidats/session/${id}`,
        informations
    )
}

// DELETE Session

export const delete_Session = (id) => async (dispatch, getState) => {
    const res = await axios.delete(
        URL+`candidats/session/${id}`,
        tokenConfig(getState)
    )
}