import React from 'react';
import AddEC_UE from './views/ma_classe/AddEC_UE';
const Dashboard = React.lazy(() => import('./views/Dashboard'));
/********** Pedagogie *********/
const Enseignant = React.lazy(() => import('./views/gestionEnseignants/ListeEnseignants'));
// const DetailsCoursVirtuels = React.lazy(() => import('./views/DetailsCoursVirtuels'));
const Maquette = React.lazy(() => import('./views/ma_classe/Maquette'));
const AddCourse = React.lazy(() => import('./views/ma_classe/Cours/AddCourse'));
const ClasseVirtuelle = React.lazy(() => import('./views/ma_classe/ClasseVirtuelle'));

/********** END Pedagogie *********/


const routes = [
    { path: '/chef-departement', exact: true, name: 'Chef Departement'},
    { path: '/chef-departement/dashboard', name: 'Dashboard', component: Dashboard},
     
    
    // Pedagogie
    { path: '/chef-departement/gestionEnseignants', name: 'Dashboard', component: Enseignant},
    { path:'/chef-departement/maquette', name:"Maquette",component:Maquette},
    { path: '/chef-departement/classe/virtuelle', name:"Classe Virtuelle", component:ClasseVirtuelle},
    { path:'/chef-departement/AddEC_UE', name:"AddEC_UE",component: AddEC_UE},
    { path:'/chef-departement/AddCourse', name:"Nouveau Cours",component: AddCourse},
    
     //End Pedagogie


]    

export default routes;