import React from 'react';
import { useState, useEffect } from "react";
import { loadPlanningsClasse } from "../../../../../actions/Planning&Notes/planning_services";
import LoadingSpinner from "../../../../../components/Planning&Notes/loading_spinner";
import Typography from '@material-ui/core/Typography';
import VoirPlanning from "./voir_planning";
// Reducer
import { connect } from "react-redux";

function VoirMesPlanning(props) {

    const [plannings, setPlanningsState] = useState([]);
    const [loading, setLoadingState] = useState(true);
    const [id_prof] = useState(() => {
        var id = null;
        props.auth.user.CurrentRoles.map(role => {
            if (role.role_type == "ENSEIGNANT") {
                return id = role.id;
            }
        })
        return id;
    });
    const [role] = useState(() => {
        var current_role = {
            is_res_peda: false,
        };
        props.auth.user.CurrentRoles.map(role => {

            if(role.role_type === "RESPONSABLE_PEDAGOGIQUE"){
                current_role["is_res_peda"] = true;
                current_role["niveau"] = role.classe;
                current_role["departement"] = role.departement;
                current_role["annee"] = role.annee;
            }

        })
        return current_role;
    })
    console.log(props.auth);
    useEffect(async () => {
        try {
            await loadPlanningsClasse(role.niveau, role.departement, role.annee).then(plannings => {
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
                        <VoirPlanning planning={planning} enseignant={true} is_res_peda={true} niveau={role.niveau ?? null} departement={role.departement ?? null} />
                    )
                })
                
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(VoirMesPlanning)