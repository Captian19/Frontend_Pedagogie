import React from 'react'
import {
  CButton,
  CCol,
  CContainer,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupAppend,
  CInputGroupText,
  CRow,CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import logo from './../../assets/img/ept.png';

const DeniedAccess = (props) => {
    return(
        <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <div className="text-center">
            <img src={logo} className="img-fluid mb-3" width="150px" />
            </div>
            <div className="shadow mb-3 py-2">
                <h2 className="text-center">ESPACE NUMERIQUE DE TRAVAIL</h2>
            </div>
            <div className="clearfix">
              <h1 className="float-left display-3 mr-4 text-danger">403</h1>
              <h4 className="pt-3 text-danger">Oops! Accès non autorisé</h4>
              <p className="text-muted float-left">Accès autorisé uniquement aux utilisateurs qui ont le profil  '{props.pass}' !</p>
            </div>
            <CInputGroup className="input-prepend">
              <CInputGroupPrepend>
                <CInputGroupText>
                  <CIcon name="cil-magnifying-glass" />
                </CInputGroupText>
              </CInputGroupPrepend>
              <CInput size="16" type="text" placeholder="What are you looking for?" />
              <CInputGroupAppend>
                <CButton color="info">Search</CButton>
              </CInputGroupAppend>
            </CInputGroup>
            <div className="text-center">
                <CLink to="/">Retour</CLink>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
    )
}


export default DeniedAccess