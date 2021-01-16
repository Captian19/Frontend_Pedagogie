import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Redirect,useHistory, useLocation } from 'react-router-dom';

import {
    CCard,
    CCardBody,
    CCol,
    CRow
  } from '@coreui/react'




import {Detail, Stage} from './detailEntreprise';

import FormulaireStage
 from './AjouterStage/formAddStage';

 const correspondance_genie = {
    "Informatique et Télécommunications": "GIT" ,
    "Génie Civil": "GC" ,
     "Electro-Mecanique": "GEM",
     "Aéronautique": "GAR"
};


function Single ({match})  {

    let history = useHistory()    

    useEffect( ()=>{
        refreshLists();
    },[])

    const [detail, setDetail] = useState({})


    
    
    const refreshLists =  () => {
        axios.get(`http://localhost:8000/api/stage/entreprises/${match.params.slug}/stages/`)
        .then(res => {
            setDetail(res.data)
        })
        .catch(err =>console.log(err));
    }


    const deleteEntreprise = (e) =>{
         axios.delete(`http://localhost:8000/api/stage/entreprises/${match.params.slug}/delete/`)
          .then(res => {
            console.log('supprimé');
            alert('SUPPRESSION REUSSIE')
            return history.push("/enseignant/entreprises");
        })
        .catch(err => console.log(err))
    }  





    return(
        <CCard>
        <CCardBody>
        <CRow>
            <CCol sm="12">
                <Detail
                nom_entreprise={detail.nom_entreprise}
                domaine = {detail.domaine}
                classe_stage={detail.classe_stage}
                adresse = {detail.adresse_entreprise}
                telephone_entreprise={detail.telephone_entreprise}
                supprimer = {e => deleteEntreprise()}
                
                />

                 <h4 style={{marginBottom:'2em', marginTop:'3em'}}> {detail.stages  && detail['stages'].length} Stages</h4>
                
                 <>
                {detail.stages ?
                    <CRow style={{marginTop:'2em'}}>
                    
                    {detail['stages'].map((stage) =>
                        
                        <Stage
                            nom={stage.stagiaire? stage.stagiaire.etudiant.username: 'Non alloué' }
                            classe={stage.stagiaire && stage.stagiaire.classe}
                            genie = {stage.stagiaire && stage.stagiaire.genie}
                            numero = {stage.id}
                        />
                         
                    )}
                   
                    </CRow>
                    :
                    <h1 className="text-center">Aucun Stagiaire</h1>
                }
                </>
            </CCol>
        </CRow>
        </CCardBody>


        <div>
        <FormulaireStage
            classe={detail.classe_stage}
            genie = {correspondance_genie[`${detail.domaine}`]}
            slug={match.params.slug}
            entreprise={detail.nom_entreprise}
        />
        </div>
        
        </CCard>
    )
}



export default Single