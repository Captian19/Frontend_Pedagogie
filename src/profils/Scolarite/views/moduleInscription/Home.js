import React, { Component } from "react";
import {connect} from "react-redux";
import axios from 'axios';
import Visite from './Visite'
import EndPage from "../../../Etudiant/views/moduleInscription/InscriptionEnd";
import Inscription from "./Inscription";
import InscriptionAncien from "./InscriptionAncien";



class Home extends Component {

    state = {
        etudiant : '',
        etat : ''
    }

    componentDidMount(){

        let anneeScolaire = `${this.props.match.params.anneeDebut}-${this.props.match.params.anneeFin}`
        let email = this.props.match.params.email
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
                <Visite
                            nom={this.props.match.params.nom}
                            prenom={this.props.match.params.prenom}
                            email={this.props.match.params.email} 
                            classe={this.props.match.params.classe}
                            departement={this.props.match.params.departement}
                            anneeScolaire={`${this.props.match.params.anneeDebut}-${this.props.match.params.anneeFin}`}

                ></Visite>
            ); 
          } 
         else if(this.state.etudiant.validationMedecin===true && this.state.etudiant.validationComptable===false){

            return ( 
                <Visite
                            nom={this.props.match.params.nom}
                            prenom={this.props.match.params.prenom}
                            email={this.props.match.params.email} 
                            classe={this.props.match.params.classe}
                            departement={this.props.match.params.departement}
                            anneeScolaire={`${this.props.match.params.anneeDebut}-${this.props.match.params.anneeFin}`}

                ></Visite>
            );

         } else if(this.state.etudiant.validationMedecin===true && this.state.etudiant.validationComptable===true && this.state.etat===false ){

            return ( 
                <Visite
                            nom={this.props.match.params.nom}
                            prenom={this.props.match.params.prenom}
                            email={this.props.match.params.email} 
                            classe={this.props.match.params.classe}
                            departement={this.props.match.params.departement}
                            anneeScolaire={`${this.props.match.params.anneeDebut}-${this.props.match.params.anneeFin}`}

                ></Visite>
            );

         } 
         else if(this.state.etudiant.validationMedecin===true && this.state.etudiant.validationComptable===true && this.state.etat===true){

            return ( 
                <EndPage></EndPage>
            );

         } 
         else if(this.props.match.params.classe==="TC1") { 
            
            return(
                   <Inscription
                            IDE={this.props.match.params.IDE}
                            nom={this.props.match.params.nom}
                            prenom={this.props.match.params.prenom}
                            email={this.props.match.params.email} 
                            classe={this.props.match.params.classe}
                            departement={this.props.match.params.departement}
                            anneeScolaire={`${this.props.match.params.anneeDebut}-${this.props.match.params.anneeFin}`}
                   ></Inscription> 
            ); 
        }     
          else { 
            
            return(
                   <InscriptionAncien
                            IDE={this.props.match.params.IDE}
                            nom={this.props.match.params.nom}
                            prenom={this.props.match.params.prenom}
                            email={this.props.match.params.email} 
                            classe={this.props.match.params.classe}
                            departement={this.props.match.params.departement}
                            anneeScolaire={`${this.props.match.params.anneeDebut}-${this.props.match.params.anneeFin}`}
                   ></InscriptionAncien> 
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