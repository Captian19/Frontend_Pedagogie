import React, { Component } from "react";
import html2PDF from 'jspdf-html2canvas';
import {
    CCard,
    CCardBody,
    CCol,
    CRow,
  } from '@coreui/react'
import Recu from "../../../components/moduleInscription/Recu";
import axios from 'axios';


class RecuEleve extends Component {


    state = {
        search: "",
        etudiant : []
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
                etudiant : response.data
            })
        
            
        })
        .catch(e =>{
            console.log(e)    
                })
     
    }

    printRecu = () =>{
        let page = document.getElementById('page');
    html2PDF(page, {
        jsPDF: {
        format: 'a4',
        },
        imageType: 'image/jpeg',
        output: `Reçu_${this.state.etudiant.nom}_${this.state.etudiant.prenom}.pdf`
    });
    }
 
    render(){

        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12 pt-3">
                    <div  className="card container  text-center pt-3  bg-primary white-text">
                        <h1 style={{color:"white"}}>RECU D'INSCRIPTION {this.state.etudiant.classe} {this.state.etudiant.departement} {this.state.etudiant.anneeScolaire} {this.state.etudiant.prenom} {this.state.etudiant.nom}</h1>
                    </div>
                        
                    <Recu  etudiant={this.state.etudiant}></Recu>
           
                    <div className="row d-flex justify-content-center text-center mt-3">
                        <button  className="btn btn-primary  col-lg-4" onClick={()=> this.printRecu()} >Imprimer le Reçu</button>              
                    </div>



                </CCol>
            </CRow>
            </CCardBody>
            </CCard>
        )
    }
}

export default RecuEleve