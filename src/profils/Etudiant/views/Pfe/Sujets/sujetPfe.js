import React, {useState, useEffect} from 'react';

import {connect} from 'react-redux';

import {CCard,CCardBody,CCardFooter,CCardHeader,CCol,CRow,CBadge,CCollapse} from '@coreui/react';

import Liste from './listes'

function Sujets (props){
  

  return(
    <>
      <CCard>
            <CCardBody>
                <CRow>
                    <CCol sm="12">
                        <h1>Sujets de PFE</h1>
                        <p>{console.log(props.role.departement)}</p>
                    </CCol>
                    <Liste
                    departement = {props.role.departement}
                    identifiant = {props.role.id}
                    />
                </CRow>
            </CCardBody>
        </CCard>
    </>
  )
}


const MapToState = state =>({
  role: state.auth.user.CurrentRoles[0]
})



export default connect(MapToState, null)(Sujets);