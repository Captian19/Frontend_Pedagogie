import React, { Component } from "react";
import fiche from '../../../assets/moduleInscription/img/fichier.png'
import { Link } from 'react-router-dom';


import {
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow,
  } from '@coreui/react'

class SousDossier extends Component {
    render(){
        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12">
                        <div className="card container  text-center pt-3  bg-primary white-text">
                            <h1 style={{color:"white"}}>RECUS D'INSCRIPTION</h1>
                        </div>
                        <div className="row mt-3 mb-5">
                            <div className="col-lg-3 mt-3 text-center ">
                                <Link to='/comptable/dossier-etudiant-fichiers-reçu'>
                                    <img width="150px" src={fiche}></img>
                                    <div >Mame Diarra Sow</div>
                                </Link>
                            </div>
                            <div className="col-lg-3 mt-3 text-center ">
                                <Link to='/comptable/dossier-etudiant-fichiers-reçu'>
                                    <img width="150px" src={fiche}></img>
                                </Link>
                                <label >Mame Diarra Sow</label>
                            </div>
                            <div className="col-lg-3 mt-3 text-center ">
                                <Link to='/comptable/dossier-etudiant-fichiers'>
                                    <img width="150px" src={fiche}></img>
                                </Link>
                                <label >Mame Diarra Sow</label>
                            </div>
                            <div className="col-lg-3 mt-3 text-center ">
                                <Link to='/comptable/dossier-etudiant-fichiers'>
                                    <img width="150px" src={fiche}></img>
                                </Link>
                                <label >Mame Diarra Sow</label>
                            </div>
                            <div className="col-lg-3 mt-3 text-center ">
                                <Link to='/comptable/dossier-etudiant-fichiers'>
                                    <img width="150px" src={fiche}></img>
                                </Link>
                                <label >Mame Diarra Sow</label>
                            </div>
                        </div>
                    
                </CCol>
            </CRow>
            </CCardBody>
            </CCard>
        )
    }
}

export default SousDossier