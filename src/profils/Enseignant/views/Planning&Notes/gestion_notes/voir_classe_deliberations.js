import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { loadClasses } from '../../../../../actions/Planning&Notes/gestion_notes_services';
import LoadingSpinner from '../../../../../components/Planning&Notes/loading_spinner';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function ClassesList(props) {
    const styles = useStyles();
    const [classes, setClassesState] = React.useState([])
    const [loading, setLoadingState] = React.useState(true)
    const [role] = React.useState(() => {
        var current_role = null;
        props.auth.user.CurrentRoles.map(role => {
            // console.log(role)
            if (role.role_type == "DIRECTEUR_DES_ETUDES") {
                return current_role = {
                    type: role.role_type,
                    id: role.id,
                    departement: "all"
                };
            }
            else if (role.role_type == "CHEF_DE_DEPARTEMENT") {
                return current_role = {
                    type: role.role_type,
                    id: role.id,
                    departement: role.departement
                };
            }
            else if (role.role_type == "ENSEIGNANT") {
                return current_role = {
                    type: role.role_type,
                    id: role.id,
                    departement: role.departement
                };
            }

        })
        return current_role;
    })
    React.useEffect(async () => {
        await loadClasses(role.departement).then(classes => {
            setClassesState(classes);
            setLoadingState(false);
        })
    }, [])
    return (
        loading ? <LoadingSpinner loading={loading} /> :
            classes.length > 0 ?
                <div className={styles.root}>
                    <Grid container spacing={3}>
                        {classes.map((classe, index) =>
                            <Grid item xs={3} key={index}>
                                <Link to={"/enseignant/voir-tableau-semestriel/" + classe._id}>
                                    <Paper className={styles.paper}>{`${classe.niveau} - ${classe.departement}`}</Paper>
                                </Link>
                            </Grid>
                        )}
                    </Grid>
                </div>
                :
                <Typography variant="body2" component="p" >Pas de classe disponible.</Typography>
    );
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(ClassesList)