import React, { Component } from "react";

import {
    CCard,
    CCardBody,
    CCol,
    CRow,
  } from '@coreui/react'
import FormulaireInscription from "../../../../components/moduleInscription/FormulaireInscription";
import {connect} from "react-redux";
import axios from "axios" 
import FormulaireInscriptionAncien from "../../../../components/moduleInscription/FormulaireInscriptionAncien";


class FormulaireIns extends Component {

    state = {
        verification : '',
        student : ""
    }


componentDidMount(){

    let url = `http://127.0.0.1:8000/api/InfoEtudiantByEmail/${this.props.user.email}`;
    axios.get(url, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then(response => {
        this.setState({
            student : response.data[0]
        })     
        
    })
    .catch(e =>{
        console.log(e)
    });

    let url2 = `http://127.0.0.1:8000/api/InfoEtudiantByEmailVerif/${this.props.user.email}`;
    axios.get(url2, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then(response => {
        this.setState({
            verification : response.data
        })     
        
    })
    .catch(e =>{
        console.log(e)
    })

 
}

Verification = ()=>{
    if(this.state.verification==true){
        return(
            <FormulaireInscription user={this.props.user} student={this.state.student}></FormulaireInscription>
        );
    }else{
        return(
            <FormulaireInscriptionAncien user={this.props.user} ></FormulaireInscriptionAncien>
        )
    }
}
 
     
    render(){
        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12">
                    <div class="progress mb-3" style={{height: "25px"}}>
                            <div class="progress-bar progress-bar-animated progress-bar-striped" role="progressbar" style={{width:"25%", backgroundColor:"green"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">Inscription Administrative en cours... 25%</div>
                    </div>

                    {this.Verification()}
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