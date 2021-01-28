import React, { Component } from "react";
import Carte from '../../../components/moduleInscription/Carte'
import axios from 'axios';
import {
    CCard,
    CCardBody,
    CCol,
    CRow,
  } from '@coreui/react'

  import { Preview, print } from 'react-html2pdf';

class CarteEtudiant extends Component {

    state={
        etudiant : "",
        nom : "",
        prenom : "",
        lieuNaissance : "",
        nationalite : "",
        quitance : ""
    }

    componentDidMount(){
        let url = `http://127.0.0.1:8000/api/InfoEtudiantDetail/${this.props.match.params.id}`;

        axios.get(url, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                
                etudiant : response.data,
                quitance : response.data.numeroCarteEtudiant.substr(0, 2),
                nom : response.data.nom.toUpperCase(),
                prenom : response.data.prenom.toUpperCase(),
                lieuNaissance : response.data.lieuNaissance.toUpperCase(),
                nationalite : response.data.nationalite.toUpperCase(),
            })
        })
        .catch(e =>{
            console.log(e)    
        
        })
    
    }

    // print = () =>{
    //     let page = document.getElementById('page');
    // html2PDF(page, {
    //     jsPDF: {
    //     format: 'a4',
    //     },
    //     imageType: 'image/jpeg',
    //     output: `CarteEtudiant_${this.state.etudiant.nom}_${this.state.etudiant.prenom}.pdf`
    // });
    
// }


    render(){
        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12">
                    <div className="card container d-flex  text-center pt-3  bg-primary white-text">
                            <h1 style={{color:"white"}}>CARTE ETUDIANT {this.state.etudiant.departement} {this.state.etudiant.anneeScolaire}</h1>
                    </div>

                    <Preview id="jsx-template">

                        <Carte
                            etudiant={this.state.etudiant}
                            quitance = {this.state.quitance}
                            nom={this.state.nom}
                            prenom = {this.state.prenom}
                            lieuNaissance={this.state.lieuNaissance}
                            nationalite = {this.state.nationalite}   
                        >
                        </Carte>

                    </Preview>
   
                    <div className="row d-flex mb-5 mt-5 justify-content-center">
                         <button onClick={()=> print(`CarteEtudiant_${this.state.nom}_${this.state.prenom}`,'jsx-template')} className="btn btn-primary col-lg-4  ">IMPRIMER</button>
                    </div>
                </CCol>
            </CRow>
            </CCardBody>
            </CCard>
        )
    }
}

export default CarteEtudiant