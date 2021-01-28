import React from 'react';
import Editor from '../../../../../components/Planning&Notes/cahier_de_texte_components/editor';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import DatePicker from '../../../../../components/Planning&Notes/planning_components/datePicker';
import { loadCSS } from 'fg-loadcss';
import Button from '@material-ui/core/Button';
import ListAbsences from '../../../../../components/Planning&Notes/cahier_de_texte_components/liste_absences';
import Send from '@material-ui/icons/Send';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
// Form elements
import { MenuItem } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

// Redux
import { connect } from "react-redux";


// Some styling
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    form: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    icon: {
        '& > .fa': {
            margin: theme.spacing(2),
        },
    },
    button: {
        margin: theme.spacing(1),
    },
    paragraphe: {
        textAlign: 'center',
    }
}));


function RemplirCahier(props) {
    /**
     * With this compoenent, we can create or modify a cahier de texte. In the case of a modification, the values to modif is passed by the parent
     * The component will handle all the change of:
     * The Cahier de texte,
     * The list of absences
     * The numbers of hours done by the teacher
     * The date of the course
     */

    // For querying font awasome when the component loads
    React.useEffect(() => {
        const node = loadCSS(
            'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
            document.querySelector('#font-awesome-css'),
        );
        return () => {
            node.parentNode.removeChild(node);
        };
    }, []);

    const [loading, setLoadingState] = React.useState(true);
    const [seance, setSeanceState] = React.useState(null);
    const [role] = React.useState(() => {
        var current_role = null;
        props.auth.user.CurrentRoles.map(role => {
            // console.log(role)
            if (role.role_type === "ENSEIGNANT" || role.role_type === "ETUDIANT") {
                return current_role = {
                    type: role.role_type,
                    id: role.id,
                    departement: role.departement,
                };
            }

        })
        return current_role;
    })
    let { id_planning, id_seance } = useParams();

    // useEffect for fetching the seance from the db
    React.useEffect(async () => {
        const result = await axios.get("http://localhost:8000/api/cahier/" + id_planning + "/" + id_seance + "/");
        const data = (result.data);
        setSeanceState(data);
        setDateState(data.cahierSeance.dateSeance);
        setEditorState(data.cahierSeance.contenu);
        setNbHeuresState(data.cahierSeance.nbHeures);
        const absents = data.cahierSeance.absents;
        setListeAbsents(absents != "" ? absents.split(",").map(x => +x) : null);
        setLoadingState(false);

    }, []);

    const classes = useStyles();
    const history = useHistory();
    const [date, setDateState] = React.useState(null);
    const [editorState, setEditorState] = React.useState(null);
    const [nbHeures, setNbHeuresState] = React.useState(1);
    const [listeAbsents, setListeAbsents] = React.useState(null);
    const handleDateChange = (e) => setDateState(e.value);

    const handleEditorChange = (editorState) => setEditorState(editorState);

    const handleNbHeuresChange = (nbHeures) => setNbHeuresState(nbHeures.target.value);

    const handleListeAbsentsChange = (listeAbsents) => {
        setListeAbsents(listeAbsents)
    };

    const handleSubmit = async () => {
        if (seance.cahierSeance.isValide) alert("Vous avez déjà validé le cahier de séance. Vous ne pouvez plus le modifier.")

        else {
            var result = {};
            if (role.type === "ENSEIGNANT") {
                const confirmation = window.confirm("Après validation, vous ne pourrez plus modifier le cahier de texte. Continuer ?");
                if (confirmation) {
                    const cahier_de_seance = {
                        dateSeance: date,
                        nbHeures: nbHeures,
                        contenu: editorState,
                        isValide: role.type === "ENSEIGNANT" ? true : false,
                        absents: listeAbsents.join(",")
                    }
                    seance['cahierSeance'] = cahier_de_seance;
                    result = await axios.put("http://localhost:8000/api/cahier/" + id_planning + "/" + id_seance + "/", seance);
                }
            }

            else {
                const cahier_de_seance = {
                    dateSeance: date,
                    nbHeures: nbHeures,
                    contenu: editorState,
                    isValide: role.type === "ENSEIGNANT" ? true : false,
                    absents: listeAbsents.join(",")
                }
                seance['cahierSeance'] = cahier_de_seance;
                result = await axios.put("http://localhost:8000/api/cahier/" + id_planning + "/" + id_seance + "/", seance);
            }
            
            if (result.status < 400) {
                history.push("/enseignant/voir-cahier-cours/" + result.data._id);
            }
            else alert("Enregistrement non effectué.");
        }

    }


    return (
        <div className={classes.root}>
            {loading ?
                null
                :

                <Grid container spacing={3}>
                    <Grid xs={12} sm={7} spacing={3}>{/* This fisrt one is for the right box that contains the informations about the course and the EDITOR */}
                        <Grid sm={12} style={{ marginBottom: 20 }}>
                            <Paper className={classes.paper}>
                                <p className={classes.paragraphe}>{seance.info_cours}</p>
                                <p className={classes.paragraphe}>{`${seance.info_prof.user.first_name} ${seance.info_prof.user.last_name}`}</p>
                                <p className={classes.paragraphe}>{seance.jour} de {seance.heureDebut} heures à {seance.heureDebut + seance.duree} heures</p>
                                <DatePicker handleChange={handleDateChange} defaultValue={date} />
                                <div style={{ marginLeft: 15 }}>
                                    <FormControl style={{ width: 150 }}>
                                        <InputLabel id="labelSelect1" className="shrink" style={{ fontSize: 13 }}>Durée du cours</InputLabel>
                                        <Select name="nbHeures" onChange={handleNbHeuresChange} labelId="labelSelect1"
                                            id="demo-simple-select3"
                                            defaultValue={nbHeures}
                                        >
                                            <MenuItem value={1}>1 heures</MenuItem>
                                            <MenuItem value={2}>2 heures</MenuItem>
                                            <MenuItem value={3}>3 heures</MenuItem>
                                            <MenuItem value={4}>4 heures</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid sm={12}>
                            <Paper className={classes.paper}>
                                <div style={{ borderStyle: "solid", borderWidth: 2, borderColor: "gray", borderRadius: 4, }}>
                                    <Editor handleEditorChange={handleEditorChange} defaultValue={editorState} />
                                </div>
                            </Paper>
                        </Grid>
                        <Button variant="contained"
                            color="primary"
                            className={classes.button}
                            style={{ margin: 40 }}
                            startIcon={<Send />} onClick={() => handleSubmit()}>Valider
                    </Button>
                    </Grid>
                    <Grid item xs={12} sm={5} >{/* This second box is for the list of absence */}
                        <Paper className={classes.paper}>
                            <h4>
                                LISTES DES ABSENTS
                        </h4>
                            <h6>Cocher les personnes absentes</h6>
                            <ListAbsences handleListeAbsentsChange={handleListeAbsentsChange} defaultValue={listeAbsents} classe={seance.classe} />
                        </Paper>
                    </Grid>
                </Grid>
            }
        </div>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    // props: ownprops,
})

export default connect(mapStateToProps, null)(RemplirCahier)
