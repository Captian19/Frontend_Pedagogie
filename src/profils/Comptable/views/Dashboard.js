import React, { Component } from "react";
import {
    CCard,
    CCardBody,
    CCol,
    CRow,
  } from '@coreui/react'
import Search from "./Paiment";
import axios from 'axios';
import { Link } from 'react-router-dom';
import {connect} from "react-redux";




class Dashboard extends Component {

    state = {
    etudiants : []
  };
   
 


    componentDidMount(){
        let anneeScolaire = `${(this.props.user.CurrentRoles[0].annee.split("/")[0])}-${(this.props.user.CurrentRoles[0].annee.split("/")[1])}`
        let url = `http://127.0.0.1:8000/api/InfoEtudiantByValidationComptable/${anneeScolaire}`;

        axios.get(url, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                etudiants : response.data
            })
        })
        .catch(e =>{
            console.log(e)    
                })
    
    }


    render(){
              console.log(this.state.etudiants)

        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12">
                  <Search></Search>
                    <div className="col-lg-12 mb-5  text-center">
                        <h3 >LISTE DES ETUDIANTS</h3>
                    </div>
                    <div className="border table-responsive mb-5">
                        <table class="table table-striped shadow">
                          <thead>
                            <tr>
                              <th scope="col">ID</th>
                              <th scope="col">Nom</th>
                              <th scope="col">Prénom</th>
                              <th scope="col">Classe</th>
                              <th scope="col">Département</th>
                              <th scope="col">Email</th>
                              <th scope="col">Paiement</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.etudiants.map(etudiant => {
                              return (

                                      <tr>
                                        <th scope="row">{etudiant.numeroCarteEtudiant}</th>
                                        <td>{etudiant.nom}</td>
                                        <td>{etudiant.prenom}</td>
                                        <td>{etudiant.classe}</td>
                                        <td>{etudiant.departement}</td>
                                        <td>{etudiant.email}</td>
                                        <td className="justify-content-end"><Link to={`/comptable/validation-paiement/${etudiant.id}`} className="btn btn-primary">Générer un reçu</Link></td>
                                      </tr>
                              )
                            } )}
                          </tbody>
                        </table>
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

export default connect(mapStateToProps,null)(Dashboard)