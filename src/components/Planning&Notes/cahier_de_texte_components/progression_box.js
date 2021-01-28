import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import VisibilityIcon from '@material-ui/icons/Visibility';
import LinearProgress from '@material-ui/core/LinearProgress';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Edit from "@material-ui/icons/Edit";
import Hand from "@material-ui/icons/PanTool";
import { getUserRoleById, updateProgression } from '../../../actions/Planning&Notes/cahier_de_texte_services';
import LoadingSpinner from '../loading_spinner';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    box: {
        // maxWidth: 345,
        minWidth: 345,
        height: 300


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
    button: {
        margin: theme.spacing(1),
    },
}));

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 10,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#1a90ff',
    },
}))(LinearProgress);


function ProgressionBox(props) {
    /**
     * A box containing some informations about the course.
     * We will hit the box to access to the cahier cours
     */

    const classes = useStyles();
    const progression = props.progression;
    const cours = props.progression.cours;
    const [prof, setProfState] = React.useState({});
    const [loading_prof, setLoadingProfState] = React.useState(true);
    
    const [role] = React.useState(() => {
        var current_role = null;
        props.auth.user.CurrentRoles.map(role => {
            // console.log(role)
            if (role.role_type === "ENSEIGNANT" || role.role_type === "ASSISTANT_CHEF_DEPARTEMENT") {
                current_role = role;
            }

        })
        return current_role;
    })
    const hand_handler = async () => {
        var new_progression = progression;
        var status = 400;
        new_progression.passer_la_main = !new_progression.passer_la_main;
        window.confirm(`Voulez vous réellement ${progression.passer_la_main ? "retirer" : "passer"} la main à l'assitant de départment pour le remplissage des notes ?`) ? await updateProgression(progression._id, new_progression) : console.log("");
        props.reloadComponent();
    }
    React.useEffect(async () => {
        const user = await getUserRoleById(props.progression.prof);
        setProfState(user);
        setLoadingProfState(false);
    }, [])
    return (
        <Card className={classes.root}>
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
                {props.printProf ?
                    loading_prof ?
                        <LoadingSpinner loading={loading_prof} size={20} />
                        :
                        <Typography variant="body2" color="textSecondary" component="p">{`${prof.user.first_name} ${prof.user.last_name}`}</Typography>
                    :
                    null

                }
                <Typography variant="body2" color="textSecondary" component="p">Nombre d'heures : {cours.CM + cours.TD_TP} heures</Typography>
                <Typography variant="body2" color="textSecondary" component="p">Nombre d'heures exécutées : {progression.nbHeuresExecutees} heures</Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: 10 }}>
                    <BorderLinearProgress variant="determinate" value={progression.nbHeuresExecutees * 100 / (cours.CM + cours.TD_TP)} />
                </Typography>
            </CardContent>
            { props.noter == true ?
                <CardActions disableSpacing>
                    <Link to={`/${role.role_type === "ENSEIGNANT" ? "enseignant" : "assistant-departement"}/entrer-notes/${progression._id}`}>
                        <Button className={classes.button} startIcon={<Edit />} color="primary" >
                            noter
                        </Button>
                    </Link>
                    {role.id == progression.prof ?
                        <Button className={classes.button} startIcon={<Hand />} color="secondary" onClick={hand_handler} >
                            {progression.passer_la_main == true ? "retirer la main" : "passer la main"}
                        </Button>
                        :
                        null
                    }
                </CardActions>
                :
                <CardActions disableSpacing>
                    {
                        progression.prof === props.id_prof ?
                            <Link to={"/enseignant/entrer-notes/" + progression._id}>
                                <IconButton aria-label="add to favorites">
                                    <EditIcon />
                                </IconButton>
                            </Link>
                            :
                            null
                    }

                    <Link to={props.printProf && props.role != "CHEF_DE_DEPARTEMENT" && props.role != "DIRECTEUR_DES_ETUDES" ? "/etudiant/voir-cahier-cours/" + progression._id : "/enseignant/voir-cahier-cours/" + progression._id}>
                        <IconButton
                            aria-label="show more"
                        >
                            <VisibilityIcon />
                        </IconButton>
                    </Link>
                </CardActions>
            }
        </Card>
    );
}
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(ProgressionBox)