import React from 'react';
import logoEPT from '../../assets/moduleInscription/img/0.png'

const Entete = () => {

    return (
       

            <div>
                <div className="row ">
                            
                    <div className="col-lg-1 text-center">
                        <img  src={logoEPT} alt="ept"  width="80" height="110"></img>
                    </div>
            
                    <div className="col-lg-10 text-center">
                        <small>République du SENEGAL</small><br></br>
                        <i className="font-italic">Ministère de l'Enseignement Supérieur de la Recherche et de L'Innovation</i>
                        <h5 className="font-weight-bold">ECOLE POLYTECHNIQUE DE THIES</h5>
                        <h5 className="font-weight-bold">BP. A10 - Thiès, Tel : 221 76 223 61 77 / 76 223 61 60 </h5>
                         <p>Site WEB: www.ept.sn &nbsp;&nbsp;&nbsp;&nbsp; Email: dir.etudes@ept.sn / scolarite@ept.sn</p>
                    </div>
            
                    <div className="col-lg-1 text-center">
                        <img src={ logoEPT } height="110" width="80px"></img>
                    </div>               
                    <hr className="hr1"></hr>                
                </div>
            </div>     
        
    );
};

export default Entete;