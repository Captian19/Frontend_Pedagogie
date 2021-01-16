import React, { useState,useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';


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



function Offres() {
    const {id} = useParams()

    useEffect(() =>{
        refreshLists();
    },[]);


    const [stagiaires, setStagiaires] = useState({mes_stages:[]});
    const refreshLists =  () => {
        axios.get(`http://localhost:8000/api/stage/entreprises/stage/maitre_stage/${id}/`)
        .then(res => {
            setStagiaires(res.data);
            console.log(res.data);
        })
        .catch(err =>console.log(err));
    }



  
    return(
        <CCard>
            <CCardBody>
                <CRow>
                    <CCol sm="12">
                        
                        <h1 className="text-center">Mes Stagiaires</h1>

                        <>
                        {stagiaires['mes_stages'].length>0 ? 
                        
                        stagiaires.mes_stages.map((single)=>{
                            return <div key= {single.id}>
                            <Stagiaire
                                    logo = {single.stagiaire.etudiant.username[0]}
                                    nom_stagiaire={single.stagiaire.etudiant.username}
                                    debut = {convertDate(single.date_debut_stage)}
                                    classe= {single.stagiaire.classe}
                                    genie= {single.stagiaire.genie}
                                    appreciations = {single.appreciations}
                                    lien = {single.id}
                                    />
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

export default Offres;