import React, { Component } from "react";

import Vue_Liste_Rapport from "../../../../components/moduleConcours/rapports/vue_liste_rapport";
import Ajout_Rapport from "../../../../components/moduleConcours/rapports/ajout_rapport";

import {
    CCard,
    CCardBody,
    CCol,
    CRow,
} from '@coreui/react';


import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {get_Rapport, add_Rapport, get_Rapports} from "../../../../actions/moduleConcours/action_rapport";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));
  
const Header = function() {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <AppBar position="static">
            <center><h2>Rapports Session {window.location.href.split('/')[window.location.href.split('/').length - 1]}</h2></center>
        </AppBar>
      </div>
    );
}



class View_Liste_Rapport extends Component {
    constructor(props){
        super(props);
        this.state = {
            newRapport: {
                titre_rapport: "",
                type_rapport: "",
                date_rapport: "",
                rapport_file: null
            },
            listRapport: [],
            listRapportIsHere: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e){
        let {name, value} = e.target;
        let doc = {...this.state.newRapport, [name]: value}
        this.setState({
            newRapport: doc
        })
        console.log(doc)
    }

    handleFileChange(file){
        let doc = {...this.state.newRapport, rapport_file: file[0]}
        this.setState({
            newRapport: doc
        })
        console.log(doc);
    }

    handleSubmit(e){
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('rapport_file', this.state.newRapport.rapport_file, this.state.newRapport.rapport_file.name);
        form_data.append('titre_rapport', this.state.newRapport.titre_rapport)
        form_data.append('date_rapport', this.state.newRapport.date_rapport)
        form_data.append('type_rapport', this.state.newRapport.type_rapport)

        this.props.add_Rapport(form_data).then(()=>{
            alert("rapport_file ajouté avec success");
            this.getListRapport(window.location.href.split('/')[window.location.href.split('/').length - 1]);
        })
    }

    getListRapport(annee){
        this.props.get_Rapport(annee).then( res => {
            this.setState({ listRapport: res.data, listRapportIsHere: true})
        })
    }

    componentDidMount(){
        this.getListRapport(window.location.href.split('/')[window.location.href.split('/').length - 1]);
    }

    render(){
        return(
            <>
                <CCard>
                <Header />
                    <CCardBody>
                        <CRow> 
                            <CCol>
                                <Ajout_Rapport newRapport={this.state.newRapport}
                                               handleSubmit={this.handleSubmit}
                                               handleChange={this.handleChange}
                                               handleFileChange={this.handleFileChange}/>
                            </CCol>
                        </CRow>
                    </CCardBody>
                    <Vue_Liste_Rapport listRapport={this.state.listRapport}
                                       listRapportIsHere={this.state.listRapportIsHere}/>
                </CCard>
            </>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth
});

export default compose(
    withRouter,
    connect(mapStateToProps, {get_Rapport, add_Rapport, get_Rapports})
)(View_Liste_Rapport);