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
import VoirBulletin from './voir_bulletin'

const useStyles = makeStyles((theme) => ({
    root: {
        // minWidth: 700,
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

export default function ResultatCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [resultat] = React.useState(props.resultat);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (

        resultat == null || resultat == undefined ?
            <Typography variant="body2" color="textSecondary" component="p">
                Pas de resultat.
                </Typography>
            :
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {resultat.prenom[0] + resultat.nom[0]}
                        </Avatar>
                    }
                    title={resultat.prenom + " " + resultat.nom}
                    subheader={resultat.classe.niveau + "-" + resultat.classe.departement}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Décision : {resultat.etat ?? "Pas de décision prise pour le moment."}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Moyenne : {parseInt(resultat.moyenne_annuelle) == 0 ? "Non renseignée.": resultat.moyenne_annuelle }
                    </Typography>
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
                        {JSON.parse(resultat.bulletins).map((bulletin, index) =>
                            <VoirBulletin
                                prenom={resultat.prenom}
                                nom={resultat.nom}
                                etat={resultat.etat}
                                moyenne_annuelle={resultat.moyenne_annuelle}
                                rang={resultat.rang}
                                classe={resultat.classe}
                                bulletin={bulletin}
                                annee={resultat.annee}
                                print={props.print}
                                key={index}>
                            </VoirBulletin>
                        )}
                    </CardContent>
                </Collapse>
            </Card>
    );
}
