import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useForm } from "react-hook-form";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

import {CCard,CCardBody,CCardHeader,CForm,CFormGroup,CInput,CRow,CCol,CSelect} from '@coreui/react'

const style = {
  prenom:{
    backgroundColor: "#3c4b64",
    color:'#fff',
    fontWeight:'bold',
    textAlign:'left',
    paddingLeft:'1em'
  }, 
  Comportement:{
    backgroundColor: "#D6DBDF",
    fontWeight:'bold'
  },
  moyenTech:{
    backgroundColor: "#BDC3C7",
    fontWeight:'bold',
    width:'6%'
  },
  moyenneGenerale:{
    backgroundColor: "#3c4b64", 
    color:'#fff',
    fontWeight:'bold',
    width:'6%'
  },
  qui:{
    fontWeight:'bold',
    padding:'1em',
    textAlign:'left',
  },
  titre:{
    fontSize:'9pt',
    fontWeight:'bold',
    textAlign:'center',
    backgroundColor: "#D6DBDF",
    width:'6%'
  }
}





function Formulaire(){

  const {register, handleSubmit} = useForm({})


  const [isOk, setIsOk] = useState(false)
  const [liste, setListe] = useState([])
  const refreshList = (classe, annee) =>{
    axios.get(`http://localhost:8000/api/stage/entreprises/immersion/stagiaires/classe/${classe}/annee/${annee}/`)
    .then((res)=>{
      setListe(res.data)
      setIsOk(true)
    })
    .catch(e => console.error(e))
  }

  const [listEleves, setListEleves] = useState([])
  const[cbon, setCbon] = useState(false)
  const getEleves = () =>{
    axios.get(`http://users-ent.herokuapp.com/api/auth/ETUDIANT/GIT/`)
    .then((res)=>{
      setListEleves(res.data)
      setCbon(true)
    })
    .catch(e=>console.log(e))
  }

  const onSubmit = data=>{
    refreshList(data.classe_stagiaire, data.annee);
    setReload(!reload)
  }
 
  const [reload, setReload] = useState(false)
  useEffect(()=>{
    getEleves();
  }, [reload])
  

  return (
    <>
    <CCard style={{width:'100%'}}>

      <CCardHeader>
        <div>          
          <CForm   onSubmit={handleSubmit(onSubmit)}>
          <CRow>
            <CCol md-3>
              <CFormGroup>
                <CSelect type="text" name="classe_stagiaire" id='classe_stagiare' innerRef={register}>
                  <option key="DIC1" value="DIC1">DIC1</option>
                  <option key="DIC2" value="DIC2">DIC2</option>
                  <option key="DIC3" value="DIC3">DIC3</option>
                </CSelect>
                
              </CFormGroup>
            </CCol>
            <CCol md-3>
              <CFormGroup> <CInput defaultValue="GIT" disabled /> </CFormGroup>
            </CCol>
            <CCol md-3>
              <CFormGroup> <CInput type="number" placeholder='annee' name='annee' id='annee' innerRef={register} /> </CFormGroup>
            </CCol>
              <CCol md-3>
                <div> <button type='submit' className="btn btn-primary" style={{marginTop:'-0.1rem'}} > Rechercher</button> </div>
              </CCol>
            </CRow>
          </CForm>
        </div>
      </CCardHeader>



    {(isOk  && cbon) &&
    <CCardBody style={{width:'100%'}}>

    {liste.length > 0 ?

    <>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="btn btn-pill btn-ghost-success"
          table="table-to-xls"
          filename={`Note des stagiaires ${liste[0].classe_stagiaire}-GIT (${liste[0].annee_stage})`}
          sheet="tablexls"
          buttonText="Télécharger Excel"
          />
    <h3 align="center" className="mb-4">EVALUATION IMMERSION DES ETUDIANTS DE LA {liste[0].classe_stagiaire}-GIT ({liste[0].annee_stage}) </h3>

    <table id="table-to-xls"  style={{width:'100%'}}  >
    <caption align="center" className="mb-4 mt-3">EVALUATION IMMERSION DES ETUDIANTS DE LA <b>{liste[0].classe_stagiaire}</b> ({liste[0].annee_stage}) </caption>
      
      <thead>
        <tr align="center">
         <th rowSpan='2' colSpan="4" style={style.prenom}>Prénom(s)</th>
         <th rowSpan='2' colSpan="4" style={style.prenom}>Nom</th>
         <th colSpan='6' style={style.Comportement}>Comportement Technique (sur 15)</th>
         <th rowSpan='2' style={style.moyenTech}>Moyenne Technique</th>
         <th colSpan='4'style={style.Comportement}>Comportement Humain (sur 5)</th>
         <th rowSpan='2'style={style.moyenTech}>Moyenne Discipline</th>
         <th rowSpan='2'style={style.moyenneGenerale}>Moyenne Générale</th>
        </tr>
          <tr>
            <th style={style.titre}>Initiative Personelle</th>
            <th style={style.titre}>Autonomie</th>
            <th style={style.titre}>Investissement Travail d'équipe</th>
            <th style={style.titre}>Capacités Techniques</th>
            <th style={style.titre}>Qualité  Livrables</th>
            <th style={style.titre}>Capacités Communication</th>

            <th style={style.titre}>Rigueur</th>
            <th style={style.titre}>Assuidité</th>
            <th style={style.titre}>Discipline</th>
            <th style={style.titre}>Tenue</th>
          </tr>
      </thead>


      <tbody>
        
          {liste.map((item) =>{
            let eleve = (listEleves.filter(el=> el.id == item.stagiaire))[0]
            return <>
              <tr align='center'>
                <td colSpan="4" style={style.qui}>{eleve && eleve.user.first_name}</td>
                <td colSpan="4" style={style.qui}>{eleve && eleve.user.last_name}</td>
                <td>{item.formulaire_stage[0] ? item.formulaire_stage[0].initiative_personnelle : 'NEANT' }</td>
                <td>{item.formulaire_stage[0] ? item.formulaire_stage[0].autonomie : 'NEANT' }</td>
                <td>{item.formulaire_stage[0] ? item.formulaire_stage[0].investissement_travail_equipe : 'NEANT' }</td>
                <td>{item.formulaire_stage[0] ? item.formulaire_stage[0].capacites_techniques : 'NEANT' }</td>
                <td>{item.formulaire_stage[0] ? item.formulaire_stage[0].qualite_livrables : 'NEANT' }</td>
                <td>{item.formulaire_stage[0] ? item.formulaire_stage[0].capacites_communicationnelles : 'NEANT' }</td>
                <td style={style.moyenTech}>{item.formulaire_stage[0] ? item.formulaire_stage[0].moyenne_technique : 'NEANT' }</td>
                <td>{item.formulaire_stage[0] ? item.formulaire_stage[0].rigueur : 'NEANT' }</td>
                <td>{item.formulaire_stage[0] ? item.formulaire_stage[0].assuidite : 'NEANT' }</td>
                <td>{item.formulaire_stage[0] ? item.formulaire_stage[0].discipline : 'NEANT' }</td>
                <td>{item.formulaire_stage[0] ? item.formulaire_stage[0].tenue : 'NEANT' }</td>
                <td style={style.moyenTech}> {item.formulaire_stage[0] ? item.formulaire_stage[0].moyenne_discipline : 'NEANT' }</td>
                <td style={style.moyenneGenerale}>{item.formulaire_stage[0] ? item.formulaire_stage[0].moyenne_generale : 'NEANT' }</td>
              </tr>
            </>

          })}
         

      </tbody>
    </table>
    </> : 'Aucun formulaire'
}

    </CCardBody>
    }
      
    
    </CCard>
      
    </>
  )
}


export default Formulaire;