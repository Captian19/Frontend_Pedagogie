import React, {Component} from 'react';
import html2PDF from 'jspdf-html2canvas';
import logoEPT from '../../../src/assets/moduleInscription/img/0.png'
import cachet from '../../../src/assets/moduleInscription/img/2.png'
import { Link } from 'react-router-dom';
import moment from 'moment';
import localization from 'moment/locale/fr';

moment.updateLocale('fr', localization);
    


class RecuScolarite extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    print = () =>{
        let page = document.getElementById('page');
    html2PDF(page, {
        jsPDF: {
        format: 'a8',
        },
        imageType: 'image/jpeg',
        output: './pdf/generate.pdf'
    });
    }

    

  

    render() { 
        return ( 
            <div>
              

                <div id="page" className="container mt-5 d-flex justify-content-center ">
         
                    <div className="col-lg-10 card card-body shadow ">
                                    
                        <div className="row text-center">
                            <div className="col-lg-2">
                                <img src={ logoEPT} width="80" height="110"></img>
                            </div>
                
                            <div className="col-lg-8 text-center">
                                <small>République du SENEGAL</small><br></br>
                                <i>Ministère de l'Enseignement Supérieur de la Recherche et de L'Innovation</i>
                                <h5><b className="font-weight-bold">ECOLE POLYTECHNIQUE DE THIES</b></h5>
                                <h5><b className="font-weight-bold">AGENCE COMPTABLE</b></h5>
                                <hr></hr>
                            </div>
                
                            <div className="col-lg-2">
                                <img src={ logoEPT} width="80" height="110"></img>
                            </div>
                                        
                            <hr className="hr1"></hr>
                        </div>

                        <div className="row ">
                            <div className=" col-lg-12 text-center">
                                <b>Droit d'inscription année académique 2020 / 2020</b><br></br>
                                <b>Reçu 00499 &nbsp;&nbsp;&nbsp; B.P.F 25.000 F</b>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className=" col-lg-12">
                                <div className="row">
                                    <div className="ml-5">
                                        M &nbsp;&nbsp;<b>Fallou DIAKHATE</b> 
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="ml-5">
                                        Né(e) le &nbsp;&nbsp; <b>....................... </b>
                                    </div>
                                    <div className="col-lg-4">
                                        A <b>...................</b>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="ml-5">
                                        La somme de &nbsp;&nbsp;<b>Vingt cinq mille FCFA</b> 
                                    </div>
                                </div>
                                
                            
                            <div className="row">
                                <div className="col-lg-7 d-flex ml-3">
                                    &nbsp;&nbsp;&nbsp;  Département <b> &nbsp;&nbsp; GIT</b> <br></br>
                                    {/* <small className="d-flex">A conserver et à présenter en cas de réclamation</small> */}
                                </div>
                                <div className="col-lg-4">
                                    Filiére &nbsp;&nbsp; <b>DIC</b><br></br>
                                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Thiès, le<b> ...............</b><br></br>
                                    <b style={{textDecoration: "underline}"}}>LE CAISSIER</b><br></br>
                                    {/* <img src= { cachet}  style={{marginTop: "-60px"}} height="150" width="150px"></img> */}


                                </div>

                            </div>
                            </div>
                        </div>
                                    
                    </div>
                </div>
                
                <div className="row d-flex justify-content-center text-center">
                    <button type="submit" className="btn btn-primary  col-lg-4   " onClick={this.print} id="btn">Imprimer le Reçu</button>
                    <div className="col-lg-1 mt-3"></div>
                    <div>
                        <button className="btn btn-primary" onClick={this.props.OnClick}>Etape suivante</button>
                    </div>
                </div>

            </div>
                 
         );
    }
}
 
export default RecuScolarite;