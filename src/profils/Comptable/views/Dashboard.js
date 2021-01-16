import React, { Component } from "react";
import { DataGrid } from '@material-ui/data-grid';
import {
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow,
  } from '@coreui/react'
import Search from "./Paiment";
import axios from 'axios';


const columns = [
    { field: 'nom', headerName: 'Nom', width: 250},
    { field: 'prenom', headerName: 'Prénom', width: 250 },
    {
      field: 'classe',
      headerName: 'Classe',
      type : 'text',
      width: 100,
    },
        {
      field: 'departement',
      headerName: 'Département',
      type : 'text',
      width: 120,
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'text',
      width: 150,
    },
        {
      field: 'numeroCarteEtudiant',
      headerName: 'Carte Etudiant',
      type : 'text',
      width: 120,
    },

        {
      field: 'anneeScolaire',
      headerName: 'Année Scolaire',
      type : 'text',
      width: 120,
    },
  ];





class Dashboard extends Component {

    state = {
    etudiants : []
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
                etudiants : response.data
            })
        })
        .catch(e =>{
            console.log(e)    
        
            console.log("Error")
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
                    <div className="col-lg-12  text-center">
                        <h3 >LISTE DES ETUDIANTS</h3>
                    </div>
                  <div class="container mt-5 mb-5 " style={{ height: '1000px', width: '100%' }}>
                        <DataGrid  rows={this.state.etudiants} columns={columns} pageSize={10} checkboxSelection />
                 </div>
                  
                </CCol>
            </CRow>
            </CCardBody>
            </CCard>
        )
    }
}

export default Dashboard