import React from 'react';
import planning_notes_routes from './views/Planning&Notes/routes';

//Pedagogie
const MesCours = React.lazy(() => import('./views/ClasseVirtuelle/Cours/mesCours'));
const DetailCours = React.lazy(() => import('./views/ClasseVirtuelle/Cours/detailCours'));
//End Pedagogie

// Concours
import View_Notes from "./views/moduleConcours/view_notes";    

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const ChangePassword = React.lazy(() => import('./../../components/auth/ChangePassword'));

//Suivi Stage
const Autre = React.lazy(() => import("./views/SuiviStage/Entreprises/entreprise"));
const Single = React.lazy(() => import("./views/SuiviStage/Stages/singleEntreprise"));
const Profile = React.lazy(() => import('../../components/auth/Profile'));
const EditStage = React.lazy(() => import("./views/SuiviStage/Stages/singleStageEdit"));
//Immersion
const Immersion = React.lazy(() => import("./views/SuiviStage/Immersion/entreprises"));
const Entreprise = React.lazy(() => import("./views/SuiviStage/Immersion/Stages/singleEntreprise"));
const DetailStagiaire = React.lazy(() => import("./views/SuiviStage/Immersion/Stages/singleStageEdit"));
const Stagiaires = React.lazy(() => import("./views/SuiviStage/Immersion/Stagiaires/stagiaires"));
const Formulaire = React.lazy(() => import("./views/SuiviStage/Immersion/Stagiaires/formulaire_note"));
const Maitre = React.lazy(() => import("./views/SuiviStage/Immersion/Maitre/toutmaitre"));
const PostulantsImmersion = React.lazy(() => import("./views/SuiviStage/Immersion/Stages/AjouterStage/Postulants/postulant"));
const PostulantEntreprises = React.lazy(() => import("./views/SuiviStage/Stages/AjouterStage/Postulants/postulant"));

//PFE
const PFEDept = React.lazy(() => import("./views/Pfe/pfes_dept"));
const PFEpostulants = React.lazy(() => import("./views/Pfe/pfe_postulants"));

const routes = [
    { path: '/enseignant', exact: true, name: 'Enseignant'},
    { path: '/enseignant/dashboard', name: 'Dashboard', component: Dashboard },
    
    ...planning_notes_routes,
    
    // routes Suive Stage 
    { path: '/enseignant/entreprises', exact:true, name: 'Stages', component: Autre },
    { path: '/enseignant/entreprises/single/:slug',exact:true ,name: `Single`, component: Single },
    { path: '/enseignant/entreprises/single/:slug/stage/edit/:id_stage', name: `Single_Stage`, component: EditStage },
    { path: '/enseignant/entreprises/single/:slug/postulants',exact:true ,name: `Postulants`, component: PostulantEntreprises },
    //routes Immersion
    { path: '/enseignant/immersion', exact:true, name: `Immersion`, component: Immersion },
    { path: '/enseignant/immersion/single/:slug',exact:true ,name: `Entreprise`, component: Entreprise },
    { path: '/enseignant/immersion/single/:slug/postulants',exact:true ,name: `Postulants`, component: PostulantsImmersion },
    { path: '/enseignant/immersion/single/:slug/stage/edit/:id_stage', name: `Stagiaire`, component: DetailStagiaire },
    { path: '/enseignant/immersion/stagiaires', exact:true,name: `Stagiaires`, component: Stagiaires },
    { path: '/enseignant/immersion/stagiaires/formulaire', name: `Formulaire`, component: Formulaire },
    { path: '/enseignant/immersion/maitre', name: `Maitre`, component: Maitre },


    // routes pfes
    { path: '/enseignant/pfes', exact:true, name: 'PFE', component: PFEDept },
    { path: '/enseignant/pfes/postulants/:pfe_id', exact:true, name: 'Postulants', component: PFEpostulants },


    // routes corrections des copies (concours)
    { path: '/enseignant/concours/note_concours', name: "Ajout Des Notes", component: View_Notes},

    // Page Profil
    { path: '/enseignant/profil', name:'Mon profil', component: Profile},
    { path: '/enseignant/changer-de-mot-de-passe',exact:true,name:'changerMotDePasse',component:ChangePassword},

    // Pedagogie
    { path: '/enseignant/ClasseVirtuelle/mesCours', name: 'MesCours', component: MesCours},
    { path: '/enseignant/ClasseVirtuelle/detailCours/**', name: 'DetailCours', component: DetailCours}, 

     // End Pedagogie
]  

export default routes;