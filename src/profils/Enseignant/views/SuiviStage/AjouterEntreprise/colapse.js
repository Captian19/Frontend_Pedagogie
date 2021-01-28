import React, { useState } from 'react';

import {CCardBody,CCardFooter,CCollapse,CButton,} from '@coreui/react';


import AddEntreprise from './formAddEntreprise';

function Colapse(props){

    const [collapse, setCollapse] = useState(false);


    const onEntering = () => {};
    const onEntered = () => {};
    const onExiting = () => {};
    const onExited = () => {};

    const toggle = (e)=>{
    setCollapse(!collapse);
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
           <AddEntreprise
            clickLoad = {props.clickLoad}
           />

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