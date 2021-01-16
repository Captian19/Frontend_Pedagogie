import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import '../../../assets/Planning&Notes/css/App.css';

const useStyles = makeStyles((theme) => ({
    root: {
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

export default function NoteEleveViewer(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    var dict = {}
    dict["noeee  ee"] = 333
    console.log(dict);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Grid item xm={6} sm={3}>

            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {props.note.progression.cours.libelle[0]}
                        </Avatar>
                    }

                    title={props.note.progression.cours.libelle}
                    subheader={props.note.progression.prof}
                />

                <CardContent>
                    {JSON.parse(props.note.notes).map(
                        (note_partie, index) => (
                            <Typography key={index} variant="body2" color="textSecondary" component="p" align="center">
                                {note_partie.type_evaluation + " : " + note_partie.note}
                            </Typography>
                        )
                    )}

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
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Statistiques de la note</Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </Grid>
    );
}