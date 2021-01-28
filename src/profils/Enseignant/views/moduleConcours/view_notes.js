import React, { Component } from "react";

import Ajout_Note from "../../../../components/moduleConcours/professeur/ajout_note";
import Vue_Note_Candidat from "../../../../components/moduleConcours/professeur/vue_note_candidat";
import {
    add_Note,
    get_Notes,
    edit_Note,
    get_NotesByYear
} from "../../../../actions/moduleConcours/action_NoteConcours";
import {get_Correcteur} from "../../../../actions/moduleConcours/action_Correcteur";
import {connect} from "react-redux";
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';

import {
    CCard,
} from '@coreui/react';

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
            <center><h2>Ajout Notes</h2></center> 
        </AppBar>
      </div>
    );
}



class View_Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noteCandidat: {
                id_lot:"",
                correcteur: "",
                anonymat_candidat: "",
                note_maths: 0.0,
                note_physique: 0.0,
                note_francais: 0.0,
                note_anglais: 0.0
            },
            current_correcteur: {},
            alertMessage: {
                ok: undefined,
                message: "Veuillez remplir correctement les champs!"
            },
            availableNotes: [],
            note_is_getted: false
        }
        this.handleChangeNote = this.handleChangeNote.bind(this);
        this.handleSubmitNote = this.handleSubmitNote.bind(this);
    }
    handleChangeNote(e){
        let {name, value} = e.target;
        let infos = {...this.state.noteCandidat, [name]: value}
        this.setState({
            noteCandidat: infos
        })
        console.log(infos);
    }

    handleSubmitNote(e){
        e.preventDefault();
        this.props.add_Note(this.state.noteCandidat)
            .then(() => this.setState({
                alertMessage: {
                    ok: true,
                    message: "Note soumis avec succès!"
                }
            }))
            .catch(e => this.setState({
                alertMessage: {
                    ok: false,
                    message: "Vous avez déjà corrigé ce candidat!"
                }
            }));
    }

    async getCorrecteur(id) {
        await this.props.get_Correcteur(id)
                .then(res => this.setState({
                    current_correcteur: res.data
                }))
                .catch(e => {
                    console.log(e)
                })
    }

    getAllNotes() {
        let id = this.props.user.id;
        console.log(id);
        this.props.get_NotesByYear(new Date().getFullYear())
            .then(res => this.setState(
            {availableNotes: res.data.results.filter(note => note.correcteur.id_correcteur === ("" + id)), note_is_getted: true}))
            .catch(err => console.log(err));
    }
    componentDidMount() {
        this.getAllNotes();
        this.getCorrecteur(this.props.user.id).then(()=> {
            let note = {...this.state.noteCandidat, correcteur: this.state.current_correcteur.id}
            this.setState({
                noteCandidat: note
            })
        });
    }

    render(){
        return(
            <CCard>
                <Header />

                <Ajout_Note add_Note={this.props.add_Note} alertMessage={this.state.alertMessage}
                                handleChangeNote={this.handleChangeNote}
                                handleSubmitNote={this.handleSubmitNote}/>
                    {this.state.note_is_getted ? (
                        <Vue_Note_Candidat availableNotes={this.state.availableNotes}/>
                    ): (
                        <>
                            <LinearProgress/>
                        </>
                )}

        </CCard>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    user: state.auth.user,
});
export default connect(mapStateToProps, {get_Correcteur, get_Notes, get_NotesByYear, add_Note, edit_Note})(View_Notes);