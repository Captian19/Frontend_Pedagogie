import React, { Component } from "react";
import RechercheS from '../../../../components/moduleInscription/RechercheS';
import axios from 'axios';
import repo from '../../../../assets/moduleInscription/img/image.png';
import { Link } from 'react-router-dom';


import {
    CCard,
    CCardBody,
    CCol,
    CRow,
  } from '@coreui/react'



class Recherche extends Component {


  state = {
    etudiants : []
  };
   
 


    componentDidMount(){
        let url = 'http://127.0.0.1:8000/api/InfoEtudiantList';

        axios.get(url, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                etudiants : response.data
            })
        })
        .catch(e =>{
            console.log(e)    
        
            console.log("Error")
        })
    
    }


    render(){
        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12">
                    <RechercheS></RechercheS>
                    <div className="row">
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/scolarite/LesDosssiers/classe/TC1 TC'>
                                <img width="200px" src={repo} alt="classe"  ></img>
                                <div className="justify-content-center">TC1</div>
                            </Link>
                        </div>
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/scolarite/LesDosssiers/classe/TC2 TC'>
                                <img width="200px" src={repo} alt="classe"></img>
                                <div>TC2</div>
                            </Link>
                        </div>
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/scolarite/LesDosssiers/classe/DIC1 GIT'>
                                <img width="200px" src={repo} alt="classe"></img>
                                <div>DIC1 GIT</div>
                            </Link>
                        </div>
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/scolarite/LesDosssiers/classe/DIC1 GEM'>
                                <img width="200px" src={repo} alt="classe"></img>
                                <div>DIC1 GEM</div>
                            </Link>
                        </div>
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/scolarite/LesDosssiers/classe/DIC1 AERO'>
                                <img width="200px" src={repo} alt="classe"></img>
                                <div>DIC1 AERO</div>
                            </Link>
                        </div>
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/scolarite/LesDosssiers/classe/DIC1 GC'>
                                <img width="200px" src={repo} alt="classe"></img>
                                <div>DIC1 GC</div>
                            </Link>
                        </div>
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/scolarite/LesDosssiers/classe/DIC2 GIT'>
                                <img width="200px" src={repo} alt="classe"></img>
                                <div>DIC2 GIT</div>
                            </Link>
                        </div>
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/scolarite/LesDosssiers/classe/DIC2 GEM'>
                                <img width="200px" src={repo} alt="classe"></img>
                                <div>DIC2 GEM</div>
                            </Link>
                        </div>
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/scolarite/LesDosssiers/classe/DIC2 AERO'>
                                <img width="200px" src={repo} alt="classe"></img>
                                <div>DIC2 AERO</div>
                            </Link>
                        </div>
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/scolarite/LesDosssiers/classe/DIC2 GC'>
                                <img width="200px" src={repo} alt="classe"></img>
                                <div>DIC2 GC</div>
                            </Link>
                        </div>
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/scolarite/LesDosssiers/classe/DIC3 GIT'>
                                <img width="200px" src={repo} alt="classe"></img>
                                <div>DIC3 GIT</div>
                            </Link>
                        </div>
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/scolarite/LesDosssiers/classe/DIC3 GEM'>
                                <img width="200px" src={repo} alt="classe"></img>
                                <div>DIC3 GEM</div>
                            </Link>
                        </div>
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/scolarite/LesDosssiers/classe/DIC3 AERO'>
                                <img width="200px" src={repo} alt="classe"></img>
                                <div>DIC3 AERO</div>
                            </Link>
                        </div>
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/scolarite/LesDosssiers/classe/DIC3 GC'>
                                <img width="200px" src={repo} alt="classe"></img>
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

export default Recherche