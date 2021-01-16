import React from 'react';
import '../../../../../assets/Planning&Notes/css/App.css';
import { makeStyles } from '@material-ui/core/styles';
import { getCourseFromId, getStudentFromId } from "../../../../../actions/Planning&Notes/cahier_de_texte_functions";
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
import { loadCourses, loadSeanceAbsents } from "../../../../../actions/Planning&Notes/planning_functions";
import { id_classe } from "../../../../../constants/Planning&Notes/constants";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import draftToMarkdown from 'draftjs-to-markdown';
import CircularProgressExtended from "../../../../../components/Planning&Notes/cahier_de_texte_components/circular_progress_extended";

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


export default function VoirAbsences(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    let { id_eleve } = useParams();

    const [seances, setSeancesState] = React.useState([]);
    const [courses, setCoursesState] = React.useState([]);
    const [nbAbsences, setNbAbsencesState] = React.useState(0);
    const [nbHeures, setNbHeuresState] = React.useState(0);
    const [loading, setLoadingState] = React.useState(true);
    
    React.useEffect(async () => {
        await loadSeanceAbsents(id_classe, id_eleve).then(response => {
            setSeancesState(response);
            setNbAbsencesState(response.length);
            var heures = 0;
            response.map(seance => {
                heures += seance.cahierSeance.nbHeures;
            });
            setNbHeuresState(heures);
            return response;

        }).then(async () => {
            await loadCourses(id_classe).then(res => setCoursesState(res));
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
                                A
                            </Avatar>
                        }

                        title="Alioune Sarr"
                        subheader="DIC1-GIT"
                    />

                    <CardContent>
                        <Grid container spacing={4}>
                            <Grid item sm={6}>
                                <CircularProgressExtended size={80} value={nbAbsences*10} realvalue={nbAbsences} label="Séances" />
                            </Grid>
                            <Grid item sm={6}>
                                <CircularProgressExtended size={80} value={nbHeures*5} realvalue={nbHeures} label="Heures" />
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
                            <Typography style={{marginTop: 15, marginLeft: 15 }} variant="body1" color="textSecondary" align="center" component="p">Pas d'absences.</Typography>

                            :
                            seances.map(
                                (seance, index) => {
                                    return (
                                        <Paper key={index} style={{ backgroundColor: "#2699FB", margin: 20, paddingTop: 20 }}>
                                            <Typography style={{ color: "white", marginTop: 15, marginLeft: 15 }} variant="body2" color="textSecondary" component="p">Cours de {getCourseFromId(courses, seance.cours)['libelle']}</Typography>
                                            <Typography style={{ color: "white", marginTop: 10, marginLeft: 15 }} variant="body2" color="textSecondary" component="p">Du {seance.cahierSeance.dateSeance}</Typography>
                                            <Typography style={{ color: "white", marginTop: 10, marginLeft: 15 }} variant="body2" color="textSecondary" component="p">{seance.prof}</Typography>
                                            <Typography style={{ color: "white", marginTop: 10, marginLeft: 15 }} variant="body2" color="textSecondary" component="p">De {seance.heureDebut} heures à {seance.heureDebut + seance.duree} heures</Typography>
                                            <Grid container spacing={4} >
                                                <Grid item sm={8}>
                                                    <Typography paragraph style={{ backgroundColor: "white", borderRadius: 5, marginTop: 15, marginLeft: 15, padding: 20 }}>
                                                        {draftToMarkdown(convertToRaw(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(seance.cahierSeance.contenu))).getCurrentContent()))}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Paper>
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