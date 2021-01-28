import React, { Component } from "react";
import carteTC from '../../assets/moduleInscription/img/carteTC.png'
import carteDIC from '../../assets/moduleInscription/img/carteDIC.png'
import { Preview, print } from 'react-html2pdf';

class Carte extends Component {

    constructor(props){
        super(props)
        this.state = {
            impression : "200px"
        }
    }

    natureCarte = () =>{
        let image = null
        if(this.props.etudiant.departement=="TC"){
            image = carteTC
            return image
        }
        else{
            image = carteDIC
            return image
        }

    }

    departement = () =>{
        if(this.props.etudiant.departement=="TC"){
            return "Dept"
        }
        else{
            return "Filière"
        }

    }

    impression = () =>{
        // this.setState({
        //     impression : "0px"
        // })

        print('a', 'jsx-template')

    }
  
    render() { 
        return ( 
                <div>

                   <Preview id="jsx-template">
                   <div className="row justify-content-center align-justify  mt-5" style={{backgroundImage : `url(${this.natureCarte()})` ,height:"750px", backgroundRepeat : "no-repeat", backgroundPosition : "center", position:"relative", marginTop : "5px"}}> 
                        <div className="col-sm-5 align-self-center" style={{marginLeft: `${this.state.impression}`, marginTop : "200px"}} >
                                    <div className="row">
                                        <h5 className="col-sm-6" style={{color:"black"}}>Code Etudiant : <span style={{fontWeight:"bolder", color:"black"}}>{this.props.etudiant.numeroCarteEtudiant}</span> </h5>
                                        <h5 className="col-sm-4" style={{color:"black"}}>Quitance : <span style={{fontWeight:"bolder", color:"black"}}>{this.props.quitance}</span> </h5>
                                    </div>
                                    <div className="row mt-3">
                                        <h5 className="col-sm-12" style={{color:"black"}} >Nom : <span style={{fontWeight:"bolder", color:"black"}}>{this.props.etudiant.nom}</span> </h5>
                                    </div>
                                    <div className="row mt-3">
                                        <h5 className="col-sm-12" style={{color:"black"}} >Prénoms : <span style={{fontWeight:"bolder", color:"black"}}>{this.props.etudiant.prenom}</span> </h5>
                                    </div>
                                    <div className="row mt-3">
                                        <h5 className="col-sm-5" style={{color:"black"}}>Né(e) le : <span style={{fontWeight:"bolder", color:"black"}}>{this.props.etudiant.dateNaissance}</span> </h5>
                                        <h5 className="col-sm-7" style={{color:"black"}}>à : <span style={{fontWeight:"bolder", color:"black"}}>{this.props.etudiant.lieuNaissance}</span> </h5>
                                    </div>
                                    <div className="row mt-3">
                                        <h5 className="col-sm-12" style={{color:"black"}} >Nationalité : <span style={{fontWeight:"bolder", color:"black"}}>{this.props.etudiant.nationalite}</span> </h5>
                                    </div>
                                    <div className="row mt-3">
                                        <h5 className="col-sm-12" style={{color:"black"}}>Classe : <span style={{fontWeight:"bolder", color:"black"}}>{this.props.etudiant.classe}</span> </h5>
                                    </div>
                                    <div className="row mt-3">
                                        <h5 className="col-sm-12" style={{color:"black"}} >{this.departement()} : <span style={{fontWeight:"bolder", color:"black"}}>{this.props.etudiant.departement}</span> </h5>
                                    </div>
                                
                            </div>
                    </div>
                   </Preview>
                  
                    {/* <button onClick={()=> this.impression()}> print</button> */}
                    
                </div>

         );
    }
}
 
export default Carte;