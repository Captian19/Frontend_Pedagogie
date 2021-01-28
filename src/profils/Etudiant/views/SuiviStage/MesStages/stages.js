import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {connect} from 'react-redux';

import {CCard,CCardBody,CCol,CRow  } from '@coreui/react'


import SingleStage from './single';



function Stages (props){
    useEffect(()=>{
        refresh();
        maitre_stage();

    },[])


    const [stages, setStages] = useState([])
    const refresh = () =>{
        axios.get(`http://localhost:8000/api/stage/entreprises/mes_stages/${props.role.id}/`)
        .then(res => {
            setStages(res.data)
        })
        .catch(err => console.log(err))
    }

    const [cbon, setCbon] = useState(false)
    const[maitre, setMaitre] = useState([])
    const maitre_stage = () =>{
        axios.get(`http://users-ent.herokuapp.com/api/auth/MAITRE_STAGE/`)
        .then(res => {
            setMaitre(res.data);
            setCbon(true) 

        })
    }



    return (
        <CCard>
        <CCardBody>
        <h2 style={{textAlign:'center', marginBottom:'10px'}}>Mes Stages</h2>
            <CRow>
           
                <CCol sm="12">
                    
                   <div>
                   {(stages && cbon) ?
                   <div >
                       {stages.map((stages) =>{
                           const filtre =  [...maitre.filter(el => el.id == stages.maitre_de_stage)][0]
                           
                           return <CCol > 
                        
                            <SingleStage
                                photo = {stages && stages.nom_entreprise[0].toUpperCase()}
                                nom_entreprise = {stages && stages.nom_entreprise.toUpperCase()}
                                classe = {stages && stages.classe_stagiaire}
                                year = {stages && stages.annee_stage}
                                appreciations = {stages && stages.appreciations}
                                genie = {props.role.departement}
                                telephone = {stages.entreprise && stages.entreprise.telephone_entreprise}
                                debut={stages && stages.date_debut_stage }
                                fin={stages && stages.date_fin_stage}
                                maitre={(stages.maitre_de_stage && props.role.departement=='GIT') && `${filtre && filtre.user.first_name} ${filtre &&  filtre.user.last_name}`}
                                note = {stages && stages.formulaire_stage[0]}
                                />

                        </CCol>
                        }
                    )}
                    
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


const MapToState = state =>({
    role: state.auth.user.CurrentRoles[0],
    user_id: state.auth.user.id
})


export default connect(MapToState, null)(Stages);