import React from 'react';
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

// Redux
import { connect } from "react-redux";
import { saveCahier } from '../../../../../actions/Planning&Notes/cahier_de_texte_services';


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


function FaireLAppel(props) {
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
            if (role.role_type == "ENSEIGNANT" || role.role_type == "ETUDIANT") {
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
        console.log(listeAbsents);
        const cahier_de_seance = {
            dateSeance: date,
            nbHeures: 0,
            contenu: "",
            // isValide: false
            isValide: false,
            absents: listeAbsents.join(",")
        }
        seance['cahierSeance'] = cahier_de_seance;
        try{
            await saveCahier(id_planning, id_seance, seance);
            alert("La liste d'absences a bien été enregistrée.");
            history.push("/enseignant/voir-mes-plannings");
        }catch(e){
            console.log(e);
            alert("Problème de communication avec le serveur.");
        }
    }


    return (
        <div className={classes.root}>
            {loading ?
                null
                :

                <Grid container spacing={3} direction="column">
                    <Grid sm={12} style={{ marginBottom: 20 }}>
                        <Paper className={classes.paper}>
                            <p className={classes.paragraphe}>{seance.info_cours}</p>
                            <p className={classes.paragraphe}>{`${seance.info_prof.user.first_name} ${seance.info_prof.user.first_name}`}</p>
                            <p className={classes.paragraphe}>{seance.jour} de {seance.heureDebut} heures à {seance.heureDebut + seance.duree} heures</p>
                            <DatePicker handleChange={handleDateChange} defaultValue={date} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} >{/* This second box is for the list of absence */}
                        <Paper className={classes.paper}>
                            <h4>
                                LISTES DES ABSENTS
                        </h4>
                            <h6>Cocher les personnes absentes</h6>
                            <ListAbsences handleListeAbsentsChange={handleListeAbsentsChange} defaultValue={listeAbsents} classe={seance.classe} />
                        </Paper>
                    </Grid>
                    <Grid item xs={3} sm={3} >
                        <Button variant="contained"
                            color="primary"
                            className={classes.button}
                            style={{ margin: 40 }}
                            startIcon={<Send />} onClick={() => handleSubmit()}>Valider
                        </Button>
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

export default connect(mapStateToProps, null)(FaireLAppel)
