import React, { Component } from "react";

import {
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow,
  } from '@coreui/react'
import FormulaireInscription from "../../../../components/moduleInscription/FormulaireInscription";
import VisiteMedicale from "../../../../components/moduleInscription/VisiteMedicale";
import ValidationFrais from "../../../../components/moduleInscription/ValidationFrais";
import {connect} from "react-redux";
import axios from "axios" 


class FormulaireIns extends Component {
 
     
    render(){
        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12">
                    <div class="progress mb-3" style={{height: "25px"}}>
                            <div class="progress-bar progress-bar-animated progress-bar-striped" role="progressbar" style={{width:"25%", backgroundColor:"green"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">Inscription Administrative en cours... 25%</div>
                    </div>
                    <FormulaireInscription user={this.props.user}></FormulaireInscription>
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
export default connect(mapStateToProps,null)(FormulaireIns)