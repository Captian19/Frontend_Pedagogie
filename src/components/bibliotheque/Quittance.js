import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { PDFViewer } from '@react-pdf/renderer';
import QuittancePdf from './QuittancePdf';

const BASE_ELASTICSEARCH_URL = "http://127.0.0.1:9200/bibliotheque/doc_etudiant_document/_search?"
const Quittance = () => {

    const [etudiant, setEtudiant] = useState({hits_etudiant:[]})
    const [quittance, setQuittance] = useState({hits_quit:[]})
    

    useEffect(()=>{
        const getEtudiant = async (email) =>{
            const etudiant_data = await (await axios.get(`http://localhost:8000/etudiant_b/?email=${email}`)).data.results[0]
            setEtudiant(etudiant_data);
        };
        const getQuittance = async () =>{
            const quittance_data = await (await axios.get(`http://localhost:8000/document_etudiant/?etudiant=${etudiant.id}&type=quittance`)).data.results[0]
            setQuittance(quittance_data);
        };
        getEtudiant("tmouhamet@ept.sn");


    },[]);

    
    return(
        <div className="container">
            <div className="py-4">
                <h3>Quittance N° {etudiant.id}</h3>
                <PDFViewer  className="col-md-12" height="550">
                    <QuittancePdf quittance={quittance} etudiant={etudiant} />
                </PDFViewer>
            </div>
        </div>
    )
};

export default Quittance;
