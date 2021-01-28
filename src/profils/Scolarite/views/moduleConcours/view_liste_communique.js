import React, { Component } from "react";

import Vue_Liste_Communique from "../../../../components/moduleConcours/communiques/vue_liste_communique";
import Ajout_Communique from "../../../../components/moduleConcours/communiques/ajout_communique";

import {
    CCard,
    CCardBody,
    CCol,
    CRow,
} from '@coreui/react';
import {get_CommuniqueYear, get_Communiques, add_Communique} from "../../../../actions/moduleConcours/action_communique";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
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
            <center><h2>Communiques Session {window.location.href.split('/')[window.location.href.split('/').length - 1]}</h2></center>
        </AppBar>
      </div>
    );
}



class View_Liste_Communique extends Component {
    constructor(props){
        super(props);
        this.state = {
            newCommunique: {
                titre: "",
                date_communique: "",
                file: null
            },
            listCommunique: [],
            listCommuniqueIsHere: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e){
        let {name, value} = e.target;
        let doc = {...this.state.newCommunique, [name]: value}
        this.setState({
            newCommunique: doc
        })
        console.log(doc)
    }

    handleFileChange(file){
        let doc = {...this.state.newCommunique, file: file[0]}
        this.setState({
            newCommunique: doc
        })
        console.log(doc);
    }

    handleSubmit(e){
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('file', this.state.newCommunique.file, this.state.newCommunique.file.name);
        form_data.append('titre', this.state.newCommunique.titre)
        form_data.append('date_communique', this.state.newCommunique.date_communique)

        this.props.add_Communique(form_data).then(()=>{
            alert("communique ajouté avec success");
            this.getListCommunique(window.location.href.split('/')[window.location.href.split('/').length - 1]);
        })
    }

    getListCommunique(annee){
        this.props.get_CommuniqueYear(annee).then( res => {
            this.setState({ listCommunique: res.data, listCommuniqueIsHere: true})
        })
    }

    componentDidMount(){
        this.getListCommunique(window.location.href.split('/')[window.location.href.split('/').length - 1]);
    }

    render(){
        return(
            <>
                <CCard>
                <Header />
                    <CCardBody>
                        <CRow> 
                            <CCol>
                                <Ajout_Communique newCommunique={this.state.newCommunique}
                                                  handleSubmit={this.handleSubmit}
                                                  handleChange={this.handleChange}
                                                  handleFileChange={this.handleFileChange}/>
                            </CCol>
                        </CRow>
                    </CCardBody>
                    <Vue_Liste_Communique listCommunique={this.state.listCommunique}
                                          listCommuniqueIsHere={this.state.listCommuniqueIsHere}/>
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
    connect(mapStateToProps, {get_CommuniqueYear, get_Communiques, add_Communique})
)(View_Liste_Communique);