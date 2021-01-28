import React, { Component } from "react";
import axios from 'axios';


import {
    CCard,
    CCardBody,
    CCol,
    CRow,
  } from '@coreui/react'
import  Under_scol from  "../../../../components/moduleInscription/dossier/Under_scol.js";

class UnderList extends Component {
    state ={
        sousDossier : [],
        cetteAnnee:"",
    }
    componentDidMount(){
       axios.get(`http://127.0.0.1:8000/api/listeSousDossiers/${this.props.match.params.email}`)
            .then(response => {
                const sousDossier = response.data
                this.setState({sousDossier})
            })
        .catch(e =>{
            console.log(e)
            console.log("Error")
        })
        axios.get(`http://127.0.0.1:8000/api/InfoEtudiantByAnneeScolaireEmailVerif/${this.props.match.params.anneeDebut}-${this.props.match.params.anneeFin}/${this.props.match.params.email}`)
             .then(res =>{
            this.setState({cetteAnnee:res.data})
        })
    }
    rendu = () =>{
        if(this.state.cetteAnnee===false){
            return (<div class="row shadow mt-5">
                        <h3 className="mt-5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                <path color="red"  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                            </svg>
                            <b> Cet étudiant n'est  pas inscrit cette année!</b> 
                        </h3>
                    </div>
                         )}
    }
    render(){
        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12">
                    <div className="card container mb-5  text-center pt-3  bg-primary white-text">
        <h1 style={{color:"white"}}>SOUS DOSSIER DE {this.props.match.params.prenom} {this.props.match.params.nom}</h1>
                    </div>
                    {this.rendu()}
                    <div className="row mt-5 text-center">
                        {this.state.sousDossier.map(sous => <Under_scol anneeScolaire={sous.nom} email={this.props.match.params.email} sousDossier={sous} key={sous.id}></Under_scol>)}
                   </div>
                </CCol>
            </CRow>
            </CCardBody>
            </CCard>
        )
    }
}

export default UnderList;