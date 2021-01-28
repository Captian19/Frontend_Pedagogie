import React, { useState, useEffect} from 'react';
import axios from 'axios'
import {  useParams } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";

import {connect} from 'react-redux';


import Stages from './entGenieClasse';

const getBadge = partenaire => {
    switch (partenaire) {
        case true: return 'success'
        case false: return 'warning'
        default: return 'danger'
    } 
}

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const fields = ['nom_entreprise', 'domaine','classe_stage','telephone_entreprise','lien_page']


const correspondance_genie = {
    "GIT": "Informatique et Télécommunications",
    "GC": "Génie Civil",
    "GEM": "Electro-Mecanique",
    "GAR": "Aéronautique"
};



function Tableau (props){
    
    //donnees {classe et genie} de l'etudiant
    const [etudiant, setEtudiant] = useState({}); 
    
    //id est defini dans le dossier 'Constants'
    // const {id} = useParams()
    
    

    useEffect(()=>{
       // refreshEtudiant()
    },[])
   

    // recevoir les donnees relatives à l'etudiant depuis l'api
    //inutile pour l'instant
    const refreshEtudiant = () => {
        axios.get(`http://localhost:8000/api/stage/entreprises/${props.id || 8}/offres/`)
            .then(res => {
                setEtudiant(res.data) 
                console.log(res.data)
            }) 
           
    }

    return (

        <div>
            {props.role ? 
            <Stages
            classe={props.role.classe}
            genie={correspondance_genie[`${props.role.departement}`]}
            fields = {fields}
            />:
            <div className="sweet-loading">
                    <ClipLoader
                        css={override}
                        size={100}
                        color={"#123abc"}
                        loading={props.role}
                    />
            </div>
            }
            
        </div>
    )

}



const MapToState = state =>({
    role: state.auth.user.CurrentRoles[0]
})




export default connect(MapToState, null)(Tableau);