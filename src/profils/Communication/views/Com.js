import React, { Component } from "react";
import repo from '../../../assets/moduleInscription/img/image.png';
import { Link } from 'react-router-dom';


import {
    CCard,
    CCardBody,
    CCol,
    CRow,
  } from '@coreui/react'
import Recherche from "./Recherche";



class Com extends Component {

    render(){
        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12">
                    <Recherche></Recherche>
                    <div className="row">
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/communication/liste-des-etudiants/TC1 TC'>
                                <img width="200px" src={repo}></img>
                                <div className="justify-content-center">TC1</div>
                            </Link>
                        </div>
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/communication/liste-des-etudiants/TC2 TC'>
                                <img width="200px" src={repo}></img>
                                <div>TC2</div>
                            </Link>
                        </div>
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/communication/liste-des-etudiants/DIC1 GIT'>
                                <img width="200px" src={repo}></img>
                                <div>DIC1 GIT</div>
                            </Link>
                        </div>
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/communication/liste-des-etudiants/DIC1 GEM'>
                                <img width="200px" src={repo}></img>
                                <div>DIC1 GEM</div>
                            </Link>
                        </div>
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/communication/liste-des-etudiants/DIC1 AERO'>
                                <img width="200px" src={repo}></img>
                                <div>DIC1 AERO</div>
                            </Link>
                        </div>
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/communication/liste-des-etudiants/DIC1 GC'>
                                <img width="200px" src={repo}></img>
                                <div>DIC1 GC</div>
                            </Link>
                        </div>
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/communication/liste-des-etudiants/DIC2 GIT'>
                                <img width="200px" src={repo}></img>
                                <div>DIC2 GIT</div>
                            </Link>
                        </div>
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/communication/liste-des-etudiants/DIC2 GEM'>
                                <img width="200px" src={repo}></img>
                                <div>DIC2 GEM</div>
                            </Link>
                        </div>
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/communication/liste-des-etudiants/DIC2 AERO'>
                                <img width="200px" src={repo}></img>
                                <div>DIC2 AERO</div>
                            </Link>
                        </div>
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/communication/liste-des-etudiants/DIC2 GC'>
                                <img width="200px" src={repo}></img>
                                <div>DIC2 GC</div>
                            </Link>
                        </div>
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/communication/liste-des-etudiants/DIC3 GIT'>
                                <img width="200px" src={repo}></img>
                                <div>DIC3 GIT</div>
                            </Link>
                        </div>
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/communication/liste-des-etudiants/DIC3 GEM'>
                                <img width="200px" src={repo}></img>
                                <div>DIC3 GEM</div>
                            </Link>
                        </div>
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/communication/liste-des-etudiants/DIC3 AERO'>
                                <img width="200px" src={repo}></img>
                                <div>DIC3 AERO</div>
                            </Link>
                        </div>
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/communication/liste-des-etudiants/DIC3 GC'>
                                <img width="200px" src={repo}></img>
                                <div>DIC3 GC</div>
                            </Link>
                        </div>
                      
                    </div>
                    
                </CCol>
            </CRow>
            </CCardBody>
            </CCard>
        )
    }
}

export default  Com