import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CDataTable,
    CCol,
    CRow,
    CBadge,
    CCollapse,
    CButton,
    CContainer,
    CForm,
    CInput,
    CFormText,
    CFormGroup,
    CLabel,
} from '@coreui/react';


import AddEntreprise from './formAddEntreprise';

function Colapse(){

    const [collapse, setCollapse] = useState(false);
    const [collapse2, setCollapse2] = useState(false);

    const onEntering = () => {};
    const onEntered = () => {};
    const onExiting = () => {};
    const onExited = () => {};

    const toggle = (e)=>{
    setCollapse(!collapse);
    e.preventDefault();
    }

    // inner
    const toggle2 = (e)=>{
    setCollapse2(!collapse2);
    e.preventDefault();
    }

    return (
    <div>
        <CCollapse
        show={collapse}
        onEntering={onEntering}
        onEntered={onEntered}
        onExiting={onExiting}
        onExited={onExited}
        >
        <CCardBody>
            <h3>Ajouter une Entreprise</h3>
           <AddEntreprise/>
        </CCardBody>
        </CCollapse>
        <CCardFooter>
        <CButton color="link" onClick={toggle} className={'mb-1'} >
            Ajouter 
        </CButton>
        </CCardFooter>
    </div>
    )
}


export default Colapse;