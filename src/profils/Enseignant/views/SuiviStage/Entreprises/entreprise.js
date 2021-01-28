import React, {useState} from "react";

import {CCard,CCardBody,CCardHeader,CCol,CRow} from '@coreui/react'


//import Menu from  './menuClasse'
import Colapse from '../AjouterEntreprise/colapse';
import AllEntreprises from './allEntreprise';


function Entreprise() {

    const [reload, setReload] = useState(false)

    function refreshPage(e) {
        setReload(!reload)
    }    


    return(
        <CCard>
            <CCardHeader style={{backgroundColor:'#3c4b64', color:'#fff'}}>
                    <h1 align="center">Entreprises</h1>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol sm="12">
                    <h1> </h1>
                    <AllEntreprises
                        reload={reload}
                        
                    />
                        {/* <Menu/> */}
                        <div>
                            <Colapse
                                clickLoad={e=>refreshPage()}
                            />
                        </div>
                        
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    );
}

export default Entreprise;