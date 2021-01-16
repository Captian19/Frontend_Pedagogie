import React, { Component } from "react";
import { DataGrid } from '@material-ui/data-grid';
import RechercheS from '../../../../components/moduleInscription/RechercheS'
import {
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow,
  } from '@coreui/react'
import Search from "../../../Medecin/views/VisiteMedicale";

  const columns = [
    { field: 'firstName', headerName: 'Nom', width: 300},
    { field: 'lastName', headerName: 'Prénom', width: 300 },
    {
      field: 'Email',
      headerName: 'Email',
      type: 'text',
      width: 300,
    },
    {
      field: 'Classe',
      headerName: 'Classe',
      type : 'text',
      width: 160,
    },
  ];


const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', Email: 35 , Classe : 'DIC1'},
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', Email: 42, Classe : 'DIC1' },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', Email: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

class Recherche extends Component {
    render(){
        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12">
                    <RechercheS></RechercheS>
                  <div className="col-lg-12  text-center">
                        <h3 >LISTE DES ETUDIANTS</h3>
                  </div>
                  <div class="container mt-5 mb-5 " style={{ height: '1000px', width: '100%' }}>
                        <DataGrid  rows={rows} columns={columns} pageSize={10} checkboxSelection />
                 </div>
                </CCol>
            </CRow>
            </CCardBody>
            </CCard>
        )
    }
}

export default Recherche