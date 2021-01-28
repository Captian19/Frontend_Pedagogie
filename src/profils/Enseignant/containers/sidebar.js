import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";

import { connect } from "react-redux";

// sidebar nav config
import navigation from "./menu";
import rex from "./rex";
import immersion from "./immersion";
import pfe from "./pfe";
import concours from "./concours"
import { res_peda_planning_notes_menu, de_chef_deptmt_planning_notes_menu } from "../views/Planning&Notes/menu";
import {get_Correcteurs} from "../../../actions/moduleConcours/action_Correcteur";
import photo from "./../../../assets/img/ent5.png";
import photo2 from "./../../../assets/img/ent_mini.png";

const Sidebar = (props) => {
  const [isCorrecteur, setBoolean] = useState(false);
  const dispatch = useDispatch();
  const show = useSelector((state) => state.layout.sidebarShow);
  const guessIfCorrescteur = () => {
    props.get_Correcteurs().then(res => {
      let list_id = res.data.results.map(correcteur => correcteur.id_correcteur);
        setBoolean(list_id.includes(String(props.user.id)))
      console.log(list_id.includes(String(props.user.id)));

    }).catch(e => console.log(e));
  }
  useEffect( ()=> {
    guessIfCorrescteur();
  }, [])
  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <img src={photo} className="c-sidebar-brand-full" />
        <img src={photo2} className="c-sidebar-brand-minimized img-fluid" />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
        {props.role.find(
          (role) =>
            role.role_type === "RESPONSABLE_PEDAGOGIQUE"
        ) && (
          <CCreateElement
            items={res_peda_planning_notes_menu}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle,
            }}
          />
        )}
        {props.role.find(
          (role) =>
            role.role_type === "DIRECTEUR_DES_ETUDES" || role.role_type === "CHEF_DE_DEPARTEMENT"
        ) && (
          <CCreateElement
            items={de_chef_deptmt_planning_notes_menu}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle,
            }}
          />
        )}
        {props.role.find(
          (role) =>
            (role.role_type === "CHEF_DE_DEPARTEMENT" || role.role_type === "ASSISTANT_CHEF_DE_DEPARTEMENT") &&
            role.departement == "GIT"
        ) && (
          <CCreateElement
            items={immersion}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle,
            }}
          />
        )}

        {props.role.find(
          (role) =>
            (role.role_type === "RESPONSABLE_REX" ||
              role.role_type === "CHEF_DE_DEPARTEMENT") &&
            role.departement != "GIT"
        ) && (
          <CCreateElement
            items={rex}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle,
            }}
          />
        )}

        {props.role.find(
          (role) =>
            role.role_type === "RESPONSABLE_PFE" ||
            role.role_type === "CHEF_DE_DEPARTEMENT" ||
            role.role_type === "DIRECTEUR_DES_ETUDES" ||
            role.role_type == "DIRECTEUR_DE_L_ECOLE"
        ) && (
          <CCreateElement
            items={pfe}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle,
            }}
          />
        )}

        {/*Gestion du concours*/}
        {isCorrecteur && (
          <CCreateElement
            items={concours}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle,
            }}
          />
        )}

      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

const MapToState = (state) => ({
  role: state.auth.user.CurrentRoles,
  user: state.auth.user
});

export default connect(MapToState, {get_Correcteurs})(Sidebar);
