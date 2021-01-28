import React, {Component} from "react";
import {withRouter} from 'react-router-dom';
import {get_Centres} from "../../../actions/moduleConcours/action_Centre";
import {get_Lycees, add_Lycee} from "../../../actions/moduleConcours/action_Lycee";
import {ajouter_CandidatSession} from "../../../actions/moduleConcours/action_CandidatSession";
import {connect} from "react-redux";
import {compose} from "redux";
import all from '../../../constants/moduleConcours/someConstants';
import $ from "jquery";

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

export const FILIERES = [
    { value: '1', label: 'GC', color: '#00B8D9' },
    { value: '2', label: 'GEM', color: '#0052CC' },
    { value: '3', label: 'AERO', color: '#5243AA' },
    { value: '4', label: 'GIT', color: '#FF5630' },
];

const animatedComponents = makeAnimated();



const filieres = ["GC", "GEM", "AERO", "GIT"];
const to_match = {
    'GC': "1",
    'GEM': "2",
    'AERO': "3",
    'GIT': "4"
}



class Ajout_Candidat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            candidatSession: {
                prenom: "",
                nom: "",
                sexe: "",
                telephone: "",
                lieu_naissance: "",
                date_naissance: "",
                pays: "",
                filieres: "",
                serie: "",
                type_candidat: "",
                moy_gen_seconde: 0.0,
                moy_gen_premiere: 0.0,
                moy_gen_terminale: 0.0,
                moy_gen_secondaire: 0.0,
                moy_gen_bac: 0.0,
                mention: 4,
                annee_obtention_bac:"",
                nom_centre: "",
                lycee: ""
            },
            candidat_is_created: false,
            liste_lycee: [],
            centre_is_getted: false,
            liste_centre: [],
            lycee_is_getted: false,
            add_filieres: "",

            Lycee: {
                nom_lycee: "",
                numero_lycee: "",
                region: 0,
                departement: 0,
                email_lycee: ""
            },
            lycee_is_submitted: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeLycee = this.handleChangeLycee.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitLycee = this.handleSubmitLycee.bind(this);
        this.handleChangeFil = this.handleChangeFil.bind(this);
    }

    getAllCentres() {
        try {
            this.props.get_Centres().then(res => this.setState({
                liste_centre: res.data.results,
                centre_is_getted: true
            }))
                .catch(e => {
                    console.log("error");
                })
        } catch (e) {
            console.log(e)
        }
    }

    getAllLycees() {
        try {
            this.props.get_Lycees().then(res => this.setState({liste_lycee: res.data.results, lycee_is_getted: true}))
                .catch(e => {
                    console.log("error");
                })

        } catch (e) {
            console.log(e);
        }
    }

    handleChange = (e) => {
        let {name, value} = e.target;
        let infos = {...this.state.candidatSession, [name]: value}
        this.setState({
            candidatSession: infos
        });
        console.log(infos);
    }

    handleChangeFil(e) {
        console.log(e)
        if(e.length === 4) {
            console.log( e[0].value + ", " + e[1].value + ", " + e[2].value + ", " + e[3].value)
            let fil = e[0].value + ", " + e[1].value + ", " + e[2].value + ", " + e[3].value
            this.setState({
                add_filieres: fil
            })
        }

    }

    handleChangeLycee(e){
        let {name, value} = e.target;
        let newLycee = {...this.state.Lycee, [name]:value}
        this.setState({
            Lycee: newLycee
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let infosCandidats = {...this.state.candidatSession, filieres: this.state.add_filieres}
        console.log(infosCandidats);
        this.props.ajouter_CandidatSession(infosCandidats).then(res => {
            this.props.history.push('/scolarite/concours/ajout_candidat');
            this.setState({
                candidatSession: {
                    prenom: "",
                    nom: "",
                    telephone: "",
                    lieu_naissance: "",
                    date_naissance: "",
                    pays: "",
                    filieres: "",
                    serie: "",
                    type_candidat: 0,
                    moy_gen_seconde: 0.0,
                    moy_gen_premiere: 0.0,
                    moy_gen_terminale: 0.0,
                    moy_gen_secondaire: 0.0,
                    moy_gen_bac: 0.0,
                    mention: 4,
                    annee_obtention_bac: "",
                    nom_centre: "",
                    lycee: ""
                },
                candidat_is_created: true
            });
            alert("Candidat crée avec succès");
        });
    }

    handleSubmitLycee(e){
        e.preventDefault();
        this.props.add_Lycee(this.state.Lycee).then(res => {
            this.props.history.push('/scolarite/concours/ajout_candidat');
            this.setState({lycee_is_submitted: true})
            this.getAllLycees()
        }).catch(err => console.log(err))
    }

    displayMention = (type_candidat) =>{
        let a = null;
        if(type_candidat===2){
            a = "form-group visible row"
        }
        else{
            a = "d-none"
        }

        return a
    }

    alertSuccess() {
        if (this.state.candidat_is_created)
            return (<div className="alert alert-success" id="success-alert" role="alert">
                Candidats inscrits avec succès
            </div>)
        else
            return (<div className="alert alert-info" id="success-alert" role="alert">
                Veillez bien remplir les champs!!
            </div>)
    }
    alertSuccessLycee() {
        if (this.state.lycee_is_submitted)
            return (<div className="alert alert-success" id="success-alert" role="alert">
                Lycée crée avec succès
            </div>)
        else
            return (<div className="alert alert-info" id="success-alert" role="alert">
                Veillez bien remplir les champs!!
            </div>)
    }

    

    componentDidMount() {
        this.getAllCentres();
        this.getAllLycees();

        // numero formattage
        $(function () {

            $('#txtnumber').keydown(function (e) {
                const key = e.charCode || e.keyCode || 0;
                let $text = $(this);
                if (key !== 8 && key !== 9) {
                    if ($text.val().length === 2) {
                        $text.val($text.val() + '-');
                    }
                    if ($text.val().length === 6) {
                        $text.val($text.val() + '-');
                    }
                    if ($text.val().length === 9) {
                        $text.val($text.val() + '-');
                    }

                }

                return (key === 8 || key === 9 || key === 46 || (key >= 48 && key <= 57) || (key >= 96 && key <= 105));
            })
        });
        $("#success-alert").fadeTo(2000, 500).slideUp(500, function () {
            $("#success-alert").slideUp(500);
        });
        $(function () {
            $("#btnShow").click(function () {
                $("#dialog").dialog({
                    modal: true,
                    title: "jQuery Dialog",
                    width: 300,
                    height: 150,
                    open: function (event, ui) {
                        setTimeout(function () {
                            $("#dialog").dialog("close");
                        }, 5000);
                    }
                });
            });
        });
    }

    render() {
        return (

            <>
                <main className="c-main">
                    <div className="container-fluid">

                        {/*<popup candidat_is_created={this.state.candidat_is_created}/>*/}

                        <form className="form-horizontal" onSubmit={this.handleSubmit}>
                            <div className="fade-in">
                                <div className="row">
                                    <div className="col-lg-12">
                                      
                                                <div className="form-group">
                                                    <div className="controls">
                                                        <div className="row">
                                                            <div className="col col-md-6">
                                                                <label className="col-form-label"
                                                                       htmlFor="prependedInput">Prénom</label>
                                                                <input name="prenom"
                                                                       value={this.state.candidatSession.prenom}
                                                                       onChange={this.handleChange} type="text"
                                                                       className="form-control" required/>
                                                            </div>
                                                            <div className="col col-md-6">
                                                                <label className="col-form-label"
                                                                       htmlFor="prependedInput">Nom</label>
                                                                <input name="nom" value={this.state.candidatSession.nom}
                                                                       onChange={this.handleChange} type="text"
                                                                       className="form-control" required/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="controls">
                                                        <div className="row">
                                                            <div className="col">
                                                                <label className="col-form-label"
                                                                       htmlFor="prependedInput">Date de
                                                                    naissance</label>
                                                                <input name="date_naissance"
                                                                       value={this.state.candidatSession.date_naissance}
                                                                       onChange={this.handleChange} type="date"
                                                                       className="form-control" required/>
                                                            </div>
                                                            <div className="col">
                                                                <label className="col-form-label"
                                                                       htmlFor="prependedInput">Lieu de
                                                                    naissance</label>
                                                                <input name="lieu_naissance"
                                                                       value={this.state.candidatSession.lieu_naissance}
                                                                       onChange={this.handleChange} type="text"
                                                                       className="form-control" required/>
                                                            </div>
                                                            <div className="col">
                                                                <label className="col-form-label"
                                                                       htmlFor="prependedInput">Sexe</label>
                                                                <select name="sexe"
                                                                       value={this.state.candidatSession.sexe}
                                                                       onChange={this.handleChange} type="text"
                                                                       className="form-control" required>
                                                                    <option hidden>Sexe du candidat</option>
                                                                    <option value="M">Masculin</option>
                                                                    <option value="F">Féminin</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="controls">
                                                        <div className="row">
                                                            <div className="col">
                                                                <label className="col-form-label"
                                                                       htmlFor="prependedInput">Pays</label>
                                                                <select name="pays"
                                                                        value={this.state.candidatSession.pays}
                                                                        onChange={this.handleChange}
                                                                        className="form-control" required>
                                                                    {Object.keys(all.NATIONALITE).map((key) => (
                                                                        <option
                                                                            value={key}>{all.NATIONALITE[key]}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div className="col">
                                                                <label className="col-form-label"
                                                                       htmlFor="prependedInput">Téléphone</label>
                                                                <input type="text"
                                                                       id="txtnumber"
                                                                       className="form-control"
                                                                       name="telephone"
                                                                       minLength= "9"
                                                                       maxLength= "12"
                                                                       value={this.state.candidatSession.telephone}
                                                                       onChange={this.handleChange}
                                                                       placeholder="Ex: 77-245-61-28"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="controls">
                                                        <div className="row">
                                                            <div className="col">
                                                                <label className="col-form-label"
                                                                       htmlFor="prependedInput">Filières</label>
                                                                <Select
                                                                    closeMenuOnSelect={false}
                                                                    components={animatedComponents}
                                                                    isMulti
                                                                    options={FILIERES}
                                                                    onChange={this.handleChangeFil}
                                                                />

                                                            </div>
                                                            <div className="col">
                                                                <label className="col-form-label"
                                                                       htmlFor="prependedInput">Serie</label>
                                                                <select name="serie"
                                                                        value={this.state.candidatSession.serie}
                                                                        onChange={this.handleChange}
                                                                        className="form-control" required>
                                                                    <option hidden>Choisir la série</option>
                                                                    {Object.keys(all.SERIE).map((key) => (
                                                                        <option value={key}>{all.SERIE[key]}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col">
                                                        <label className="col-form-label" htmlFor="prependedInput">Type
                                                            de candidat</label>
                                                        <select name="type_candidat"
                                                                value={this.state.candidatSession.type_candidat}
                                                                onChange={this.handleChange} className="form-control" required>
                                                            <option hidden>type de candidat</option>
                                                            {Object.keys(all.TYPE).map((key) => (
                                                                <option value={key}>{all.TYPE[key]}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>

                                                {this.state.candidatSession.type_candidat === "2" ? (
                                                    <div className="form-group">
                                                        <div className="controls">
                                                            <div className="row">
                                                                <div className="col">
                                                                    <label className="col-form-label"
                                                                           htmlFor="prependedInput">Année d'Obtention du
                                                                        Bac</label>
                                                                    <input name="annee_obtention_bac"
                                                                           onChange={this.handleChange} type="text"
                                                                           className="form-control"/>
                                                                </div>
                                                                <div className="col">
                                                                    <label className="col-form-label"
                                                                           htmlFor="prependedInput">Mention</label>
                                                                    <select name="mention"
                                                                            value={this.state.candidatSession.mention}
                                                                            onChange={this.handleChange} className="form-control">
                                                                        <option hidden>mention obtenue</option>
                                                                        {Object.keys(all.MENTION).map((key) => (
                                                                            <option value={key}>{all.MENTION[key]}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ):(
                                                    <br />
                                                )}


                                                <div className="form-group">
                                                    <div className="controls">
                                                        <div className="row">
                                                            <div className="col">
                                                                <label className="col-form-label"
                                                                       htmlFor="prependedInput">Option Centre</label>
                                                                <select name="nom_centre"
                                                                        value={this.state.candidatSession.nom_centre}
                                                                        onChange={this.handleChange}
                                                                        className="form-control">
                                                                    <option hidden>choisir centre</option>
                                                                    {this.state.centre_is_getted ? (

                                                                        this.state.liste_centre.map(centre => {
                                                                            return (
                                                                                <option
                                                                                    value={centre.nom_centre}>{centre.nom_centre}</option>
                                                                            )
                                                                        })
                                                                    ) : (
                                                                        <option>Pas encore de centre</option>
                                                                    )}

                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                   
                                </div>
                                <hr />

                                <div className="row">
                                    <div className="col-lg-12">
                                       

                                                <div className="form-group">
                                                    <div className="controls">
                                                        <div className="row">
                                                            <div className="col">
                                                                <label className="col-form-label"
                                                                       htmlFor="prependedInput">Liste Lycees</label>
                                                                <select name="lycee"
                                                                        value={this.state.candidatSession.lycee}
                                                                        onChange={this.handleChange}
                                                                        className="form-control">
                                                                    <option hidden>choisir lycee</option>
                                                                    {this.state.lycee_is_getted ? (
                                                                        this.state.liste_lycee.map(lycee => {
                                                                            return (
                                                                                <option
                                                                                    value={lycee.id}>{lycee.nom_lycee}</option>
                                                                            )
                                                                        })
                                                                    ) : (
                                                                        <option>Pas de lycees</option>
                                                                    )}

                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                Si le lycee ne se trouve pas dans la liste: <br/>
                                                <a type="button" className="btn btn-behance text-white" data-toggle="modal"
                                                   data-target="#exampleModal">
                                                    <b>Ajouter un nouveau lycee</b>
                                                </a>

                                            </div>
                                      
                                </div>
                                <hr />

                                <div className="row">
                                    
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <div className="controls">
                                                        <div className="row">
                                                            <div className="col col-md-4">
                                                                <label className="col-form-label"
                                                                       htmlFor="prependedInput">Moyenne générale
                                                                    seconde</label>
                                                                <input type="number" name="moy_gen_seconde"
                                                                       value={this.state.candidatSession.moy_gen_seconde}
                                                                       onChange={this.handleChange}
                                                                       className="form-control"
                                                                       min = "0"
                                                                       max = "20"
                                                                       step="any"/>
                                                            </div>
                                                            <div className="col col-md-4">
                                                                <label className="col-form-label"
                                                                       htmlFor="prependedInput">Moyenne générale
                                                                    première</label>
                                                                <input type="number" name="moy_gen_premiere"
                                                                       value={this.state.candidatSession.moy_gen_premiere}
                                                                       onChange={this.handleChange}
                                                                       className="form-control"
                                                                       min = "0"
                                                                       max = "20"
                                                                       step="any" />
                                                            </div>
                                                            <div className="col col-md-4">
                                                                <label className="col-form-label"
                                                                       htmlFor="prependedInput">Moyenne générale
                                                                    terminale</label>
                                                                <input type="number"
                                                                       name="moy_gen_terminale"
                                                                       value={this.state.candidatSession.moy_gen_terminale}
                                                                       onChange={this.handleChange}
                                                                       className="form-control"
                                                                       min = "0"
                                                                       max = "20"
                                                                       step="any"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                       
                                </div>

                                {this.alertSuccess()}
                                <div className="form-actions">
                                    <button className="btn btn-pill btn-success" type="submit">Valider</button>
                                    <button className="btn btn-pill btn-danger float-right" type="reset">Cancel</button>
                                </div>

                            </div>
                        </form>
                        <hr/>


                        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                             aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Informations Lycee</h5>
                                        <button type="button" className="close" data-dismiss="modal"
                                                aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <form onSubmit={this.handleSubmitLycee}>
                                        <div className="modal-body">
                                            {this.alertSuccessLycee()}
                                            <div className="form-group">
                                                <div className="controls">
                                                    <div className="row">
                                                        <div className="col" id="ajouLycee">
                                                            <label className="col-form-label" htmlFor="prependedInput">Nom
                                                                du Lycée</label>
                                                            <input name="nom_lycee" onChange={this.handleChangeLycee}
                                                                   type="text"
                                                                   className="form-control"/>
                                                        </div>
                                                        <div className="col">
                                                            <label className="col-form-label" htmlFor="prependedInput">Email
                                                                du Lycée</label>
                                                            <input name="email_lycee" onChange={this.handleChangeLycee}
                                                                   type="email" className="form-control"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="controls">
                                                    <div className="row">
                                                        <div className="col">
                                                            <label className="col-form-label" htmlFor="prependedInput">Numéro
                                                                de Téléphone</label>
                                                            <input type="text"
                                                                   id="txtnumber"
                                                                   onChange={this.handleChangeLycee}
                                                                   className="form-control"
                                                                   name="numero_lycee"
                                                                   placeholder="Ex: 77-245-61-28"/>
                                                        </div>
                                                        <div className="col">
                                                            <label className="col-form-label" htmlFor="prependedInput"
                                                                   name="region">Région</label>
                                                            <select name="region" onChange={this.handleChangeLycee}
                                                                    className="form-control">
                                                                <option hidden>Dans quelle region?</option>
                                                                {Object.keys(all.REGION_LIST).map((key) => (
                                                                    <option value={key}>{all.REGION_LIST[key]}</option>
                                                                ))}
                                                            </select>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="controls">
                                                    <div className="row">
                                                        <div className="col">
                                                            <label className="col-form-label" htmlFor="prependedInput"
                                                                   name="departement">Département</label>
                                                            <select name="departement" className="form-control"
                                                                    onChange={this.handleChangeLycee}>
                                                                <option hidden>Dans quel département?</option>
                                                                {Object.keys(all.DEPARTEMENT[this.state.Lycee.region]).map((key) => (
                                                                    <option
                                                                        value={key}>{all.DEPARTEMENT[this.state.Lycee.region][key]}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                        <div className="modal-footer">
                                                {/* <Button variant="contained"  className="btn btn-outline-danger" onClick={() => {
                                                    handleClose();
                                                }}>
                                                    Quitter
                                                </Button> */}
                                           
                                            <button type="submit" className="btn btn-outline-success">Ajouter
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>


                    </div>
                </main>

            </>

        )
    }

}

const mapStateToProps = state => ({
    auth: state.auth
});
export default compose(
    withRouter,
    connect(mapStateToProps, {get_Lycees, add_Lycee, get_Centres, ajouter_CandidatSession})
)(Ajout_Candidat);
//
// export default withRouter(Ajout_Candidat);