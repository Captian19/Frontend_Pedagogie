import React, { useState, useEffect } from 'react';
import axios from 'axios'

import {useParams} from 'react-router-dom';

import {
    CCard,
    CCardBody,
    CCol,
    CRow  } from '@coreui/react'


import SingleStage from './single';



function Stages (){
    useEffect(()=>{
        refresh();

    },[])

    const {id} = useParams()

    const [stages, setStages] = useState({})
    const refresh = () =>{
        axios.get(`http://localhost:8000/api/stage/entreprises/mes_stages/${id}/`)
        .then(res => setStages(res.data))
        .catch(err => console.log(err))
    }


    return (
        <CCard>
        <CCardBody>
        <h2 style={{textAlign:'center', marginBottom:'10px'}}>Mes Stages</h2>
            <CRow>
           
                <CCol sm="12">
                   

                   {console.log(stages)}
                   
                   <div>
                   {stages.stagiaires ?
                   <div >
                    {stages['stagiaires'].map( (single)=>{
                        return <CCol > 
                        
                            <SingleStage
                                photo = {single.entreprise.nom_entreprise[0].toUpperCase()}
                                nom_entreprise = {single.entreprise.nom_entreprise}
                                domaine = {single.entreprise.domaine}
                                telephone = {single.entreprise.telephone_entreprise}
                                debut={single.date_debut_stage }
                                fin={single.date_fin_stage}
                                maitre={single.maitre_de_stage}
                                note={single.note_stage}
                                />

                            </CCol>

                    })
                
                    }
                    </div>
                    :<div>Aucun Stage</div>
                    }
                    </div>

                    
                </CCol>
            </CRow>
        </CCardBody>
    </CCard>
    )
}



export default Stages;