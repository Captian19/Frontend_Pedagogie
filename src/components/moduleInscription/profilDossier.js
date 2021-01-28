import React, { Component } from "react";
import { Link } from 'react-router-dom';
import avatar from '../../assets/img/avatar.png'

class ProfilDossier extends Component {
    state = { 

    };



    render() { 
        return ( 

            
     
            <div className="col-lg-3 ml-5 card">
                <div class="testimonial text-center">

                    <div class="avatar mx-auto mt-3">
                        <img src={avatar} class="rounded-circle img-fluid mt-3" width="100px"/>
                    </div>

                    <h4 class="font-weight-bold mt-4 text-center">{this.props.etudiant.sexe}</h4>
                    <h6 class="blue-text font-weight-bold my-3 text-center">DIC1 GIT</h6>
                    <Link to='/scolarite/UnderList' type="submit" class="btn btn-primary justify-content-center">Voir Dossier</Link>

                </div>

            </div>             

      

         );
    }
}
 
export default ProfilDossier;