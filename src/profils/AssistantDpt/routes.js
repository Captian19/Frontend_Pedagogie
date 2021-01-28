import React from 'react';

// Assistant de departement
import VoirAbsences from './views/Planning&Notes/cahier_de_texte/voir_absences';
import ListeDeClasse from './views/Planning&Notes/cahier_de_texte/liste_classe';

import ListeDeClasseResultatsAnnuels from '../Scolarite/views/Plannings&Notes/gestion_notes/voir_classe_resultats_annuels';
import VoirResultAnnuelEleve from '../Etudiant/views/Planning&Notes/gestion_notes/mes_bulletins';
import ListeDesClassesEntrerNote from "./views/Planning&Notes/gestion_notes/liste_des_classes";
import VoirProgressionsClasse from "./views/Planning&Notes/cahier_de_texte/voir_progressions_classe";

import EntrerNote from "../Enseignant/views/Planning&Notes/gestion_notes/entrer_notes";

import PlanningsDepartement from "./views/Planning&Notes/planning/plannings_departement";

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Profile = React.lazy(() => import('../../components/auth/Profile'));
const ChangePassword = React.lazy(() => import('./../../components/auth/ChangePassword'));
const Vacataire = React.lazy(() => import('./views/gestionEnseignants/Liste_vacataires'));
const Maquette = React.lazy(() => import('./views/ma_classe/Maquette'));
const AddEC = React.lazy(() => import('./views/ma_classe/AddEC'));
const AddCourse = React.lazy(() => import('./views/ma_classe/Cours/AddCourse'));
const AddUE = React.lazy(() => import('./views/ma_classe/AddUE'));
const ClasseVirtuelle = React.lazy(() => import('./views/ma_classe/ClasseVirtuelle'));
const ListCourse = React.lazy(() => import('./views/ma_classe/Cours/ListCourse'));

// </Fin Assistant de département>

const routes = [
    { path: '/assistant-departement', exact: true, name: 'AssistantDpt'},
    { path: '/assistant-departement/dashboard', name: 'Dashboard', component: Dashboard},
    { path: '/assistant-departement/profil',name:'Mon profil',component:Profile},
    { path: '/assistant-departement/changer-de-mot-de-passe',exact:true,name:'changerMotDePasse',component:ChangePassword},

    // Pedagogie
    { path:'/assistant-departement/maquette', name:"Maquette",component:Maquette},
    { path:'/assistant-departement/Vacataires', name:"Vacataire",component: Vacataire},
    { path: '/assistant-departement/classe/virtuelle', name:"Classe Virtuelle", component:ClasseVirtuelle},
    { path:'/assistant-departement/AddEC', name:"AddEC",component: AddEC},
    { path:'/assistant-departement/AddUE', name:"AddUE",component: AddUE},
    { path:'/assistant-departement/AddCourse', name:"Nouveau Cours",component: AddCourse},
    { path:'/assistant-departement/ListCourse', name:"ListCourse",component: ListCourse},
    
    //End Pedagogie
    // Gestion des Planning & Notes
    // Added by Ali
    // Pour l'assistant de département
    { path: '/assistant-departement/liste-de-classe/', name: "Progressions Classe", component: ListeDeClasse },
    { path: '/assistant-departement/voir-absences-eleve/:niveau/:departement/:id_eleve', name: "Voir absences", component: VoirAbsences },

    { path: '/assistant-departement/voir-resultats-annuels', name: "Résultats Annuels", component: ListeDeClasseResultatsAnnuels },
    { path: '/assistant-departement/voir-resultats-annuels-eleve/:eleve/:user', name: "Résultat annuels", component: VoirResultAnnuelEleve },

    { path: '/assistant-departement/liste-des-classes', name: "Enter Note", component: ListeDesClassesEntrerNote },
    { path: '/assistant-departement/voir-progressions-classe/:niveau/:departement', name: "Progression des cours", component: VoirProgressionsClasse },
    { path: '/assistant-departement/entrer-notes-progression/:id_progression', name: "Entrer Note", component: EntrerNote },

    { path: '/assistant-departement/plannings-departement/', name: "Plannings", component: PlanningsDepartement },
]    

export default routes;