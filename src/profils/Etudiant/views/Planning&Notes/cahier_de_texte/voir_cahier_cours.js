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
import Editor from '../../../../../components/Planning&Notes/cahier_de_texte_components/editor';
import CircularProgress from "../../../../../components/Planning&Notes/cahier_de_texte_components/circular_progress";
import { loadSeance } from "../../../../../actions/Planning&Notes/planning_functions";
import { liste_de_classe } from '../../../../../actions/Planning&Notes/cahier_de_texte_services';
// import { XYPlot, LineSeries } from 'react-vis';
// import LineChart from "../../../../../components/Planning&Notes/cahier_de_texte_components/line_chart";
import {
    CCard,
    CCardBody,
    CCardGroup,
    CCardHeader
} from '@coreui/react'
import {
    CChartBar,
    CChartLine,
    CChartDoughnut,
    CChartRadar,
    CChartPie,
    CChartPolarArea
} from '@coreui/react-chartjs'

// Redux
import { connect } from "react-redux";

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

function CahierCours(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    let { id_progression } = useParams();

    const [progression, setProgressionState] = React.useState([]);
    const [seances, setSeancesState] = React.useState([]);
    const [loading, setLoadingState] = React.useState(true);
    const [eleves, setElevesState] = React.useState([])
    const [cours, setCoursState] = React.useState({});
    const [absences, setAbsencesState] = React.useState([]);
    React.useEffect(async () => {
        await loadSeance(id_progression).then(response => {
            const prog = response.splice(0, 1)[0];
            setProgressionState(prog);
            setSeancesState(response);
            const i = 0;

            var absences = response.map((seance) => {
                const absents = seance.cahierSeance.absents.split(",") ?? [];
                return {
                    x: `S${i}`,
                    y: absents.length
                }
            });
            setAbsencesState(absences);
            console.log(absences);
            return prog;

        }).then(progress => {
            setCoursState(progress.cours);
            return progress.classe;
        }).then(async (classe) => {
            await liste_de_classe(classe.niveau, classe.departement).then(response => {
                setElevesState(response);
                setLoadingState(false);
            });
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
                                {cours.nom[0].toUpperCase()}
                            </Avatar>
                        }

                        title={cours.nom}
                        subheader={`Maquette ${cours.ue.classe}-${cours.ue.departement} / ${cours.ue.nom}`}
                    />

                    <CardContent>
                        <Grid container spacing={4}>
                            <Grid item sm={3}>
                                <Typography variant="body2" color="textSecondary" component="p">Nombre d'heures : {cours.CM + cours.TD_TP} heures</Typography>
                                <Typography variant="body2" color="textSecondary" component="p">Nombre d'heures exécutées : {progression.nbHeuresExecutees} heures</Typography>
                                <Typography variant="body2" color="textSecondary" component="p">Date de début du cours : {progression.dateDebut}</Typography>
                                <Typography variant="body2" color="textSecondary" component="p">Etat : {progression.dateFin == null ? "En cours" : "Fini le " + progression.dateFin}</Typography>
                            </Grid>
                            <Grid item sm={3}>
                                <CircularProgress size={80} value={progression.nbHeuresExecutees * 100 / (cours.CM + cours.TD_TP)} />
                            </Grid>
                            <Grid item sm={6}>
                                <CCard>
                                    <CCardHeader>
                                        Taux de suivi du cours
                                    </CCardHeader>
                                    <CCardBody>
                                        <CChartLine
                                            datasets={[
                                                {
                                                    label: 'Absences',
                                                    backgroundColor: 'rgb(0,216,255,0.9)',
                                                    data: absences.map(absence => absence.y)
                                                }
                                            ]}
                                            options={{
                                                tooltips: {
                                                    enabled: true
                                                }
                                            }}
                                            labels="Absences"
                                        />
                                    </CCardBody>
                                </CCard>
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
                                    return (
                                        <>
                                            <Paper key={index} style={{ backgroundColor: "#2699FB", margin: 20, paddingTop: 20 }}>
                                                <Typography style={{ color: "white", marginTop: 15, marginLeft: 15 }} variant="body2" color="textSecondary" component="p">Seance du {seance.cahierSeance.dateSeance}</Typography>
                                                <Typography style={{ color: "white", marginTop: 10, marginLeft: 15 }} variant="body2" color="textSecondary" component="p">{seance.info_prof}</Typography>
                                                <Typography style={{ color: "white", marginTop: 10, marginLeft: 15 }} variant="body2" color="textSecondary" component="p">Nombre d'heures : {seance.duree}</Typography>
                                                <Typography style={{ color: "white", marginTop: 10, marginLeft: 15 }} variant="body2" color="textSecondary" component="p">De {seance.heureDebut} heures à {seance.heureDebut + seance.duree} heures</Typography>
                                                <Typography style={{ color: "white", marginTop: 10, marginLeft: 15 }} variant="body2" color="textSecondary" component="p">Signé : {seance.cahierSeance.isValide ? "Oui" : "Non"}</Typography>
                                                <Grid container spacing={4} >
                                                    <Grid item sm={7}>
                                                        <Paper>
                                                            {/* <div style={{ borderStyle: "solid", borderWidth: 2, borderColor: "gray", backgroundColor: "white", borderRadius: 5, marginTop: 15, marginLeft: 15, padding: 20 }}> */}
                                                            <Editor readOnly={true} defaultValue={seance.cahierSeance.contenu} />
                                                            {/* </div> */}
                                                        </Paper>
                                                    </Grid>
                                                    <Grid item sm={5}>
                                                        <h4 style={{ color: "white" }}>LISTE DES ABSENTS ({absents.length})</h4>

                                                        {absents.length == 0 ?
                                                            <Typography key={index} style={{ color: "white" }} variant="body2" color="textPrimary" component="p">Pas d'absents.</Typography>
                                                            :
                                                            absents.map(
                                                                (element, index) => {
                                                                    const eleve = getStudentFromId(eleves, parseInt(element));
                                                                    {/* console.log(eleve); */ }
                                                                    return <Typography key={index} style={{ color: "white" }} variant="body2" color="textPrimary" component="p">{eleve.user.first_name + " " + eleve.user.last_name}</Typography>
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
const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps, null)(CahierCours)
