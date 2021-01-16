import React, { Component } from 'react';
import { id_classe } from "../../../../../constants/Planning&Notes/constants";
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
import {useParams } from 'react-router-dom';
// Form elements
import { MenuItem } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { loadCourses, convertIdCourseToLibelle } from "../../../../../actions/Planning&Notes/planning_functions";

// const id_classe = "5fc6248e553f96cabf181026";


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


export default function RemplirCahier(props) {
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
    const [courses, setCoursesState] = React.useState([]);
    let { id_planning, id_seance } = useParams();

    // useEffect for fetching the seance from the db
    React.useEffect(async () => {
        const result = await axios.get("http://localhost:8000/api/cahier/" + id_planning + "/" + id_seance +"/");
        const data = JSON.parse(result.data);
        setSeanceState(JSON.parse(result.data));
        setDateState(data.cahierSeance.dateSeance);
        setEditorState(data.cahierSeance.contenu);
        setNbHeuresState(data.cahierSeance.nbHeures);
        const absents = data.cahierSeance.absents;
        setListeAbsents(absents != "" ? absents.split(",").map(x=>+x): null);
        setCoursesState(await loadCourses(id_classe));
        setLoadingState(false);

    }, []);

    const classes = useStyles();
    const [date, setDateState] = React.useState(null);
    const [editorState, setEditorState] = React.useState(null);
    const [nbHeures, setNbHeuresState] = React.useState(1);
    const [listeAbsents, setListeAbsents] = React.useState(null);
    const handleDateChange = (e) => setDateState(e.value);

    const handleEditorChange = (editorState) => setEditorState(editorState);

    const handleNbHeuresChange = (nbHeures) => setNbHeuresState(nbHeures.target.value);

    const handleListeAbsentsChange = (listeAbsents) => setListeAbsents(listeAbsents);

    const handleSubmit = async () => {
        const cahier_de_seance = {
            dateSeance: date,
            nbHeures: nbHeures,
            contenu: editorState,
            // isValide: false
            isValide: true,
            absents: listeAbsents.join(",")
        }
        seance['cahierSeance'] = cahier_de_seance;
        await axios.put("http://localhost:8000/api/cahier/" + id_planning + "/" + id_seance +"/", seance).then( response => console.log(response));        
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
                            <p className={classes.paragraphe}>{ courses.length != 0 ? convertIdCourseToLibelle(courses ,seance.cours) : seance.cours}</p>
                            <p className={classes.paragraphe}>{seance.prof}</p>
                            <p className={classes.paragraphe}>{seance.jour} de {seance.heureDebut} heures à {seance.heureDebut + seance.duree} heures</p>
                            <DatePicker handleChange={handleDateChange} defaultValue={date}/>
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
                        <ListAbsences handleListeAbsentsChange={handleListeAbsentsChange} defaultValue={listeAbsents} />
                    </Paper>
                </Grid>
            </Grid>
            }
        </div>
    );
}

/*
function PrenomNom(props) {
    const classes = useStyles();

    return (
        <Grid container spacing={3} justify="space-between" alignItems="center" style={{ marginBottom: 30 }}>
            <Grid className="prenom-nom" container spacing={3} xs={10} sm={10}>
                <Grid className="prenom" xs={6} xm={6}>
                    <form className={classes.form} noValidate autoComplete="off">
                        <TextField id="standard-basic" label="Prénom" style={{ width: 100 }} />
                    </form>
                </Grid>
                <Grid className="nom" xs={6} xm={6}>
                    <form className={classes.form} noValidate autoComplete="off">
                        <TextField id="standard-basic" label="Nom" style={{ width: 100 }} />
                    </form>
                </Grid>
            </Grid>
            <Grid xs={2} sm={2}>
                <Delete style={{ color: "red" }} onClick={() => props.deleter(props.id)} />
            </Grid>
        </Grid>
    );
}
*/