import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ProgressionBox from '../../../../../components/Planning&Notes/cahier_de_texte_components/progression_box';
import { loadProgressionsProf } from "../../../../../actions/Planning&Notes/cahier_de_texte_services";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';


// Some styling
const blueColor = "#2699FB";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        // width: "70%"
    },
    form: {
        '& > *': {
            margin: theme.spacing(1),
            // width: '25ch',
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
        textAlign: 'start',
    }
}));


function ListeCours(props) {
    const classes = useStyles();
    const [progressions, setProgressionState] = React.useState([]);
    const [loading, setLoadingState] = React.useState(true);
    const reloadComponent = () => setLoadingState(true);
    const [role] = React.useState(() => {
        var current_role = null;
        props.auth.user.CurrentRoles.map(role => {
            // console.log(role)
            if (role.role_type == "ENSEIGNANT") {
                return current_role = {
                    type: role.role_type,
                    id: role.id
                };
            }

        })
        return current_role;
    })

    React.useEffect(async () => {
        await loadProgressionsProf(role.id).then(response => {
            setProgressionState(response);
            setLoadingState(false);
        });
    }, [loading]);
    return (
        <div className={classes.root} style={{ alignContent: "center" }}>
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
                progressions.length == 0 ?
                    <Typography variant="body1" color="textSecondary" component="p">Pas de cours disponible actuellement.</Typography>
                    :
                    <div>

                        <Typography variant="body1" color="textSecondary" component="p">Veuillez choisir le cours.</Typography><br></br>

                        <Paper className={classes.paper}>


                            <Grid container spacing={3} style={{ margin: 2 }}>

                                {progressions.map((progression, index) =>
                                    <Grid item xs={4} key={index}>
                                        <ProgressionBox reloadComponent={reloadComponent} progression={progression} printProf={false} noter={true} ></ProgressionBox>
                                    </Grid>
                                )}
                            </Grid>
                        </Paper>
                    </div>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(ListeCours)