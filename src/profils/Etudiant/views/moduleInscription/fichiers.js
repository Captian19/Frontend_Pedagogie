import React, { Component } from "react";


import {
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow,
  } from '@coreui/react'
import File from  "../../../../components/moduleInscription/dossier/file.js";
import { connect } from "react-redux";

class ListeFichiers extends Component {
    state={
        fichiers:[
            {id:1,nom:"Reçu",redirect:"/etudiant/reçu"},
            {id:2,nom:"Certificat Aptitude",redirect:"/etudiant/medical"},
            {id:3,nom:"Certificat Inscription",redirect:"/etudiant/certificat"},
            {id:4,nom:"Fiche Inscription",redirect:"/etudiant/fiche"},
            
        ]
    }
    render(){
        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12">
                    <div className="card container mb-5  text-center pt-3  bg-primary white-text">
                        <h1 style={{color:"white"}}>DOCUMENTS {this.props.user.first_name} {this.props.user.last_name}</h1>
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
const mapStateToProps = state => ({
    user: state.auth.user
  })
export default connect(mapStateToProps,null)(ListeFichiers);