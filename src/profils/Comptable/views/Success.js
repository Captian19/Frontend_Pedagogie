import React, { Component } from "react";

import {
    CCard,
    CCardBody,
    CCol,
    CRow,
  } from '@coreui/react'
  import { Link } from 'react-router-dom';

class Succes extends Component {
    render(){
        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12">
                <div className="card container  text-center pt-3  bg-primary white-text">
                        <h1 style={{color:"white"}}>VALIDATION DU PAIEMENT </h1>
                    </div>
                <div id="file-upload-form" class="uploader mt-5 mb-5" >
                    <label for="file-upload"  id="file-drag" className="mb-5">
                        <div id="start" style={{marginBottom:"50px"}}>
                                <i  aria-hidden="true"></i>
                                <div class="text-center">
                                    <svg width="15em" height="15em" viewBox="0 0 16 16" class="bi bi-check-circle-fill" fill="green" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                    </svg>
                                </div>
                                <h3 className="mt-5" ><b>Paiement effectué avec succés !</b></h3>
                                {/* <div className="row d-flex justify-content-center text-center mt-3">
                                    <Link to='/comptable/validation/imprimer-reçu'  className="btn btn-primary  col-lg-4   " >Imprimer le reçu</Link>              
                                </div> */}
                        </div> 
                    </label>   
                </div> 
               
                  
                </CCol>
            </CRow>
            </CCardBody>
            </CCard>
        )
    }
}

export default Succes