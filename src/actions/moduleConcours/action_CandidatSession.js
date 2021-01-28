import axios from 'axios';
import {tokenConfig} from "../auth";
import URL from "./entry_URL"


// Get all candidats

export const get_CandidatSessions = () => async (dispatch, getState) => {
    return await axios.get(URL+'candidats/candidats_session');
}

export const get_CandidatSessionsByLots = (id_lot) => async (dispatch, getState) => {
    return await axios.get(URL+`candidats/candidats_session/${id_lot}`);
}

// Add candidat

export const ajouter_CandidatSession = ({
                                            prenom,
                                            nom,
                                            telephone,
                                            lieu_naissance,
                                            date_naissance,
                                            pays,
                                            filieres,
                                            serie,
                                            sexe,
                                            type_candidat,
                                            moy_gen_seconde,
                                            moy_gen_premiere,
                                            moy_gen_terminale,
                                            moy_gen_secondaire,
                                            moy_gen_bac,
                                            mention,
                                            nom_centre,
                                            lycee
                                        }) => async (dispatch, getState) => {
    const informations = {
        prenom,
        nom,
        telephone,
        lieu_naissance,
        date_naissance,
        pays,
        filieres,
        serie,
        sexe,
        type_candidat,
        moy_gen_seconde,
        moy_gen_premiere,
        moy_gen_terminale,
        moy_gen_secondaire,
        moy_gen_bac,
        mention,
        nom_centre,
        lycee
    }
    return await axios.post(URL+'candidats/candidats_session/create', informations).then(res => console.log(res.data.candidat))
}

// GET candidat

export const get_CandidatSession = id => async (dispatch, getState) => {
    return await axios.get(URL+`candidats/candidats_session/${id}`);
}


// EDIT candidat

export const edit_CandidatSession = (id, informations) => async (dispatch, getState) => {
    return await axios.put(
        URL+`candidats/candidats_session/${id}`,
        informations
    )
}

// DELETE candidat

export const delete_CandidatSession = (id) => async (dispatch, getState) => {
    return await axios.delete(
        URL+`candidats/candidats_session/${id}`
    )
}


// SPECIAL GET

export const get_CandidatSessionBySession =  session => async (dispatch, getState) => {
    return await axios.get(URL+`candidats/session/${session}/candidat_session` )
}

export const get_CandidatSessionBySessionAndCentres =  (session , centre) => async (dispatch, getState) => {
    return await axios.get(URL+`candidats/session/${session}/centres/${centre}/candidat_session`)
}

export const get_CandidatSessionBySessionAndLycees = (session, lycee) =>  async (dispatch, getState) => {
    return await axios.get(URL+`candidats/session/${session}/lycees/${lycee}/candidat_session`)
}

export const get_CandidatSessionBySessionAndCentresAndLycees = (session, centre, lycee) => async (dispatch, getState) => {
    return await axios.get(URL+`candidats/session/${session}/centres/${centre}/lycees/${lycee}/candidat_session`)
}

