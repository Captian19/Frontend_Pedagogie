import React, { Component } from "react";

import {
    CCard,
    CCardBody,
    CCol,
    CRow,
  } from '@coreui/react'
import axios from 'axios';

import {connect} from "react-redux";
import moment from 'moment';
import localization from 'moment/locale/fr';
moment.updateLocale('fr', localization);


class StatDetails extends Component {


    state = {
        etudiants : [],
        etudiantsClasse:[],
      };
     
  
      componentDidMount(){
          let anneeScolaire = `${(this.props.user.CurrentRoles[0].annee.split("/")[0])}-${(this.props.user.CurrentRoles[0].annee.split("/")[1])}`
          let classe = this.props.match.params.classe
          let dept = this.props.match.params.departement
          let url = `http://127.0.0.1:8000/api/InfoEtudiantByAnneeScolaireClasseDept/${anneeScolaire}/${classe}/${dept}`;
  
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

          let url2 = `https://users-ent.herokuapp.com/api/auth/ETUDIANT/${classe}/${dept}`;
          axios.get(url2, {
            headers: {
              'content-type': 'multipart/form-data'
            }
          })
          .then(response => {
              this.setState({
                  etudiantsClasse : response.data
              })
          })
          .catch(e =>{
              console.log(e)    
          
          })
      
      }


    



    render(){

        let  p = 100 * this.state.etudiants.length/this.state.etudiantsClasse.length
        let  pn = 100 - 100 * this.state.etudiants.length/this.state.etudiantsClasse.length

        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12">

                <div className="card container  text-center pt-3  bg-primary white-text">
                    <h1 style={{color:"white"}}>LISTE DES ETUDIANTS INSCRITS DE LA {this.props.match.params.classe} {this.props.match.params.departement} </h1>
                </div>

                <div className="row mt-5 mb-5 ">
                    <div className="col-6 text-center">
                        <h2>{this.state.etudiants.length} ETUDIANTS INSCRITS</h2>
                        <div class="progress mb-3" style={{height: "25px"}}>
                            <div class="progress-bar progress-bar-animated progress-bar-striped" role="progressbar" style={{width:`${p}%`, backgroundColor:"green"}} aria-valuenow={p} aria-valuemin="0" aria-valuemax="100">{p}%</div>
                        </div>
                    </div>
                    <div className="col-6 text-center">
                        <h2>{this.state.etudiantsClasse.length - this.state.etudiants.length} ETUDIANTS NON INSCRITS</h2>
                        <div class="progress mb-3" style={{height: "25px"}}>
                            <div class="progress-bar progress-bar-animated progress-bar-striped" role="progressbar" style={{width:`${pn}%`, backgroundColor:"red"}} aria-valuenow={pn} aria-valuemin="0" aria-valuemax="100">{pn}%</div>
                        </div>
                    </div>
                </div>

              

       
                <div className="border table-responsive">
                        <table class="table table-striped shadow">
                          <thead>
                            <tr>
                              {/* <th scope="col">ID</th> */}
                              <th scope="col">Nom</th>
                              <th scope="col">Prénom</th>
                              <th scope="col">Email</th>
                              <th scope="col">Date d'inscription</th>
                              <th scope="col">Inscription</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.etudiants.map(etudiant => {
                              return (

                                      <tr>
                                        {/* <th scope="row">{}</th> */}
                                        <td>{etudiant.nom}</td>
                                        <td>{etudiant.prenom}</td>
                                        <td>{etudiant.email}</td>
                                        <td className="">{moment(etudiant.date).format('Do MMMM YYYY')}</td>
                                        <td>
                                            <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-check-circle-fill" fill="green" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                            </svg>
                                        </td>
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

export default connect(mapStateToProps,null)(StatDetails)