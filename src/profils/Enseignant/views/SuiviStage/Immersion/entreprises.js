import React, {useState} from "react";

import {CCard,CCardBody,CCardFooter,CCardHeader,CCol,CRow} from '@coreui/react'

import Entreprises from './toutes'
import Colapse from './AjouterImmersion/colapse';



const immersion ={
  immersion:{
    backgroundColor:'#EC7063',
    color:'#fff',
  }
}

function Immersion() {

  const [reload, setReload] = useState(false)

  function refreshPage(e) {
      setReload(!reload)
  }    


  return (
    <div>
      <CCard>
        
        <CCardHeader style={immersion.immersion} >
        <h1 align="center">Immersion</h1>
        </CCardHeader>

        <CCardBody>
          <CRow>
            <CCol sm="12">
             
              <Entreprises 
              reload={reload}
              />


            </CCol>
          </CRow>
        </CCardBody>
        
        <CCardFooter>
          <div>
            <Colapse
            clickLoad={e=>refreshPage()}
            />
          </div>
         
        </CCardFooter>

      </CCard>

    </div>

  )
}


export default Immersion;