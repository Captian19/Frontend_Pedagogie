import React, { Component } from "react";

import Vue_Liste_Lots from "../../../../components/moduleConcours/candidat/lots_candidat/vue_liste_lots";

import {
    CCard
} from '@coreui/react';


import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import {get_NotesByYear} from "../../../../actions/moduleConcours/action_NoteConcours";
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
            <center><h2>Liste par lots de la session {window.location.href.split('/')[window.location.href.split('/').length - 1]}  </h2></center>
        </AppBar>
      </div>
    );
}


class View_Liste_Lots extends Component {
    constructor(props){
        super(props);
        this.state = {
            liste_Candidats: [],
            listIsHere: false,
            liste_lots: []
        }
    }

    getList(year) {
        this.props.get_NotesByYear(year).then(res => {
            let lots = new Set()
            res.data.results.map(l => lots.add(l.id_lot))
            this.setState(
                {
                    liste_Candidats: res.data.results,
                    listeIsHere: true,
                    liste_lots: lots
                }
                )
        }).catch(e => console.log(e.response.data))
    }

    componentDidMount(){
        this.getList(window.location.href.split('/')[window.location.href.split('/').length - 1]);
    }

    render(){
        return(
            <>
                <CCard>
                <Header />
                <Vue_Liste_Lots state={this.state}/>
                </CCard>
            </>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps, {get_NotesByYear})(View_Liste_Lots);
