import React, { useState, useEffect } from "react";
import {connect} from "react-redux";

import {
    CCard,
    CCardBody,
    CCol,
    CRow,
  } from '@coreui/react'


const Dashboard = (props) => {
    const [departement, setDepartement] = useState('');
    console.log(props.roles);

    const getDepartement = () => {
        props.roles.map((role) => {
            if(role.role_type == "CHEF_DE_DEPARTEMENT"){
                setDepartement(role.departement);
            }
        })
    }

    console.log(departement);

    useEffect(() =>{getDepartement();},'');
    return(
        <CCard>
        <CCardBody>
        <CRow>
            <CCol sm="12">
                <h1>Hello World Enseignant</h1>
                <h3>Mes roles .</h3>

                {departement}
            </CCol>
        </CRow>
        </CCardBody>
        </CCard>
    )
}

const mapStateToProps = (state) => ({
    roles: state.auth.user.CurrentRoles
})

export default connect(mapStateToProps,null)(Dashboard)