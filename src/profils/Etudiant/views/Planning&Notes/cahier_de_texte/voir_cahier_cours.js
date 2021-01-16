import React from 'react';
import '../../../../../assets/Planning&Notes/css/App.css';
import { makeStyles } from '@material-ui/core/styles';
import { getStudentFromId } from "../../../../../actions/Planning&Notes/cahier_de_texte_functions";
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid, Paper } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import draftToMarkdown from 'draftjs-to-markdown';
import CircularProgress from "../../../../../components/Planning&Notes/cahier_de_texte_components/circular_progress";
import { loadSeance } from "../../../../../actions/Planning&Notes/planning_functions";

// Some styling
const blueColor = "#2699FB";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const useStyles = makeStyles((theme) => ({
    box: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

const eleves = [
    { _id: 1, prenom: 'Alioune', nom: 'Sarr' },
    { _id: 2, prenom: 'Falilou', nom: 'Fall' },
    { _id: 3, prenom: 'Mamadou', nom: 'Sow' },
    { _id: 4, prenom: 'Mame Diarra', nom: 'Sow' },
    { _id: 5, prenom: 'Ibrahima Birane', nom: 'Faye' },
    { _id: 6, prenom: 'Kalidou', nom: 'Dia' },
    { _id: 7, prenom: 'Fallou', nom: 'Diakhaté' },
    { _id: 8, prenom: 'Khadim', nom: 'Diakhaté' },
    { _id: 9, prenom: 'Sokhna Cambel', nom: 'Dieng' },
];
export default function CahierCours(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    let { id_progression } = useParams();

    const [progression, setProgressionState] = React.useState([]);
    const [seances, setSeancesState] = React.useState([]);
    const [loading, setLoadingState] = React.useState(true);
    const [cours, setCoursState] = React.useState({});
    React.useEffect(async () => {
        await loadSeance(id_progression).then(response => {
            const prog = response.splice(0, 1)[0];
            setProgressionState(prog);
            setSeancesState(response);
            return prog;

        }).then(progress => {
                setCoursState(progress.cours);
                setLoadingState(false);
        });


    }, []);


    return (
        <div>
            {loading ?
                <div className="sweet-loading">
                    <ClipLoader
                        css={override}
                        size={150}
                        color={"#123abc"}
                        loading={loading}
                    />
                </div>
                :

                <Card>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                {cours.libelle[0].toUpperCase()}
                            </Avatar>
                        }

                        title={cours.libelle}
                        subheader="Maquette DIC1 GIT / Developpemnt"
                    />

                    <CardContent>
                        <Grid container spacing={4}>
                            <Grid item sm={8}>
                                <Typography variant="body2" color="textSecondary" component="p">Nombre d'heures : {cours['chargeHoraire']} heures</Typography>
                                <Typography variant="body2" color="textSecondary" component="p">Nombre d'heures exécutées : {progression.nbHeuresExecutees} heures</Typography>
                                <Typography variant="body2" color="textSecondary" component="p">Date de début du cours : {progression.dateDebut}</Typography>
                                <Typography variant="body2" color="textSecondary" component="p">Etat : {progression.dateFin == null ? "En cours" : "Fini le " + progression.dateFin}</Typography>
                            </Grid>
                            <Grid item sm={4}>
                                <CircularProgress size={80} value= {progression.nbHeuresExecutees * 100 / cours.chargeHoraire} />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit style={{ borderRadius: 4 }}>
                        <CardContent>
                            {seances.map(
                                (seance, index) => {
                                    const absents = seance.cahierSeance.absents === "" ? [] : seance.cahierSeance.absents.split(",");
                                    console.log(absents);
                                    return (
                                        <>
                                            <Paper key={index} style={{ backgroundColor: "#2699FB", margin: 20, paddingTop: 20 }}>
                                                <Typography style={{ color: "white", marginTop: 15, marginLeft: 15 }} variant="body2" color="textSecondary" component="p">Seance du {seance.cahierSeance.dateSeance}</Typography>
                                                <Typography style={{ color: "white", marginTop: 10, marginLeft: 15 }} variant="body2" color="textSecondary" component="p">{seance.prof}</Typography>
                                                <Typography style={{ color: "white", marginTop: 10, marginLeft: 15 }} variant="body2" color="textSecondary" component="p">Nombre d'heures : {seance.duree}</Typography>
                                                <Typography style={{ color: "white", marginTop: 10, marginLeft: 15 }} variant="body2" color="textSecondary" component="p">De {seance.heureDebut} heures à {seance.heureDebut + seance.duree} heures</Typography>
                                                <Typography style={{ color: "white", marginTop: 10, marginLeft: 15 }} variant="body2" color="textSecondary" component="p">Signé : {seance.isValide ? "Oui" : "Non"}</Typography>
                                                <Grid container spacing={4} >
                                                    <Grid item sm={7}>
                                                        <Typography paragraph style={{ backgroundColor: "white", borderRadius: 5, marginTop: 15, marginLeft: 15, padding: 20 }}>
                                                            {draftToMarkdown(convertToRaw(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(seance.cahierSeance.contenu))).getCurrentContent()))}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item sm={5}>
                                                        <h4 style={{ color: "white" }}>LISTE DES ABSENTS ({absents.length})</h4>

                                                        {absents.length == 0 ?
                                                            <Typography key={index} style={{ color: "white" }} variant="body2" color="textPrimary" component="p">Pas d'absents.</Typography>
                                                            :
                                                            absents.map(
                                                                (element, index) => {
                                                                    const eleve = getStudentFromId(eleves, parseInt(element));
                                                                    return <Typography key={index} style={{ color: "white" }} variant="body2" color="textPrimary" component="p">{eleve.prenom + " " + eleve.nom}</Typography>
                                                                }
                                                            )}
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        </>
                                    )
                                }
                            )}
                        </CardContent>
                    </Collapse>
                </Card>
            }
        </div>
    );
}