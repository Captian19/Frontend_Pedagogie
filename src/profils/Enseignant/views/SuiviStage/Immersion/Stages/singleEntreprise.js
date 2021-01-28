import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import {connect} from 'react-redux';

import { CCard, CCardBody, CCardFooter, CCol, CRow } from "@coreui/react";

import { Detail, Stage } from "./detailEntreprise";

import FormulaireStage from "./AjouterStage/formAddStage";




function Single(props) {
  let history = useHistory();

  const [reload, setReload] = useState(false);
  useEffect(() => {
    refreshLists();
    getListUser();
    console.log(props.all_role);
  }, [reload]);

  function refreshPage(e) {
    setReload(!reload);
    // window.location.reload(false);
  }

  const [detail, setDetail] = useState({});
  const refreshLists = () => {
    axios
      .get(
        `http://localhost:8000/api/stage/entreprises/${props.match.params.slug}/stages/`
      )
      .then((res) => {
        setDetail(res.data);
      })
      .catch((err) => console.log(err));
  };

  const [cbon, setCbon] = useState(false);
  const [user, setUser] = useState([]);
  const getListUser = () => {
    axios
      .get(`http://users-ent.herokuapp.com/api/auth/ETUDIANT/GIT/`)
      .then((res) => {
        //console.log(res.data)
        setUser(res.data);
        setCbon(true);
      })
      .catch((e) => console.log(e));
  };

  const desactiverEntreprise = (e) => {
    let confirmer = window.confirm("Changer l'activité de cette entreprise ?");
    if (confirmer) {
      axios
        .put(
          `http://localhost:8000/api/stage/entreprises/${props.match.params.slug}/desactiver/`
        )
        .then(() => {
          alert("CHANGEMENT REUSSI");
          return history.push("/enseignant/immersion");
        })
        .catch((err) => console.log(err));
    } else {
      return null;
    }
  };

  return (
    <CCard>
      <CCardBody>
        <CRow>
          {detail && cbon && (
            <CCol sm="12">
              <Detail
                nom_entreprise={detail.nom_entreprise}
                type_stage={detail.type_stage}
                adresse={detail.adresse_entreprise}
                telephone_entreprise={detail.telephone_entreprise}
                slug={props.match.params.slug}
                actif={detail.actif && (props.role == "ENSEIGNANT" || props.role == "CHEF_DE_DEPARTEMENT") }
                desactiver={(e) => desactiverEntreprise()}
              />

              <h4 style={{ marginBottom: "2em", marginTop: "3em" }}>
                {" "}
                {detail.stages && detail["stages"].length} Stages
              </h4>

              <>
                {detail.stages ? (
                  <CRow style={{ marginTop: "2em" }}>
                    {detail["stages"].map((stage) => {
                      let eleve = user.filter(
                        (el) => el.id == stage.stagiaire
                      )[0];

                      return (
                        <Stage
                          nom={stage.stagiaire && eleve.user.last_name}
                          prenom={stage.stagiaire && eleve.user.first_name}
                          classe={stage.stagiaire && eleve.classe}
                          genie={stage.stagiaire && eleve.departement}
                          numero={stage.id}
                          slug={props.match.params.slug}
                          debut_stage={stage.date_debut_stage}
                          fin_stage={stage.date_fin_stage}
                        />
                      );
                    })}
                  </CRow>
                ) : (
                  <h1 className="text-center">Aucun Stagiaire</h1>
                )}
              </>
            </CCol>
          )}
        </CRow>
      </CCardBody>

      <CCardFooter>
        {detail.actif && (
          <FormulaireStage
            slug={props.match.params.slug}
            entreprise={detail.nom_entreprise}
            clickLoad={(e) => refreshPage()}
          />
        )}
      </CCardFooter>
    </CCard>
  );
}

const MapToState = state =>({
    role: state.auth.user.CurrentRoles[0].role_type,
    all_role: state.auth.user.CurrentRoles
})

export default connect(MapToState, null)(Single);