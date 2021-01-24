// // L'ensemble des cours correspondant au profil du user.
        
// import React, {Component} from 'react'
// import {
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CRow,
//   CLink
// } from  '@coreui/react'
// import CIcon from '@coreui/icons-react'
// import { cilBold } from '@coreui/icons';
// import {connect} from "react-redux" // add
// import { API_URL } from  "../../../../../../constants/pedagogie/index";
// import axios from "axios";
// import { TRUE } from "node-sass";

// class MesCours extends Component {
//   constructor(props){
//     super(props)
//     this.state={
//       // is_chef_dpt: true,
//       liste_cours: [],
//       cours_getted: false
//     }
//   }


//   // getCoursVirtuels1 = (dept, classe) => {
//   //   axios.get(API_URL + "cours_virtuel/liste/departement/" + dept + "/classe/" + classe)
//   //         .then(res => this.setState({
//   //           liste_cours: res.data,
//   //           cours_getted: true
//   //         }))
//   // }

//   getCoursVirtuels2 = (dept) => {
//     axios.get(API_URL + "cours_virtuel/liste/departement/" + dept )
//           .then(res => this.setState({
//             liste_cours: res.data,
//             cours_getted: true
//           }))
//   }
  
//   componentDidMount(){
//     this.getCoursVirtuels2("GIT");
//     // console.log(this.props.user);
//   }


//     render(){
//     return (
//     <>
     
// <div class="section">
//     <div class="container">
//     	<div class="row">
//             <div class="col-md-12">
//     	    </div>
//     	</div>
//     	<div class="row">
//       {this.state.cours_getted ? 
//       (<>
//       {this.state.liste_cours.map(cours => {
//           return (
//             <div class="col-md-4">
//               <div class="card profile-card-2">
//                       <div class="card-img-block">
//                           <img class="img-fluid" src="https://images.pexels.com/photos/877695/pexels-photo-877695.jpeg?auto=compress&cs=tinysrgb&h=350" alt="Card image cap" />
//                       </div>
//                       <div class="card-body pt-5">
//                           <img src="https://randomuser.me/api/portraits/women/81.jpg" alt="profile-image" class="profile"/>
//                           <h5 class="card-title">{cours.ec.nom}</h5>
//                           <p class="card-text">{cours.description}</p>
//                           <div class="icon-block"><a href="#"><i class="fa fa-facebook"></i></a><a href="#"> <i class="fa fa-twitter"></i></a><a href="#"> <i class="fa fa-google-plus"></i></a></div>
//                       </div>
//                   </div>
//             </div>
//           )
//       })}
        
//         </>
//         ):(
//           <h1>
//             Pas de cours disponible
//           </h1>
//         )}
    		
    	    
//     	</div>
//     </div>
// </div>

//     </>
//     )
//     }
// }

// //  const mapStateToProps = (state) => {
// //     user: state.auth
// // }

// export default MesCours ;