import React from 'react';
import planning_notes_routes from './views/Planning&Notes/routes';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Autre = React.lazy(() => import("./views/SuiviStage/Entreprises/entreprise"));
const Single = React.lazy(() => import("./views/SuiviStage/Stages/singleEntreprise"));


//Pedagogie

// const ListeClasse = React.lazy(() => import('./views/ma_classe/ListeClasse')); // pedagogie = ma_classe
//const ClasseVirtuelle = React.lazy(() => import('./views/ma_classe/ClasseVirtuelle'));
const MesCours = React.lazy(() => import('./views/ClasseVirtuelle/Cours/mesCours'));
const DetailCours = React.lazy(() => import('./views/ClasseVirtuelle/Cours/detailCours'));
//End Pedagogie


const routes = [
    { path: '/enseignant', exact: true, name: 'Enseignant'},
    { path: '/enseignant/dashboard', name: 'Dashboard', component: Dashboard },
    
    ...planning_notes_routes,
    // { path: '/enseignant/definirplanning', name: 'Definir', component: DefinirPlanning},

    
     // routes Suive Stage 
    { path: '/enseignant/entreprises', exact:true, name: 'Stages', component: Autre },
    { path: '/enseignant/entreprises/single/:slug', name: `Single`, component: Single },


    { path: '/enseignant/ClasseVirtuelle/mesCours', name: 'MesCours', component: MesCours},
    { path: '/enseignant/ClasseVirtuelle/detailCours/**', name: 'DetailCours', component: DetailCours}, 

     // End Pedagogie
]  

export default routes;