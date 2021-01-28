import React, { Component } from "react";

import {
    CCard,
    CCardBody,
    CCol,
    CRow,
  } from '@coreui/react'
import axios from 'axios';
import ProfilS from '../../../../components/moduleInscription/ProfilS';
import { Link } from 'react-router-dom';
import {
  Input,
} from "mdbreact";



class Liste extends Component {


    state = {
      search: "",
      etudiants : []
    };
   

    componentDidMount(){
        let classe = this.props.match.params.classe.split(" ")[0]
        let dept = this.props.match.params.classe.split(" ")[1]
        let url = `https://users-ent.herokuapp.com/api/auth/ETUDIANT/${classe}/${dept}`;

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


    renderEtudiant = etudiant => {
      // const search  = this.state.search;
      
      // var code = etudiant.pk;
      
     
  
      return (
        <ProfilS etudiant = {etudiant}></ProfilS>
      );
    };
  
  
    
  
    onchange = e => {
      this.setState({ search: e.target.value });  
    };
  



    render(){
        
        const  search  = this.state.search.toLowerCase();
        const filteredCountries = this.state.etudiants.filter(etudiant => {
          if(search.includes(etudiant.user.email)){
            return etudiant
          }
      
        });

        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12">
                <div className="flyout">

                    <div className="card container  text-center pt-3  bg-primary white-text">
                        <h1 style={{color:"white"}}>LISTE DES ETUDIANTS DE LA {this.props.match.params.classe}  </h1>
                    </div>

                    <main style={{ marginTop: "4rem" }}>
                    <div className="container border p-3 mb-5">
                    <div className="row text-center">
                    <div className="col-lg-12">
                    <center>
                    <h3>

                        BARRE DE RECHERCHE 
                    </h3>
                    </center>
                    </div>
                    <div className="col-lg-11 justify-content-center ml-3 mr-3  card  mt-3 mb-3  text-center">
                    <Input
                    label="Rechercher un Etudiant par son adresse email EPT"
                    icon="search"
                    onChange={this.onchange}
                    />
                    </div>
                    <div className="col" />
                    </div>
                    <div className="row">

                    {filteredCountries.map(etudiant => {
                    return this.renderEtudiant(etudiant);
                    })}
                    </div>

                    </div>
                    </main>
                </div>
                <div className="border table-responsive">
                        <table class="table table-striped shadow">
                          <thead>
                            <tr>
                              {/* <th scope="col">ID</th> */}
                              <th scope="col">Nom</th>
                              <th scope="col">Prénom</th>
                              <th scope="col">Email</th>
                              <th scope="col">Inscrire</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.etudiants.map(etudiant => {
                              return (

                                      <tr>
                                        {/* <th scope="row">{}</th> */}
                                        <td>{etudiant.user.last_name}</td>
                                        <td>{etudiant.user.first_name}</td>
                                        <td>{etudiant.user.email}</td>
                                        <td className="justify-content-end">
                                          <Link to={`/scolarite/inscription-administrative/${etudiant.user.first_name}/${etudiant.user.last_name}/${etudiant.user.email}/${etudiant.classe}/${etudiant.departement}/${etudiant.annee.split("/")[0]}/${etudiant.annee.split("/")[1]}/${etudiant.user.id}`}
                                           className="btn btn-primary">Inscrire
                                           </Link>
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

export default Liste