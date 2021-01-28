import React, {Component} from "react";
import {Vue_Liste_Emargement} from "../../../../components/moduleConcours/candidat/vue_liste_emargement";
import {
    get_CandidatSessions,
    get_CandidatSessionBySession,
    get_CandidatSessionBySessionAndCentres,
    get_CandidatSessionBySessionAndLycees,
    get_CandidatSessionBySessionAndCentresAndLycees
} from "../../../../actions/moduleConcours/action_CandidatSession";
import {
    get_Lycees
} from "../../../../actions/moduleConcours/action_Lycee";
import {
    get_Centres
} from "../../../../actions/moduleConcours/action_Centre";
import {connect} from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';
import { CCard } from "@coreui/react";

function CircularUnderLoad() {
    return <CircularProgress disableShrink />;
}



class Liste_emargement extends Component{
    constructor(props) {
        super(props);
        this.state = {
            defaultListeCandidats: [],
            specialListCandidats: [],
            candidat_is_getted: false,
            specialIsGetted: false,
            liste_lycee: [],
            lycee_is_getted: false,
            liste_centre: [],
            centre_is_getted: false
        }
    }

    getAllCentres(){
        try{
            this.props.get_Centres().then(res => this.setState({liste_centre: res.data.results, centre_is_getted: true}))
                .catch(e => {
                    console.log("error centres");
                })
            this.props.get_CandidatSessionBySession(new Date().getFullYear())
                .then(res => this.setState({defaultListeCandidats: res.data.results, candidat_is_getted: true}))
        }catch(e){
            console.log(e)
        }
    }
    getAllLycees(){
        try{
            this.props.get_Lycees().then(res => this.setState({liste_lycee: res.data.results, lycee_is_getted: true}))
                .catch(e => {
                    console.log("error lycees");
                })

        }catch(e){
            console.log(e);
        }
    }
    componentDidMount() {
        this.getAllCentres();
        this.getAllLycees();
    }

    render() {
        return(
            

            <>

            {this.state.candidat_is_getted && this.state.lycee_is_getted && this.state.centre_is_getted ? (
            <Vue_Liste_Emargement  liste_lycee={this.state.liste_lycee}
                                   liste_centre={this.state.liste_centre}
                                   defaultListeCandidats={this.state.defaultListeCandidats}
                                   get_Centres={this.props.get_Centres}
                                   get_Lycees={this.props.get_Lycees}
                                   get_CandidatSessionBySession={this.props.get_CandidatSessionBySession}
                                   get_CandidatSessionBySessionAndLycees={this.props.get_CandidatSessionBySessionAndLycees}
                                   get_CandidatSessionBySessionAndCentres={this.props.get_CandidatSessionBySessionAndCentres}
                                   get_CandidatSessionBySessionAndCentresAndLycees={this.props.get_CandidatSessionBySessionAndCentresAndLycees}
                                    />
                ): (
                    
                    <CircularUnderLoad/>
                    
                )}

            </>
            
        )
    }
}


const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps,
    {
        get_CandidatSessions,
        get_Centres,
        get_Lycees,
        get_CandidatSessionBySessionAndLycees,
        get_CandidatSessionBySession,
        get_CandidatSessionBySessionAndCentres,
        get_CandidatSessionBySessionAndCentresAndLycees})(Liste_emargement);