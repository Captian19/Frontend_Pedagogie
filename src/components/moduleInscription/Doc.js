import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import repo from '../../assets/moduleInscription/img/dossier.png'

class Doc extends Component {
  


    render() { 
        return ( 

            <div className="col-lg-2 mt-3 text-center ">
                <Link to='/comptable/dossier-etudiant-fichiers'>
                    <img width="100px" src={repo}></img>
                    <div >Mame Diarra Sow</div>
                </Link>
            </div>

         );
    }
}
 
export default Doc;