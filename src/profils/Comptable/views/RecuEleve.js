import React, { Component } from "react";
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import { Preview, print } from 'react-html2pdf';
import html2PDF from 'jspdf-html2canvas';

import {
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow,
  } from '@coreui/react'
import Recu from "../../../components/moduleInscription/Recu";

class RecuEleve extends Component {
    print = () =>{
        let page = document.getElementById('page');
    html2PDF(page, {
        jsPDF: {
        format: 'a4',
        },
        imageType: 'image/jpeg',
        output: 'Reçu.pdf'
    });
    }
    render(){

        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12 pt-3">
                    <div className="card container  text-center pt-3  bg-primary white-text">
                        <h1 style={{color:"white"}}>RECU D'INSCRIPTION DIC 1</h1>
                    </div>
                    <Recu></Recu>
           
                    <div className="row d-flex justify-content-center text-center mt-3">
                    <button type="submit" className="btn btn-primary  col-lg-4   " onClick={() => this.print()} id="btn">Imprimer le Reçu</button>              
                    </div>

                </CCol>
            </CRow>
            </CCardBody>
            </CCard>
        )
    }
}

export default RecuEleve