// import React, { useState } from 'react'

// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CCollapse,
//   CFormGroup,
//   CTextarea,
//   CInputFile,
//   CRow
// } from '@coreui/react'

// const Collapses = () => {

//   const [collapse, setCollapse] = useState(false)
//   const [collapseMulti, setCollapseMulti] = useState([false, false])
//   const [accordion, setAccordion] = useState(1)
//   const [fade, setFade] = useState(true)

//   const toggle = (e) => {
//     setCollapse(!collapse)
//     e.preventDefault()
//   }

//   const toggleMulti = (type) => {
//     let newCollapse = collapseMulti.slice()
//     switch (type) {
//       case "left":
//         newCollapse[0] = !collapseMulti[0];
//         break;
//       case "right":
//         newCollapse[1] = !collapseMulti[1];
//         break;
//       case "both":
//         newCollapse[0] = !collapseMulti[0];
//         newCollapse[1] = !collapseMulti[1];
//         break;
//       default:
//     }
//     setCollapseMulti(newCollapse)
//   }

//   const toggleFade = () => {
//     setFade(!fade)
//   }

//   return (
//     <CRow>
//       <CCol xl="12">
//       <div id="accordion" className="mt-3">
//                 <CCardHeader id="headingOne">
//                   <CButton 
//                     block 
//                     // color="link" 
//                     className="text-left m-0 p-0" 
//                     onClick={() => setAccordion(accordion === 0 ? null : 0)}
//                   >
//                     <h5 className="m-0 p-0" className="text-center " >
//                        Faire une annonce pour votre classe
//                     </h5>
//                   </CButton>
//                 </CCardHeader>
//                 <CCollapse show={accordion === 0}>
//                   <CCardBody>
//           <CCol xs="12" sm="12" md="12">
//           <CCard>

//             <CCardBody>
//               <CRow>
//                 <CCol xs="12">
//                 <CFormGroup>
//                   <CCol xs="12" md="12">
//                     <CTextarea 
//                       name="textarea-input" 
//                       id="textarea-input" 
//                       rows="9"
//                       placeholder="Faire une annonce ..." 
//                     />
//                   </CCol>
//                 </CFormGroup>
//                 <div className="float-left" padding = "0">
//                   {/* <button className="btn btn-info">Joindre Fichier</button> */}
//                   <CInputFile id="file-input" name="file-input"/>
//                 </div>
//                 <div className="float-right">
//                   <button className="btn btn-primary bg-dark" mr-1 active>Annuler</button>
//                   <button className="btn btn-info bg-pink" active>Publier</button>
//                 </div>
//                 </CCol>
//               </CRow>
//             </CCardBody>
//           </CCard>
//         </CCol>
//               </CCardBody>
//               </CCollapse>
//       </div>
//       </CCol>
//     </CRow>
//   )
// }

// export default Collapses
              