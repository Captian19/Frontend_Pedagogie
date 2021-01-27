// L'ensemble des cours correspondant au profil du user.
        
import React, {Component} from 'react'
import {
  CLink
} from  '@coreui/react'
import "../../../../../assets/css/cours.css"
import {connect} from "react-redux" 
import { API_URL } from  "../../../../../constants/pedagogie/index";
import axios from "axios";

class MesCours extends Component {
  constructor(props){
    super(props)
    this.state={
      liste_cours: [],
      cours_getted: false
    }
  }

// Recupérations des cours d'un professeur donné grâce à son identifiant. 
  getCoursVirtuels1 = (id_prof) => {
    axios.get(API_URL + "cours_virtuel/professeur/" + id_prof)
          .then(res => this.setState({
            liste_cours: res.data,
            cours_getted: true
          }))
  }

  getCoursVirtuels2 = (dept) => {
    axios.get(API_URL + "cours_virtuel/liste/departement/" + dept )
          .then(res => this.setState({
            liste_cours: res.data,
            cours_getted: true
          }))
  }
  
  componentDidMount(){
    this.getCoursVirtuels1( this.props.user.id);
  }


    render(){
    return (
    <>
     
<div class="section">
    <div class="container">
    	<div class="row">
            <div class="col-md-12">
    	    </div>
    	</div>
    	<div class="row">
      {this.state.cours_getted ? 
      (<>
      {this.state.liste_cours.map(cours => {
          return (
            <div class="col-md-4">
              <div class="card profile-card-2">
                      <div class="card-img-block">
                          <img class="img-fluid" src="https://images.pexels.com/photos/877695/pexels-photo-877695.jpeg?auto=compress&cs=tinysrgb&h=350" alt="Card image cap" />
                      </div>
                      <div class="card-body pt-5">
                          <img src="http://chaire-eti.org/wp-content/uploads/2018/01/avatar-homme.png" alt="profile-image" class="profile"/>
                          <h5 class="card-title"><CLink to={ "/enseignant/ClasseVirtuelle/detailCours/" + cours.id}>{cours.ec.nom}</CLink></h5>
                          <p class="card-text">{cours.description}</p>
                          <div ><CLink to={ "/enseignant/ClasseVirtuelle/detailCours/" + cours.id} > <i className="far fa-folder float-right"></i></CLink></div>
                      </div>
                  </div>
            </div>
          )
      })}
        
        </>
        ):(
          <h1>
            Pas de cours disponible
          </h1>
        )}
    		
    	    
    	</div>
    </div>
</div>

    </>
    )
    }
}


const mapStateToProps = state => ({
  user:state.auth.user,
  role: state.auth.user.CurrentRoles[0],
  token:state.auth.token
})

export default connect(mapStateToProps,null)(MesCours) ;