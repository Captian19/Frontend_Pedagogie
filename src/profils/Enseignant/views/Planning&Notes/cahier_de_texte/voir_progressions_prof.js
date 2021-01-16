import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ProgressionBox from '../../../../../components/Planning&Notes/cahier_de_texte_components/progression_box';
import { loadProgressions, loadProgressionsProf } from "../../../../../actions/Planning&Notes/cahier_de_texte_services";
import { id_classe } from "../../../../../constants/Planning&Notes/constants";
import { loadCourses } from "../../../../../actions/Planning&Notes/planning_functions";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";

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


export default function Progressions(props) {
    const classes = useStyles();
    const [progressions, setProgressionState] = React.useState([]);
    const [loading, setLoadingState] = React.useState(true);


    React.useEffect(() => {
        loadProgressionsProf(id_classe).then(response => {
            setProgressionState(response);
            setLoadingState(false);

        });


    }, []);
    return (
        <div className={classes.root} style={{ alignContent: "center" }}>
            {loading?
                <div className="sweet-loading">
                    <ClipLoader
                        css={override}
                        size={150}
                        color={"#123abc"}
                        loading={loading}
                    />
                </div>
                :
                <Grid container spacing={3} style={{margin: 2}}>
                    {progressions.map((progression, index) => 
                        <Grid item xs={4} key={index}>
                            <ProgressionBox progression={progression} printProf={false}></ProgressionBox>
                        </Grid>
                       )}
                </Grid>
            }


        </div>
    )


}