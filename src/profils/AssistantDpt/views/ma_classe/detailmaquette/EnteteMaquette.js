import React from "react";
import {connect} from 'react-redux' ;

import axios from 'axios';
// import {
//     CCard,
//     CCardBody,
//     CCardFooter,
//     CCardHeader,
//     CCol,
//     CRow,
//   } from '@coreui/react'


  function EnteteMaquette(props){


    return(
        <thead className="table-info">
            <tr id="entete">
                <th colSpan={43} className="py-3"><center><h3>Maquette  {props.role.departement} </h3> </center></th>
            </tr>
            <tr>
                <th className="text-center" colSpan={2} rowSpan="2">Classe</th>
                <th className="text-center" colSpan={2} rowSpan="2">Semestre</th>
                <th className="text-center" colSpan={4} rowSpan="2">U.E.</th>
                <th className="text-center" colSpan={3} rowSpan="2">Code U.E.</th>

                <th className="text-center" colSpan={16} rowSpan="2">EC</th>
                <th className="text-center" colSpan={4} rowSpan="2">Code E.C.</th>
                
                <th className="text-center" colSpan={4}> Charge horaire</th>

                <th className="text-center" rowSpan={2}>Credit E.C.</th>
                <th className="text-center" rowSpan={2}>Coef</th>
                <th className="text-center" rowSpan={2}>action</th>
                <th className="text-center" rowSpan={2}>TotalCoefUE</th>
            
            </tr>
            <tr>
                <th className="text-center">CM</th>
                <th className="text-center">TD & TP</th>
                <th className="text-center">Total</th>
                <th className="text-center">TPE</th>
            </tr>
        </thead>
        
    )
  }

  
const mapStateToProps = state => ({
    role: state.auth.user.CurrentRoles[0],
})
  export default connect(mapStateToProps,null)(EnteteMaquette);