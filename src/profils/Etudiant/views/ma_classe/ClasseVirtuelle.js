// import React,{useState,useEffect} from "react";
// import {
//     CCard,
//     CCardBody,
//     CCol,
//     CRow,
//     CCardHeader
//   } from '@coreui/react'

// import {connect} from "react-redux"
// import axios from "axios"  


// const ClasseVirtuelle = (props) => {
    
//     const config = {
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Token ${props.token}`
//         },
//     }
    
//     return (
//         <CCard>
//             <CCardBody>
//             <CRow>
//                 <CCardHeader>
//                     <div className="">
//                     <span className="mr-2">Classe</span> <span className="display-5">{props.role.classe}</span>
//                     </div>
//                     <div className="">
//                     <span className="mr-2">Département</span> <span className="display-5">{props.role.departement}</span>
//                     </div>
//                 </CCardHeader>
//                 <CCol sm="12" md="12">
//                 <h1>Classe Virtuelle</h1>
//                 </CCol>
//             </CRow>
//             </CCardBody>
//             </CCard>
//     )
// }

// const mapStateToProps = state => ({
//     user:state.auth.user,
//     role: state.auth.user.CurrentRoles[0],
//     token:state.auth.token
// })

// export default connect(mapStateToProps,null)(ClasseVirtuelle)