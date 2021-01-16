import React, { Component } from "react";

import {
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow,
  } from '@coreui/react'

import {connect} from "react-redux";
import axios from 'axios';
import VisiteMed from './VisiteMed'
import FormulaireIns from './FormulaireIns'
import FraisIns from './FraisIns'
import { Link } from 'react-router-dom';
import UnderList from './afficherUnder.js'
import EndPage from "./InscriptionEnd";



class Home extends Component {

    state = {
        etudiant : '',
        etat : ''
    }

    componentDidMount(){

        let anneeScolaire = `${this.props.user.CurrentRoles[0].date_debut.split("-")[0]}-${this.props.user.CurrentRoles[0].date_fin.split("-")[0]}`
        let email = this.props.user.email
        let url =`http://127.0.0.1:8000/api/InfoEtudiantByAnneeScolaireEmail/${anneeScolaire}/${email}`
        axios.get(url, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                etudiant : response.data,
            })
            axios.get(`http://localhost:8000/api/sousDossierVerif/${response.data.id}`)
                .then(res =>{
                    this.setState({
                        etat : res.data
                    })
                    console.log(this.state.etat)

                })
        
        })
        .catch(e =>{
            console.log(e)    
        
        })
     
    }

    DisplayVisiteMedicale = () =>{

        if (this.state.etudiant.validationMedecin===false) { 
          
            return ( 
                <VisiteMed></VisiteMed>
            ); 
          } 
         else if(this.state.etudiant.validationMedecin===true && this.state.etudiant.validationComptable===false){

            return ( 
                <VisiteMed></VisiteMed>
            );

         } else if(this.state.etudiant.validationMedecin===true && this.state.etudiant.validationComptable===true && this.state.etat===false ){

            return ( 
                <FraisIns></FraisIns>
            );

         } 
         else if(this.state.etudiant.validationMedecin===true && this.state.etudiant.validationComptable===true && this.state.etat===true){

            return ( 
                <EndPage></EndPage>
            );

         } 
          else { 
            
            return(
                   <FormulaireIns></FormulaireIns> 
            ); 
        }        
    }

    render(){
        return(
          
            <div> {this.DisplayVisiteMedicale()}</div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
  })

export default connect(mapStateToProps,null)(Home)