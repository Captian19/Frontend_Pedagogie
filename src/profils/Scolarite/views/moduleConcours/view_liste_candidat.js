import React, { Component, useState,} from 'react';

import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

import {
    CCard,
    CCardBody,
    CCol,
    CRow,
  } from '@coreui/react';
import {connect} from "react-redux";
import {edit_CandidatSession, delete_CandidatSession, get_CandidatSessionBySession, get_CandidatSession} from "../../../../actions/moduleConcours/action_CandidatSession";


import Header from '../../../../components/moduleConcours/candidat/vue_candidat';
import Liste_Candidat from '../../../../components/moduleConcours/candidat/liste_candidat';

class View_Liste_Candidat extends Component {

    constructor(props){
        super(props);
        this.state = {
            candidatSessions: [],
            candidat_is_getted: false
        }
    }

    getAllCandidats(year){
        try{
            this.props.get_CandidatSessionBySession(year).then(res => {
                console.log(res.data.results);
                this.setState({candidatSessions: res.data.results, candidat_is_getted: true})
            })
                .catch(e => {
                    console.log(e);
                })
        }catch(e){
            console.log(e)
        }
    }

    componentDidMount(){
        this.getAllCandidats(new Date().getFullYear());
    }

    render() {
        {this.state.candidat_is_getted ? console.log(this.state.candidatSessions): console.log("nada")}
        return(
                <>

                <CCard>
                    <Header />
                    <CCardBody>
                        <CRow> 
                            <CCol>
                                <div>
                                    <Link to="/scolarite/concours/ajout_candidat"> 
                                        <Button variant="contained" color="default"> 
                                        <i className="fas fa-plus-circle"/>Ajouter Candidat
                                        </Button>
                                    </Link>
                                </div><br/><br/>
                            </CCol>
                        </CRow>
                    </CCardBody>
                    <Liste_Candidat candidatSessions={this.state.candidatSessions}
                                    delete_CandidatSession={this.props.delete_CandidatSession}
                                    edit_CandidatSession={this.props.edit_CandidatSession}
                                    get_CandidatSession={this.props.get_CandidatSession}
                                    get_CandidatSessionBySession={this.props.get_CandidatSessionBySession}
                    />
                </CCard>
            </>
        )
    }

}
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps, {edit_CandidatSession, delete_CandidatSession, get_CandidatSessionBySession, get_CandidatSession})(View_Liste_Candidat);