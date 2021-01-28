// Ce composant renvoie la maquette globale (des cours) du département de l'utilisateur en cours.

import React, {Component} from "react";
import {connect} from "react-redux" 


import {
    CButton,
    CLink
  } from '@coreui/react'

import ElementMaquette from "./detailmaquette/EnteteMaquette";
import axios from 'axios';
import {API_URL_EC, API_URL_UE} from "../../../../constants/pedagogie/index";



class Maquette extends Component {
    state = {
        modal: false,
        maquette: [],
        is_getted: false,
        is_chef_dpt: true
    };
// Obtenir les UE par département
    getMaquetteDept(dept) {
        axios.get(API_URL_UE + "/departement/" + dept).then(res => this.setState({maquette: res.data, is_getted: true}))
    };
// Suppression d'un EC de la maquette
    handleDelete(id){
        axios.delete(API_URL_EC + "/DEL/" + id)
        .then((data) =>{
            if(data){
                this.componentDidMount();
            }
        })
    }

    componentDidMount() {
        if(this.props.role.departement === undefined){
        this.getMaquetteDept(this.props.roles.departement);}
        else{
            this.getMaquetteDept(this.props.role.departement)
        }
    }

    

    render() {
        return (

            <>
                <table className="mr-auto ml-auto" border={2}>
                    <ElementMaquette/>
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
                                    <td className="text-center" colSpan={2} rowSpan={ue.element.length}><b>{ue.classe}</b></td>
                                    <td className="text-center" colSpan={2} rowSpan={ue.element.length}><b>{ue.semestre}</b></td>
                                    <td className="text-center" colSpan={4} rowSpan={ue.element.length}><b>{ue.nom}</b></td>
                                    <td className="text-center" colSpan={3} rowSpan={ue.element.length}><b>{ue.codeUE}</b></td>
                                        <td className="text-center" colSpan={16}><b>{ue.element[0].nom}</b></td>
                                        <td className="text-center" colSpan={4}><b>{ue.element[0].codeEC}</b></td>
                                        <td className="text-center"><b>{ue.element[0].CM}</b></td>
                                        <td className="text-center"><b>{ue.element[0].TD_TP}</b></td>
                                        <td className="text-center"><b>{ue.element[0].total_heures}</b></td>
                                        <td className="text-center"><b>{ue.element[0].TPE}</b></td>
                                        <td className="text-center"><b>{ue.element[0].creditEC}</b></td>
                                        <td className="text-center"><b>{ue.element[0].coef}</b></td>
                                        {this.state.is_chef_dpt ? (
                                        <td className="text-center"><CButton className="btn-danger float-right"
                                                                                              value={ue.element[0].id}
                                                                                              onClick={() => this.handleDelete(ue.element[0].id)}>del</CButton></td>
                                    ) : (
                                        <td className="text-center">none</td>
                                    )} <td className="text-center" rowSpan={ue.element.length}>{ue.coefUE}</td>
                                        </tr>
                                        </>
                                    )}
                                    
                                    
                                {is_rempli ? 
                                    ue.element.slice(1).map(ec => (
                                    <>

                                        <tr>
                                            <td className="text-center" colSpan={16}><b>{ec.nom}</b></td>
                                            <td className="text-center" colSpan={4}><b>{ec.codeEC}</b></td>
                                            <td className="text-center"><b>{ec.CM}</b></td>
                                            <td className="text-center"><b>{ec.TD_TP}</b></td>
                                            <td className="text-center"><b>{ec.total_heures}</b></td>
                                            <td className="text-center"><b>{ec.TPE}</b></td>
                                            <td className="text-center"><b>{ec.creditEC}</b></td>
                                            <td className="text-center"><b>{ec.coef}</b></td>
                                            {this.state.is_chef_dpt ? (
                                        <td className="text-center"><CButton className="btn-danger float-right" value={ue.element[1].id} onClick={() => this.handleDelete(ue.element[0].id)}>del</CButton></td>
                                    ) : (
                                        <td className="text-center">none</td>
                                    )}

                                        </tr>



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

                <>
                <CLink to = '/chef-departement/AddEC' >
                <button type="button" className="btn btn-primary">Ajouter EC</button>
                </CLink>
                <CLink to = '/chef-departement/AddUE' >
                <button type="button" className="btn btn-primary">Ajouter UE</button>
                </CLink>
                </>

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
    role:state.auth.user.CurrentRoles[0],
    roles:state.auth.user.CurrentRoles[1],
    token:state.auth.token
})

export default connect(mapStateToProps,null)(Maquette)