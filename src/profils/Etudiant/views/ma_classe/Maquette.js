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
        is_chef_dpt: false,
        somme: 0
    };

    getMaquetteDept(dept, classe) {
        axios.get(API_URL_UE + "/departement/" + dept + "/classe/" + classe).then(res => this.setState({maquette: res.data, is_getted: true}))
    };

    handleDelete(id){
        axios.delete(API_URL_EC + "/" + id)
    }

    componentDidMount() {
        // this.props.user.departement
        this.getMaquetteDept(this.props.role.departement, this.props.role.classe);
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
                <table className="col-md-10 offset-md-1" border={2}>
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
                                    <td className="text-center" colSpan={2} rowSpan={ue.element.length}>{ue.semestre}</td>
                                    <td className="text-center" colSpan={4} rowSpan={ue.element.length}>{ue.nom}</td>
                                    <td className="text-center" colSpan={3} rowSpan={ue.element.length}>{ue.codeUE}</td>
                                        <td className="text-center" colSpan={16}>{ue.element[0].nom}</td>
                                        <td className="text-center" colSpan={4}>{ue.element[0].codeEC}</td>
                                        <td className="text-center">{ue.element[0].CM}</td>
                                        <td className="text-center">{ue.element[0].TD_TP}</td>
                                        <td className="text-center">{ue.element[0].total_heures}</td>
                                        <td className="text-center">{ue.element[0].TPE}</td>
                                        <td className="text-center">{ue.element[0].creditEC}</td>
                                        <td className="text-center">{ue.element[0].coef}</td>
                                        {this.state.is_chef_dpt ? (
                                        <td className="text-center"><CButton className="btn-danger float-right"
                                                                                              value={ue.element[0].pk}
                                                                                              onClick={() => this.handleDelete(ue.element[0].pk)}>delete</CButton></td>
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
                                            <td className="text-center" colSpan={16}>{ec.nom}</td>
                                            <td className="text-center" colSpan={4}>{ec.codeEC}</td>
                                            <td className="text-center">{ec.CM}</td>
                                            <td className="text-center">{ec.TD_TP}</td>
                                            <td className="text-center">{ec.total_heures}</td>
                                            <td className="text-center">{ec.TPE}</td>
                                            <td className="text-center">{ec.creditEC}</td>
                                            <td className="text-center">{ec.coef}</td>
                                            {this.state.is_chef_dpt ? (
                                        <td className="text-center"><CButton type="submit" size="sm" color="primary">edit</CButton><CButton className="btn-danger float-right" value={ue.element[0].pk}>delete</CButton></td>
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

export default connect(mapStateToProps,null)(Maquette)