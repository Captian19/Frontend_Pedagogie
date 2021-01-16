import React, { Component } from "react";


import {
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow,
  } from '@coreui/react'
import  UnderCreate from  "../../../../components/moduleInscription/dossier/createUnder.js";
import fin from "../../../../assets/moduleInscription/img/fin.svg"

class EndPage extends Component {
    render(){
        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12">
                    <div class="progress mb-3" style={{height: "25px"}}>
                        <div heigth="20px" class="progress-bar progress-bar-animated progress-bar-striped" role="progressbar" style={{width:"100%", backgroundColor:"green"}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" >Inscription Administrative complete 100 %</div>
                    </div>
                    <div className="text-center pb-5">
                        <div className="card container   bg-primary white-text">
                            <h1 style={{color:"white"}}>Inscription Terminée</h1>
                        </div>

                        <div class="row mt-5">
                            <div className="col-lg-6">
                                <img className="img-fluid" src={fin} width="700px" height="500px" ></img>
                            </div>
                            <div className="col-lg-6 ml-auto align-self-center">
                                <div id="file-upload-form" class="uploader mt-5">
                                    <label for="file-upload" id="file-drag">
                                        <div id="start">
                                            <i  aria-hidden="true"></i>
                                            <div class="text-center">
                                                <svg width="10em" height="10em" viewBox="0 0 16 16" class="bi bi-check-circle-fill" fill="green" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                                </svg>
                                            </div>
                                            <h3 className="mt-5"><b>Vous vous êtes déja inscrit !</b></h3>
                                        </div>
                                    </label>     
                                </div> 
                            </div>
                        </div>
                    </div>

                </CCol>
            </CRow>
            </CCardBody>
            </CCard>
        );
    }
}

export default EndPage;