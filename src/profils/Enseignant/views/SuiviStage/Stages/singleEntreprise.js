import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import {CCard,CCardBody,CCardFooter,CCol,CRow} from '@coreui/react'




import {Detail, Stage} from './detailEntreprise';

import FormulaireStage from './AjouterStage/formAddStage';



function Single ({match})  {

    let history = useHistory()    


    const [reload, setReload] = useState(false)
    useEffect( ()=>{
        refreshLists();
        getListUser();
    },[reload])

    

    
    function refreshPage(e) {
        setReload(!reload)
          // window.location.reload(false);
    }    


    const [detail, setDetail] = useState({})
    const refreshLists =  () => {
        axios.get(`http://localhost:8000/api/stage/entreprises/${match.params.slug}/stages/`)
        .then(res => {
            setDetail(res.data)
        })
        .catch(err =>console.log(err));
    }


    const [cbon, setCbon] = useState(false)
    const [user, setUser] = useState([])
    const getListUser = () =>{
        axios.get(`http://users-ent.herokuapp.com/api/auth/ETUDIANT/`)
        .then((res)=>{
            //console.log(res.data)
            setUser(res.data)
            setCbon(true);
        })
        .catch(e=>console.log(e))
    }



    const deleteEntreprise = (e) =>{

        let confirmer = window.confirm("Voulez-vous vraiment supprimer cette entreprise ?");
        if(confirmer){
            axios.delete(`http://localhost:8000/api/stage/entreprises/${match.params.slug}/delete/`)
            .then(() => {
                console.log('supprimé');
                alert('SUPPRESSION REUSSIE')
                return history.push("/enseignant/entreprises");
            })
            .catch(err => console.log(err))
        }
        else{
            return null;
        }         
    }  






    return(
        <CCard>
        <CCardBody>
        <CRow>
            {(detail && cbon) &&
            <CCol sm="12">
                <Detail
                nom_entreprise={detail.nom_entreprise}
                type_stage = {detail.type_stage}
                adresse = {detail.adresse_entreprise}
                telephone_entreprise={detail.telephone_entreprise}
                slug={match.params.slug}
                supprimer = {e => deleteEntreprise()}
                
                />

                 <h4 style={{marginBottom:'2em', marginTop:'3em'}}> {detail.stages  && detail['stages'].length} Stages</h4>
                
                 <>
                {detail.stages ?
                    <CRow style={{marginTop:'2em'}}>
                    
                    {detail['stages'].map((stage) =>{
                        let eleve = (user.filter(el=> el.id == stage.stagiaire))[0]
                        
                    return <Stage
                            nom={stage.stagiaire && eleve.user.last_name}
                            prenom = {stage.stagiaire && eleve.user.first_name}
                            classe={stage.stagiaire && eleve.classe }
                            genie = {stage.stagiaire && eleve.departement}
                            numero = {stage.id}
                            slug={match.params.slug}
                            debut_stage = {stage.date_debut_stage}
                            fin_stage={stage.date_fin_stage}
                        />
                    }

                )}
                   
                    </CRow>
                    :
                    <h1 className="text-center">Aucun Stagiaire</h1>
                }
                </>
            </CCol>
            }
        </CRow>
        </CCardBody>

        <CCardFooter>

        <FormulaireStage
            slug={match.params.slug}
            entreprise={detail.nom_entreprise}
            clickLoad={e=>refreshPage()}
        />

        </CCardFooter>

        </CCard>
    )
}



export default Single