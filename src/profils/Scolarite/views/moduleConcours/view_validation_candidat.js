import React, { Component } from "react";

import Vue_Validation_Candidat from "../../../../components/moduleConcours/candidat/vue_validation_candidat";

import {
    CCard,
    CCardBody
} from '@coreui/react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import {get_Candidats, edit_Candidat, delete_Candidat, get_Candidat} from "../../../../actions/moduleConcours/action_Candidat";
import {connect} from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';


function CircularUnderLoad() {
    return <CircularProgress disableShrink />;
}

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
          <center><h2>LISTE DE VALIDATION</h2></center>
      </AppBar>
    </div>
  );
}


class View_Validation_Candidat extends Component {
    constructor(props){
        super(props);
        this.state = {
            listCandidat: [],
            listIsHere: false
        }
    }

    getAllCandidats(){
        try{
            this.props.get_Candidats().then(res => {
                console.log(res.data.results);
                this.setState({listCandidat: res.data.results.filter(el => {
                        return el.has_paid === false || el.doc_received === false || el.formulaire_is_received === false
                    }), listIsHere: true})
            })
                .catch(e => {
                    console.log(e);
                })
        }catch(e){
            console.log(e)
        }
    }
    componentDidMount() {
        this.getAllCandidats();
    }

    render(){
        return(
            <>
                <CCard>
                    <Header />
                    <CCardBody />
                    {this.state.listIsHere ? (
                        <Vue_Validation_Candidat listCandidat={this.state.listCandidat}
                                                 listIsHere={this.state.listIsHere}
                                                 get_Candidats={this.props.get_Candidats}
                                                 get_Candidat={this.props.get_Candidat}
                                                 edit_Candidat={this.props.edit_Candidat}
                                                 delete_Candidat={this.props.delete_Candidat}
                        />
                    ):(
                        <CircularUnderLoad/>
                    )}

                </CCard>
            </>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps, {get_Candidats, edit_Candidat, delete_Candidat, get_Candidat})(View_Validation_Candidat);