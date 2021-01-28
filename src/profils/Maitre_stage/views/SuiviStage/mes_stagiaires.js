import React, { useState,useEffect } from "react";
import axios from 'axios';

import { connect } from 'react-redux'


import {
    CCard,
    CCardBody,
    CCol,
    CRow  } from '@coreui/react'

import Stagiaire from './sta2';


const convertDate = (str) => {
    if(str){
        let date = new Date(str.toLocaleString())
    return `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`
    }
    else{
        return ''
    }
    
}



function Offres(props) {

    useEffect(() =>{
        refreshLists();
        get_liste_stagiaire();

        console.log(props.role)
    },[]);


    const [stagiaires, setStagiaires] = useState({mes_stages:[]});
    const refreshLists =  () => {
        axios.get(`http://localhost:8000/api/stage/entreprises/stage/maitre_stage/${props.role.id}/`)
        .then(res => {
            setStagiaires(res.data);
            console.log(res.data);
        })
        .catch(err =>console.log(err));
    }


    const [isOk, setIsOk] = useState(false)
    const [listeStagiaire, setListeStagiaire]= useState([])
    const get_liste_stagiaire = () =>{
        axios.get(`http://users-ent.herokuapp.com/api/auth/ETUDIANT/GIT/`)
        .then((res)=>{
            console.log(res.data)
            setListeStagiaire(res.data)
            setIsOk(true)
        })
        .catch(e=> console.log(e))
    }  


    


  
    return(
        <CCard>
            <CCardBody>
                <CRow>
                    <CCol sm="12">
                        
                        <h1 className="text-center">Mes Stagiaires</h1>

                        <>
                        {(isOk && stagiaires.length>0) ? 
                        
                        stagiaires.map((single)=>{
                            let eleve = listeStagiaire.filter(element=>(element.id == single.stagiaire)) [0];
                            console.log(eleve)

                            return <div>

                                
                            <Stagiaire
                                    logo = {eleve.user.first_name[0]}
                                    prenom_stagiaire={eleve.user.first_name}
                                    nom_stagiaire={eleve.user.last_name}
                                    debut = {convertDate(single.date_debut_stage)}
                                    classe= {eleve.classe}
                                    genie= {eleve.departement}
                                    appreciations = {single.appreciations}
                                    lien = {single.id}
                                    />
                                    <div style={{border:'solid #CA95AC 1pt', marginTop:'10px', boxShadow: 'inset 0px 0px 40px 40px #DBA632'}}>  </div>
                                </div>
                        })
                        
                        :<h4>Aucun Stagiaire</h4>}
                        </>

                        
                        
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    );
}




const MapToState = state =>({
    role: state.auth.user.CurrentRoles[0],
    all_role: state.auth.user.CurrentRoles
})


export default connect(MapToState, null)(Offres);