import React, { useState } from 'react';
import Vue_Liste_Globale from "../../../../components/moduleConcours/candidat/vue_liste_globale_resulat";
import { get_CandidatSessionBySession } from "../../../../actions/moduleConcours/action_CandidatSession";
import {connect} from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';

function CircularUnderLoad() {
    return <CircularProgress disableShrink />;
}


class View_Liste_Globale extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            liste_candidats: [],
            listIsHere: false,
            liste_principale: [],
            liste_attente: []
        }
    }

    getAllCandidats(year){
        this.props.get_CandidatSessionBySession(year)
            .then(res => {
                this.setState({
                    liste_candidats: res.data.results,
                    listIsHere: true
                })
            })
            .then(() => {
                let liste = this.state.liste_candidats
                let liste_p = liste.splice(0, 10)
                liste_p.map(item => {
                    item.Num = liste_p.indexOf(item) + 1
                })
                let liste_a = liste.splice(0, 20)
                liste_a.map(item => {
                    item.Num = liste_a.indexOf(item) + 1
                })
                this.setState({
                    liste_principale: liste_p,
                    liste_attente: liste_a
                })
            })
            .catch(e => {
                console.log(e);
            })
    }

    componentDidMount(){
        this.getAllCandidats(new Date().getFullYear())
    }

    render(){
        return (
            <>
                {this.state.listIsHere ? (
                    <Vue_Liste_Globale liste_principale={this.state.liste_principale}
                                       liste_attente={this.state.liste_attente}
                    />
                ):(
                    <CircularUnderLoad/>
                )}
            </>
        )}
}
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps, {get_CandidatSessionBySession})(View_Liste_Globale);
