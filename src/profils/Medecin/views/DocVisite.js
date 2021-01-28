import React, { Component } from "react";
import html2PDF from 'jspdf-html2canvas';

import {
    CCard,
    CCardBody,
    CCol,
    CRow,
  } from '@coreui/react'
import Entete from "../../../components/moduleInscription/Entete";
import CertificatMedical from "../../../components/moduleInscription/CertificatMedical";
import axios from 'axios';



class DocVisite extends Component {

    state = {
        search: "",
        Etudiant : []
      };
    
      componentDidMount(){
         
        let email = this.props.match.params.email 
        let anneeScolaire = this.props.match.params.anneeScolaire
        let url = `http://127.0.0.1:8000/api/InfoEtudiantByAnneeScolaireEmail/${anneeScolaire}/${email}`;
        axios.get(url, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                Etudiant : response.data
            })
        
            
        })
        .catch(e =>{
            console.log(e)    
                })
     
    }
    print = () =>{
        let page = document.getElementById('page');
    html2PDF(page, {
        jsPDF: {
        format: 'a4',
        },
        imageType: 'image/jpeg',
        output: `CertificatAptitude${this.state.Etudiant.nom}_${this.state.Etudiant.prenom}.pdf`
    });
    }

 

    render(){
        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12">
                    
                    <div id="page" className="pr-5 pl-5 border">
                        <Entete></Entete>
                        <CertificatMedical Etudiant={this.state.Etudiant}></CertificatMedical>
                    </div>
                    <div className="row mt-5 d-flex justify-content-center text-center">
                        <button type="submit" className="btn btn-primary  col-lg-4   " onClick={()=> this.print()} id="btn">Imprimer</button>              
                    </div>
                </CCol>
            </CRow>
            </CCardBody>
            </CCard>
        )
    }
}

export default DocVisite