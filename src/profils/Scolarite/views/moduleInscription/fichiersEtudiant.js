import React, { Component } from "react";


import {
    CCard,
    CCardBody,
    CCol,
    CRow,
  } from '@coreui/react'
import File from  "../../../../components/moduleInscription/dossier/file.js";

class FichiersEtudiant extends Component {
    state={
        fichiers:[
            {id:1,nom:"Reçu",redirect:`/scolarite/reçu/${this.props.match.params.email}/${this.props.match.params.anneeScolaire}`},
            {id:2,nom:"Certificat Aptitude",redirect:`/scolarite/medical/${this.props.match.params.email}/${this.props.match.params.anneeScolaire}`},
            {id:3,nom:"Certificat Inscription",redirect:`/scolarite/certificat/${this.props.match.params.email}/${this.props.match.params.anneeScolaire}`},
            {id:4,nom:"Fiche Inscription",redirect:`/scolarite/fiche/${this.props.match.params.email}/${this.props.match.params.anneeScolaire}`},
            {id:5,nom:"Carte Etudiant",redirect:`/scolarite/carte/${this.props.match.params.email}/${this.props.match.params.anneeScolaire}`},
            
        ]
    }
    render(){
        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12">
                    <div className="card container mb-5  text-center pt-3  bg-primary white-text">
                        <h1 style={{color:"white"}}>DOCUMENTS </h1>
                    </div>
                    <div className="row mt-5 text-center">
                        {this.state.fichiers.map(fichier=><File key={fichier.id} nom={fichier.nom} lien={fichier.redirect}/>)}
                    </div>
                

                </CCol>
            </CRow>
            </CCardBody>
            </CCard>
        )
    }
}
export default (FichiersEtudiant);