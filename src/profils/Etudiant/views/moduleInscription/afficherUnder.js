import React, { Component } from "react";
import axios from 'axios';


import {
    CCard,
    CCardBody,
    CCol,
    CRow,
  } from '@coreui/react'
import  Under from  "../../../../components/moduleInscription/dossier/under.js";
import { connect } from "react-redux";

class UnderList extends Component {
    state ={
        sousDossier : [],
        Etudiant :{},
        cetteAnnee:'',
    }
    
    componentDidMount(){
        let anneeScolaire = `${this.props.user.CurrentRoles[0].date_debut.split("-")[0]}-${this.props.user.CurrentRoles[0].date_fin.split("-")[0]}`
        let email = this.props.user.email
        axios.get(`http://127.0.0.1:8000/api/listeSousDossiers/${email}`)
             .then(res =>{
                 const sousDossier = res.data
                 this.setState({sousDossier})
             })
        axios.get(`http://127.0.0.1:8000/api/InfoEtudiantByAnneeScolaireEmailVerif/${anneeScolaire}/${email}`)
             .then(res =>{
                 this.setState({cetteAnnee:res.data})
             })

                      
    }
    rendu = () =>{
        if (this.state.cetteAnnee==false){
            return( <div id="file-upload-form" class="uploader mt-5">
                        <label for="file-upload" id="file-drag">
                            <div id="start">
                                    <i  aria-hidden="true"></i>
                                    <div class="text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10em" height="10em" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                            <path color="red"  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                                        </svg>
                                    </div>
                                    <h3 className="mt-5"><b>Vous ne pouvez pas voir votre dossier.<br/> Vous n'êtes pas inscrit cette année!</b></h3>
                            </div>
                        </label>    
                    </div> )
        }
        else{
            return(<div className="row mt-5 text-center">
                        {this.state.sousDossier.map(sous => <Under anneeScolaire={sous.nom} sousDossier={sous} key={sous.id}></Under>)}
                   </div>)
        }
    }  
    render(){
        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12">

                    <div className="card container mb-5  text-center pt-3  bg-primary white-text">
        <h1 style={{color:"white"}}>Dossier {this.props.user.first_name} {this.props.user.last_name}</h1>
                    </div>
                    {this.rendu()}
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
export default connect(mapStateToProps,null)(UnderList);