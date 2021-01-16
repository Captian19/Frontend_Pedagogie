import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';

import {
    CCol,
    CRow,
    CContainer,
    CForm,
    CFormGroup,
    CLabel,
    CInput,
    CFormText,
    CSelect, 
    CInputRadio} from '@coreui/react'


function AddEntreprise(){

    useEffect(()=>{
        refresh();
        
    })

    const {register, handleSubmit, formState, errors} = useForm({
        mode:"onSubmit",
    })

    const {isSubmitting, isSubmitted , isSubmitSuccessful} = formState

    const [donnees, setDonnees] = useState({})

    const onSubmit = (data) => {
        setDonnees(data) ;
        cancelCourse();
    }

    const cancelCourse = () => { 
        document.getElementById("create-entreprise-form").reset();
        refreshPage();
    }

    function refreshPage() {
        window.location.reload(false);
    }
   

    const refresh = () =>{
        axios.post('http://localhost:8000/api/stage/entreprises/', donnees,{
        headers: {
            'content-type': 'application/json'
          }
        })
        .then(() => {
            //console.log(res.data);
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
              <CCol sm="4">
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
                <CCol sm="4">
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
              <CCol sm="4">
                <CFormGroup>
                  <CLabel htmlFor="domaine">Domaine</CLabel>
                  <CSelect
                    type="text"
                    id="domaine"
                    name="domaine"
                    placeholder="Entrez le Domaine..."
                    autoComplete="text"
                    innerRef={register}
                    >
                    <option value="Génie Civil">Génie Civil</option>
                    <option value="Electro-Mecanique">Electro-Mecanique</option>
                    <option value="Informatique et Télécommunications">Informatique et Télécommunications</option>
                    <option value="Aéronautique">Aéronautique</option>
                  </CSelect>
                </CFormGroup>
                </CCol>
                <CCol sm="4">
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
                <CCol sm="4">
                <CFormGroup>
                  <CLabel htmlFor="classe_stage">Niveau</CLabel>
                  <CSelect
                    type="text"
                    id="classe_stage"
                    name="classe_stage"
                    placeholder="Entrez le niveau..."
                    autoComplete="text"
                    innerRef={register}
                    >
                    <option value="Tronc commun">Tronc commun</option>
                    <option value="DIC1">DIC1</option>
                    <option value="DIC2">DIC2</option>
                    <option value="DIC3">DIC3</option>
                  </CSelect>
                </CFormGroup>
                </CCol>
                <CCol xs="4">
                <CFormGroup>
                  <CLabel htmlFor="partenaire" >Est partenaire ?</CLabel> <br></br>
                    <div className="ml-4"><CInputRadio  id="partenaire-true" name="partenaire" value = "true" /> OUI </div><br></br>
                    <div className="ml-4"><CInputRadio  id="partenaire-false" name="partenaire" value = "false" checked/>  NON</div>
                </CFormGroup>
                </CCol>
                </CRow>
                <CRow>
                <CCol sm="4">
                <CFormGroup>
                  <CLabel htmlFor="type_stage">Type de stage</CLabel>
                  <CSelect
                    type="text"
                    id="type_stage"
                    name="type_stage"
                    autoComplete="text"
                    innerRef={register}
                    
                    >
                    <option value="Stage ouvrier">Stage ouvrier</option>
                    <option value="Stage maitrise">Stage maitrise</option>
                  </CSelect>
                  <CFormText className="help-block">Veuillez renseigner le type </CFormText>
                </CFormGroup>
                </CCol>
                <CCol sm="4">
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
                    <div className='ml-4 mt-4'> 
                        <button type='submit' className="btn btn-pill btn-ghost-success mr-3" disabled={isSubmitting} >Valider</button>
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