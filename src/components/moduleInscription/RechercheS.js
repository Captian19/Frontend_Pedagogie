import React, { Component } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css'; import
'bootstrap-css-only/css/bootstrap.min.css'; import
'mdbreact/dist/css/mdb.css';

import {
  Button,
  Input,
  Footer,
  Card,
  CardBody,
  CardImage,
  CardTitle,
  CardText
} from "mdbreact";

import axios from 'axios';
import '../../assets/moduleInscription/css/style.css'
import ProfilS from "./ProfilS";


class Search extends Component {
  state = {
    search: "",
    etudiant : []
  };

  componentDidMount(){
     

    let url = 'http://127.0.0.1:8000/api/InfoEtudiantList';
    axios.get(url, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then(response => {
        this.setState({
            etudiant : response.data
        })
        // console.log(this.state.b)
    
        
    })
    .catch(e =>{
        console.log(e)    
    
        console.log("Error")
    })
 
}

  renderEtudiant = etudiant => {
    const search  = this.state.search;
    
    var code = etudiant.pk;
    
   

    return (
      <ProfilS etudiant = {etudiant}></ProfilS>
    );
  };


  

  onchange = e => {
    this.setState({ search: e.target.value });
  
  };

 
    
 

  

  render() {
  
    const  search  = this.state.search.toLowerCase();
    const filteredCountries = this.state.etudiant.filter(etudiant => {
      if(search.includes(etudiant.nombreEnfants)){
        return etudiant
      }
   
    });

    return (
      <div className="flyout">

                <div className="card container  text-center pt-3  bg-primary white-text">
                    <h1 style={{color:"white"}}>INSCRIPTION ADMINISTRATIVE</h1>
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
    );
  }
}

export default Search;
