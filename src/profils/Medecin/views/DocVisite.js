import React, { Component } from "react";
import html2PDF from 'jspdf-html2canvas';
import $ from 'jquery'

import {
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow,
  } from '@coreui/react'
import Entete from "../../../components/moduleInscription/Entete";
import CertificatMedical from "../../../components/moduleInscription/CertificatMedical";



class DocVisite extends Component {
    print = () =>{
        let page = document.getElementById('page');
    html2PDF(page, {
        jsPDF: {
        format: 'a4',
        },
        imageType: 'image/jpeg',
        output: 'CertificatAptitude.pdf'
    });
    }

    // printContent(el){
    //     var restorepage = $('body').html();
    //     var printcontent = $('#' + el).clone();
    //     $('body').empty().html(printcontent);
    //     window.print();
    //     $('body').html(restorepage);
    //     }

    render(){
        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12">
                    
                    <div id="page" className="pr-5 pl-5 border">
                        <Entete></Entete>
                        <CertificatMedical></CertificatMedical>
                    </div>
                    <div className="row mt-5 d-flex justify-content-center text-center">
                        <button type="submit" className="btn btn-primary  col-lg-4   " onClick={()=> this.print()} id="btn">Imprimer</button>              
                    </div>
                </CCol>
            </CRow>
            </CCardBody>
            </CCard>
        )
    }
}

export default DocVisite