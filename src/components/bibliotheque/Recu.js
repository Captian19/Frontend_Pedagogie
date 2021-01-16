import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { PDFViewer } from '@react-pdf/renderer';
import RecuPdf from "./RecuPdf";

const BASE_ELASTICSEARCH_URL = "http://127.0.0.1:9200/bibliotheque/doc_etudiant_document/_search?"
const Recu = () => {
    
    const [etudiant, setEtudiant] = useState({hits_etudiant:[]})
    const [recu, setRecu] = useState({hits_quit:[]})
    

    useEffect(()=>{
        const getEtudiant = async (email) =>{
            const etudiant_data = await (await axios.get(`http://localhost:8000/etudiant_b/?email=${email}`)).data.results[0]
            setEtudiant(etudiant_data);
        };
        const getrecu = async () =>{
            const recu_data = await (await axios.get(`http://localhost:8000/document_etudiant/?etudiant=${etudiant.id}&type=recu`)).data.results[0]
            setRecu(recu_data);
        };
        getEtudiant("tmouhamet@ept.sn");


    },[]);

    return(
        <div className="container">
            <div className="py-4">
                <h3>Reçu N° {etudiant.id}</h3>
                <PDFViewer className="col-md-12" height="550" >
                    <RecuPdf recu={recu} etudiant={etudiant} />
                </PDFViewer>
            </div>
        </div>
    )
};

export default Recu;