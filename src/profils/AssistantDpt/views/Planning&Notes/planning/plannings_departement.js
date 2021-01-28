import React from 'react';
import { useState, useEffect } from "react";
import { loadPlanningsClasse } from "../../../../../actions/Planning&Notes/planning_services";
import LoadingSpinner from "../../../../../components/Planning&Notes/loading_spinner";
import Typography from '@material-ui/core/Typography';
import VoirPlanning from "../../../../Enseignant/views/Planning&Notes/planning/voir_planning";
// Reducer
import { connect } from "react-redux";

function VoirMesPlanning(props) {

    const [plannings, setPlanningsState] = useState([]);
    const [loading, setLoadingState] = useState(true);

    const [role] = React.useState(() => {
        var current_role = null;
        props.auth.user.CurrentRoles.map(role => {
            // console.log(role)
            if (role.role_type == "ASSISTANT_CHEF_DEPARTEMENT") {
                current_role = role;
            }
        });
        return current_role;
    });
    console.log(props.auth);
    useEffect(async () => {
        try {
            await loadPlanningsClasse("ALL", role.departement, role.annee).then(plannings => {
                setPlanningsState(plannings);
                setLoadingState(false);
            })
        }catch(e){
            console.log(e);
            setLoadingState(false);
        
        }
    }, [])

    return (
        loading ? <LoadingSpinner loading={loading} />
            :
            plannings.length == 0 ?
                <Typography variant="body1" color="textSecondary" component="p" align="center">Vous n'avez pas de planning pour l'instant</Typography>
                :
                plannings.map(planning => {
                    return (
                        <VoirPlanning planning={planning} enseignant={false} is_res_peda={false} niveau={role.niveau ?? null} departement={role.departement ?? null} />
                    )
                })
                
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(VoirMesPlanning)