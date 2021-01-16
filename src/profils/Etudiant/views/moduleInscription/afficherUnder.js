import React, { Component } from "react";
import axios from 'axios';


import {
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow,
  } from '@coreui/react'
import  Under from  "../../../../components/moduleInscription/dossier/under.js";
import { connect } from "react-redux";

class UnderList extends Component {
    state ={
        sousDossier : [],
        Etudiant :{},
    }
    
    componentDidMount(){
        let anneeScolaire = `${this.props.user.CurrentRoles[0].date_debut.split("-")[0]}-${this.props.user.CurrentRoles[0].date_fin.split("-")[0]}`
        let email = this.props.user.email
        let url =`http://127.0.0.1:8000/api/InfoEtudiantByEmail/${email}`
        axios.get(url, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            const Etudiant = response.data
            this.setState({Etudiant})
            response.data.map(res => {
                axios.get(`http://localhost:8000/api/sousDossierDetails/${res.id}`)
                .then( response_1 =>{
                    const sousDossier = response_1.data;
                    this.setState({ sousDossier });
                    console.log(this.state.sousDossier)
                })
            })
            })
           
        
        .catch(e =>{
            console.log(e)    
        
        })
        
               
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
                    <div className="row mt-5 text-center">
                    {this.state.sousDossier.map(sous => <Under sousDossier={sous}  key={sous.id}></Under>)}

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
export default connect(mapStateToProps,null)(UnderList);