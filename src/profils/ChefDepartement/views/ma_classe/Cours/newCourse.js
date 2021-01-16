// une option ajouter un nouveau cours avec formulaire Newcourseform
//Exactement formulaire ajout cours comme dans l'interface admin de Django

        
import React, {Component} from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CLink
} from  '@coreui/react'


class NewCourse extends Component {
    render(){
    return (
    <>

      <CCol xs="12" sm="6" md="4">
          <CCard color="gradient-secondary">
            <CCardHeader>
            <CLink to = "#" > 
               +New Course
            </CLink>
            </CCardHeader>
            <CCardBody>
                <p>Ajouter Un Nouveau Cours</p>
            </CCardBody>
          </CCard>
        </CCol>

    </>
    )
    }
}


export default NewCourse ;
