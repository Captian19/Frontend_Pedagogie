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

import { Link, Redirect } from 'react-router-dom';

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


export default function ProgressionBox(props) {
    /**
     * A box containing some informations about the course.
     * We will hit the box to access to the cahier cours
     */

    const classes = useStyles();
    const progression = props.progression;
    const cours = props.progression.cours;
    console.log(props.printProf);
    return (
        <Card className="shaking_box">
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
            {props.printProf ? 
                <Typography variant="body2" color="textSecondary" component="p">{progression.prof}</Typography>
                :
                null

            }
                <Typography variant="body2" color="textSecondary" component="p">Nombre d'heures : {cours['chargeHoraire']} heures</Typography>
                <Typography variant="body2" color="textSecondary" component="p">Nombre d'heures exécutées : {progression.nbHeuresExecutees} heures</Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{marginTop:10}}>
                    <BorderLinearProgress variant="determinate" value={progression.nbHeuresExecutees * 100 / cours.chargeHoraire} />
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
            <Link to={ props.printProf ?  "/etudiant/voir-cahier-cours/" + progression._id : "/enseignant/voir-cahier-cours/" + progression._id}>
                <IconButton
                    aria-label="show more"
                >
                    <VisibilityIcon />
                </IconButton>
            </Link>
            </CardActions>
        </Card>
    );
}