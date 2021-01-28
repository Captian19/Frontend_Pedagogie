import React from 'react';
import '../../../../../assets/Planning&Notes/css/App.css';
import { makeStyles } from '@material-ui/core/styles';
import { getCourseFromId } from "../../../../../actions/Planning&Notes/cahier_de_texte_functions";
import { anulerAbsenceEleve, getUserRoleById } from "../../../../../actions/Planning&Notes/cahier_de_texte_services";
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
import { Grid } from '@material-ui/core';
import { loadCourses, loadSeanceAbsents } from "../../../../../actions/Planning&Notes/planning_functions";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import CircularProgressExtended from "../../../../../components/Planning&Notes/cahier_de_texte_components/circular_progress_extended";
// Buttons and Icons
import DeleteIcon from '@material-ui/icons/DeleteOutline';
// Reducer
import { connect } from "react-redux";
import { useParams } from 'react-router-dom';

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
    // For the CARD
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));


function VoirAbsences(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const annee = props.auth.user.CurrentRoles[0].annee;
    const [seances, setSeancesState] = React.useState([]);
    const [courses, setCoursesState] = React.useState([]);
    const [nbAbsences, setNbAbsencesState] = React.useState(0);
    const [nbHeures, setNbHeuresState] = React.useState(0);
    const [loading, setLoadingState] = React.useState(true);
    const [eleve, setEleveState] = React.useState({});
    let { niveau, departement, id_eleve } = useParams();
    const bull = <span className={classes.bullet}>•</span>;

    const annuler_absence = async (id_planning, id_seance) => {
        try {
            await anulerAbsenceEleve(id_planning, id_seance, id_eleve).then((status) => {
                if (status < 400) reload_component();
                else alert("Erreur lors de la suppression");
            })
        } catch (e) {
            alert("Erreur lors de la suppression");
            console.log(e)
        }
    }

    const reload_component = () => setLoadingState(true);

    React.useEffect(async () => {
        if (loading == true)  // We reload the component only when loading is true. 
        // It is for being able to reload the component every time we set loading to true
        // Whithout this trick, the component will reload when loading is set to false
        {
            await loadSeanceAbsents(niveau, departement, id_eleve).then(response => {
                setSeancesState(response);
                setNbAbsencesState(response.length);
                var heures = 0;
                response.map(seance => {
                    heures += seance.cahierSeance.nbHeures;
                });
                setNbHeuresState(heures);
                return response;

            }).then(async () => {
                await loadCourses(niveau, departement).then(res => setCoursesState(res));
            }).then(async ()=> {
                const eleve = await getUserRoleById(id_eleve);
                setEleveState(eleve);
                setLoadingState(false);
            });
        }
    }, [loading]
    );

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
                <React.Fragment>
                    <Typography style={{ marginTop: 5, marginBottom: 7, }} align="center" variant="h5" color="textSecondary" component="p">Les absences de <b>{`${eleve.user.first_name} ${eleve.user.last_name}`}</b>.</Typography>
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    {`${eleve.user.first_name[0]} ${eleve.user.last_name[0]}`}
                                </Avatar>
                            }

                            title={`${eleve.user.first_name} ${eleve.user.last_name}`}
                            subheader={`${niveau}-${departement}`}
                        />

                        <CardContent>
                            <Grid container spacing={4}>
                                <Grid item sm={6}>
                                    <CircularProgressExtended size={80} value={nbAbsences * 10} realvalue={nbAbsences} label="Séances" />
                                </Grid>
                                <Grid item sm={6}>
                                    <CircularProgressExtended size={80} value={nbHeures * 5} realvalue={nbHeures} label="Heures" />
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
                                {seances.length == 0 ?
                                    <Typography style={{ marginTop: 15, marginLeft: 15 }} variant="body1" color="textSecondary" align="center" component="p">Pas d'absences.</Typography>

                                    :
                                    <Grid container spacing={2}>
                                        {seances.map(
                                            (seance, index) => {
                                                return (
                                                    <Grid item xs={12} sm={4} key={index}>
                                                        <Card className={classes.root} variant="elevation">
                                                            <CardContent>
                                                                <Typography className={classes.pos} color="textSecondary">
                                                                    Cours de {getCourseFromId(courses, seance.cours)['nom']}
                                                                </Typography>
                                                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                                    Séance du {seance.cahierSeance.dateSeance}
                                                                </Typography>
                                                                <Typography variant="h6" component="h4">
                                                                    De {bull}{seance.heureDebut} H{bull}à{bull}{seance.heureDebut + seance.duree}H
                                                                </Typography>
                                                                <Typography variant="body2" component="p">
                                                                {`${seance.infos_prof.user.first_name} ${seance.infos_prof.user.last_name}`}
                                                                </Typography>
                                                            </CardContent>
                                                            <CardActions>
                                                                <IconButton onClick={() => window.confirm("Voulez vous vraiment supprimer cette absence ?") ? annuler_absence(seance.id_planning, seance.id) : console.log("")} color="secondary" >
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </CardActions>
                                                        </Card>
                                                    </Grid>
                                                )
                                            }
                                        )}
                                    </Grid>
                                }
                            </CardContent>
                        </Collapse>
                    </Card>
                </React.Fragment>
            }
        </div>
    );
}
const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps, null)(VoirAbsences)
