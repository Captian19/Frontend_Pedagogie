import React, { Component } from "react";
import axios from 'axios';

class CertificatScolarite extends Component {
  


    render() { 
        return ( 

                <div>
                    <div className="col-lg-12 border mt-3  text-center">
                            <h1>CERTIFICAT D'APTITUDE</h1>
                    </div>

                    <div className="row mt-5 container">
                        <p style={{fontSize:'15px'}}>Je Soussigné <b> Mr .................................................................. Médecin  au Centre Médical, certifie que :</b></p>
                        <p style={{fontSize:'15px'}}>Mr, Mlle, Mme <b>...........................................................................</b></p><br></br>
                    </div>
                    <div className="row mt-3 container">
                        <p style={{fontSize:'15px'}}> Etudiant(e) en : <b>..........................................</b>Département : <b>--------------------------------</b></p>
                    </div>

                    <div className="row mt-3 container">
                        <p style={{fontSize:'15px'}}> Est  
                            <b>
                                .........................................
                            </b>
                            à suivre les enseignements dispensés à l’Ecole Polytechnique de Thiès.
                        </p>
                    </div>

                    <div className="row mt-3 container">
                        <p style={{fontSize:'15px'}}> Fait à Thiès le,   : <b>..........................................</b></p>
                    </div>

                    <div className="col-lg-12 text-right mt-5 container">
                        <p style={{fontSize:'15px'}}> <b> Signature et Cachet du Médecin</b></p>
                    </div>
                </div>

         );
    }
}
 
export default CertificatScolarite;