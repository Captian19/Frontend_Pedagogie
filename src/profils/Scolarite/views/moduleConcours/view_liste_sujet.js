import React, { Component } from "react";

import Vue_Liste_Sujet from "../../../../components/moduleConcours/sujets/vue_liste_sujet";
import Ajout_Sujet from "../../../../components/moduleConcours/sujets/ajout_sujet";

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
import {add_Sujet, get_Sujets, get_Sujet, get_SujetofYear} from "../../../../actions/moduleConcours/action_sujetsConcours";

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
            <center><h2>Sujets Session {window.location.href.split('/')[window.location.href.split('/').length - 1]}</h2></center>
        </AppBar>
      </div>
    );
}


class View_Liste_Sujet extends Component {
    constructor(props){
        super(props);
        this.state = {
            newSubject: {
                titre: "",
                annee: window.location.href.split('/')[window.location.href.split('/').length - 1],
                sujet: null
            },
            newSubjectIsPublished: false,
            listSubject: [],
            listSubjectIsHere: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(e){
        let {name, value} = e.target;
        let doc = {...this.state.newSubject, [name]: value}
        this.setState({
            newSubject: doc
        })
        console.log(doc)
    }

    handleFileChange(file){
        let doc = {...this.state.newSubject, sujet: file[0]}
        this.setState({
            newSubject: doc
        })
        console.log(doc);
    }
    
    handleSubmit(e){
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('sujet', this.state.newSubject.sujet, this.state.newSubject.sujet.name);
        form_data.append('titre', this.state.newSubject.titre)
        form_data.append('annee', this.state.newSubject.annee)

        this.props.add_Sujet(form_data).then(()=>{
            alert("sujet ajouté avec success");
            this.getListSubject(window.location.href.split('/')[window.location.href.split('/').length - 1]);
        })
    }

    getListSubject(annee){
        this.props.get_SujetofYear(annee).then( res => {
            this.setState({ listSubject: res.data, listSubjectIsHere: true})
        })
    }

    componentDidMount(){
        this.getListSubject(window.location.href.split('/')[window.location.href.split('/').length - 1]);
    }

    render(){
        return(
            <>
                <CCard>
                <Header />
                    <CCardBody>
                        <CRow> 
                            <CCol>
                                <Ajout_Sujet newSubject={this.state.newSubject}
                                             handleSubmit={this.handleSubmit}
                                             handleChange={this.handleChange}
                                             handleFileChange={this.handleFileChange}
                                />
                            </CCol>
                        </CRow>
                    </CCardBody>
                    <Vue_Liste_Sujet listSubject={this.state.listSubject}
                                     listSubjectIsHere={this.state.listSubjectIsHere}/>
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
    connect(mapStateToProps, {add_Sujet, get_Sujets, get_Sujet, get_SujetofYear})
)(View_Liste_Sujet);