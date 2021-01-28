import React, { Component } from "react";
import { Link } from 'react-router-dom';
import avatar from '../../assets/img/avatar.png'

class ProfilCom extends Component {
   
    link = ()=>{
        if(this.props.liste){
            return(
                <Link to={`/communication/dossier-etudiant-fichiers/${this.props.etudiant.email}`}
                className="btn btn-primary">Dossier
                </Link>
            )
        }
        else{
            return(
                <Link to={`/communication/carte-etudiant/${this.props.etudiant.id}`}
                className="btn btn-primary">Générer la carte
                </Link>
            )
        }
   
    }

    render() { 
        return ( 

            
     
            <div className="col-lg-3 ml-5 card">
                <div class="testimonial text-center">

                    <div class="avatar mx-auto mt-3">
                        <img src={avatar} class="rounded-circle img-fluid mt-3" width="100px"/>
                    </div>
                    <h4 class="font-weight-bold  mt-4 text-center">{this.props.etudiant.prenom} {this.props.etudiant.nom.toUpperCase()}</h4>
                    <h4 class="font-weight-bold my-3 text-center">{this.props.etudiant.classe} {this.props.etudiant.departement}</h4>
                    <h4 class="font-weight-bold my-3 text-center">{this.props.etudiant.email}</h4>
                    {this.link()}
                </div>

            </div>             

      

         );
    }
}
 
export default ProfilCom;


