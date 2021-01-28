import React, {Component} from "react";
import {connect} from "react-redux" 


import {
    CButton,
    CLink
  } from '@coreui/react'

import ElementMaquetteVueDensemble from "./detailmaquette/EnteteMaquetteVueDensemble";
import axios from 'axios';
import {API_URL_EC, API_URL_UE} from "../../../../constants/pedagogie/index";
//import classes from "*.module.css";
//import NewECForm from "./newECForm";

// import UE from './ec';


class MaquetteVueDensemble extends Component {
    state = {
        modal: false,
        maquette: [],
        is_getted: false,
        is_chef_dpt: false,
        somme: 0
    };

    getMaquetteDept(dept) {
        axios.get(API_URL_UE + "/departement/" + dept ).then(res => this.setState({maquette: res.data, is_getted: true}))
    };

    handleDelete(id){
        axios.delete(API_URL_EC + "/" + id)
    }

    componentDidMount() {
        // this.props.user.departement
        this.getMaquetteDept(this.props.role.departement);
        if(this.state.is_getted){
            
            this.state.maquette.map(ue => {
                let somme=this.state.somme;
                somme += ue.element.length;
                this.setState({somme: somme});
            })
        }
    }

    

    render() {
        return (

            <>
                <table className="col-md-10 offset-md-1 table-hover" border={2}>
                    <ElementMaquetteVueDensemble/>
                    <tbody>
                    {this.state.is_getted ? (
                        this.state.maquette.map(ue => {

                            let is_vide = false;
                            if(ue.element.length < 1)
                            is_vide = true

                            let is_rempli =false;
                            if(ue.element.length >=2)
                            is_rempli = true;
                            return(

                            <>
                               
                                    {is_vide ? (
                                        <>
                                       
                                        </>
                                    ): (<>
                                        <tr>
                                    <td className="text-center" colSpan={4} rowSpan={ue.element.length}>{ue.nom}</td>
                                    <td className="text-center" colSpan={3} rowSpan={ue.element.length}>{ue.codeUE}</td>
                                        <td className="text-center" colSpan={16}>{ue.element[0].nom}</td>
                                        <td className="text-center" colSpan={4}>{ue.element[0].codeEC}</td>
                                        <td className="text-center">{ue.classe}</td>
                                        
                                        
                                        </tr>
                                        </>
                                    )}
                                    
                                    
                                {is_rempli ? 
                                    ue.element.slice(1).map(ec => (
                                    <>

                                        <tr>
                                            <td className="text-center" colSpan={16}>{ec.nom}</td>
                                            <td className="text-center" colSpan={4}>{ec.codeEC}</td>
                                            <td className="text-center">{ec.ue.classe}</td>

                                        </tr>
{/* 
                                    <nav>
                                        <span>CM : Cours Magistral</span>
                                        <span>TD : Travaux Dirigés</span>
                                        <span>TP : Travaux Pratiques</span>
                                        <span>TPE : Travail Personnel de l'Etudiant</span>
                                        <span>ECTS : European CreditTransfer System</span>
                                        <span>U.E. : Unité d'enseignement</span>
                                        <span>E.C. : Elément constitutif</span>
                                    </nav> */}

                                    </>
                                ))
                                :(
                                    ""
                                )}
                                
                            </>
                        )})

                    ) : (
                        "Maquette non Disponible"
                    )}
                    </tbody>
                </table>

                <hr/>
                <footer mt="3">
                    <b><p>CM : Cours Magistral</p></b>
                    <b><p>TD : Travaux Dirigés</p></b>
                    <b><p>TP : Travaux Pratiques</p></b>
                    <b><p>TPE : Travail Personnel de l'Etudiant</p></b>
                    <b><p>ECTS : European CreditTransfer System</p></b>
                    <b><p>U.E. : Unité d'enseignement</p></b>
                    <b><p>E.C. : Elément constitutif</p></b>
                </footer>
            </>

        )
    }
}

const mapStateToProps = state => ({
    user:state.auth.user,
    role: state.auth.user.CurrentRoles[0],
    token:state.auth.token
})

export default connect(mapStateToProps,null)(MaquetteVueDensemble)