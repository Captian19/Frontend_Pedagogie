import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';

import {CCol,CRow,CContainer,CForm,CFormGroup,CLabel,CInput,CSelect} from '@coreui/react'


function AddEntreprise(props){

   

    const {register, handleSubmit, formState, errors} = useForm({
        mode:"onSubmit",
    })

    const {isSubmitting, isSubmitted , isSubmitSuccessful} = formState

    const [donnees, setDonnees] = useState({})
    const onSubmit = (data) => {
      setDonnees(data) ;
      refresh(data);
      cancelCourse();
    }

    const cancelCourse = () => { 
      document.getElementById("create-entreprise-form").reset();
  }





    const refresh = (donnes) =>{
      donnes.annee_ajout_entreprise = new Date().getFullYear().toString();
      donnes.immersion = true;

        axios.post('http://localhost:8000/api/stage/entreprises/ajouter/', donnes,{
        headers: {
            'content-type': 'application/json'
          }
        })
        .then((res) => {
            console.log('resdata',res.data);
            props.clickLoad()
        })
        .catch(err => console.log(err));
    }
    

    const Echec = () =>{
            return (
                <div className="alert alert-warning" role="alert">
                    <h4 className="alert-heading">Echec</h4>
                    <p>L'Entreprise n'a pas été ajouté</p>
                    <hr></hr>
                    <p>Veuillez reprendre la saisie</p>
                </div>
            ) 
    }

    const Succes = () =>{
        return (
            <div className="alert alert-success" role="alert">
                <h4 className="alert-heading">Ajout réussi</h4>
                <p>l'Entreprise {donnees.nom_entreprise.toUpperCase()} a ete ajoutée avec succés </p>
                <hr></hr>
            </div>
        )
    }


    return (
        <CContainer fluid>
          <CRow>
            <CCol sm="12">
                <CRow>
            
            <CCol xs="10" style={{maxWidth:"70%"}}>
              <CForm method="POST"  id="create-entreprise-form" encType="application/json" onSubmit={handleSubmit(onSubmit)}>
            <CRow>
              <CCol sm="5">
                <CFormGroup>
                  <CLabel htmlFor="nom_entreprise">Nom De l'Entreprise</CLabel>
                  <CInput
                    type="text"
                    id="nom_entreprise"
                    name="nom_entreprise"
                    placeholder="Entreprise..."
                    innerRef={register({required: "Veuillez renseigner le Nom de l'Entreprise "})}
                  />
                  {errors.nom_entreprise && <span className="help-block" style={{color:'red'}} >{errors.nom_entreprise.message}</span> }
                  
                </CFormGroup>
                </CCol>
                <CCol sm="5">
                <CFormGroup>
                  <CLabel htmlFor="telephone_entreprise">Contact </CLabel>
                  <CInput
                    type="tel"
                    id="telephone_entreprise"
                    name="telephone_entreprise"
                    placeholder="format: 77-123-45-67"
                    pattern="[0-9]{2}-[0-9]{3}-[0-9]{2}-[0-9]{2}"
                    innerRef={register({required: "Veuillez entrer le contact" })}
                  />
                  {errors.telephone_entreprise && <span className="help-block" style={{color:'red'}} >{errors.telephone_entreprise.message}</span> }
                </CFormGroup>
                </CCol>
                </CRow>
                <CRow>
              <CCol sm="5">
              <CFormGroup>
                    <CLabel htmlFor="adresse_entreprise">Adresse</CLabel>
                    <CInput
                      type="text"
                      name="adresse_entreprise"
                      id="adresse_entreprise"
                      placeholder="Adresse de l'entreprise..."
                      innerRef={register({required:true})}
                    />
                  </CFormGroup>
                </CCol>
                <CCol sm="5">
                <CFormGroup>
                  <CLabel htmlFor="lien_page">Lien Page Web</CLabel>
                  <CInput
                    type="text"
                    id="lien_page"
                    name="lien_page"
                    placeholder="https://example.com"
                    pattern="https://\w*\.{1}\w{1,3}"
                    defaultValue="https://"
                    autoComplete="url"
                    innerRef={register({required: "format : https://example.com"})}
                  />
                  <span className="help-block" style={{color:'red'}} >format : https://example.com</span> 
                </CFormGroup>
                </CCol>
                </CRow>
                <CRow>
              
                 <CCol md="5">
                 <CFormGroup>
                  <CLabel htmlFor="partenaire" >Est partenaire ?</CLabel> <br></br>
                  <CSelect
                    type="checkbox"
                    id="partenaire"
                    name="partenaire"
                    autoComplete="text"
                    innerRef={register}
                    
                    >
                    <option value="False">NON</option>
                    <option value="true">OUI</option>
                  </CSelect>
                       
                </CFormGroup>

                </CCol>


                
               
                </CRow>
                <CRow>
            
                <CCol sm="5">
                  
                    <div className='ml-4 mt-4'> 
                        <button type='submit' className="btn btn-pill btn-success mr-3" disabled={isSubmitting} >Valider</button>
                        <button type='reset' className="btn btn-pill btn-ghost-danger" disabled={isSubmitting}> reset</button>
                    </div>
                </CCol>
                </CRow>
              </CForm>
              </CCol>
              <CCol xs="2" style={{maxWidth:"40%"}}>
                  <div>
                    {isSubmitSuccessful && <Succes/> }
                  </div>
                  <div>
                   {(isSubmitted && !isSubmitSuccessful) && <Echec/>}
                    </div>
              </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CContainer>
      )
}

export default AddEntreprise;