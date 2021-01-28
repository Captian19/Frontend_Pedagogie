import React from 'react';
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Enseignant = React.lazy(() => import('./views/gestionEnseignants/ListeEnseignants'));
const Vacataire = React.lazy(() => import('./views/gestionEnseignants/Liste_vacataires'));
const Maquette = React.lazy(() => import('./views/ma_classe/Maquette'));
const AddCourse = React.lazy(() => import('./views/ma_classe/Cours/AddCourse'));
const AddEC = React.lazy(() => import('./views/ma_classe/AddEC'));
const AddUE = React.lazy(() => import('./views/ma_classe/AddUE'));
const ListCourse = React.lazy(() => import('./views/ma_classe/Cours/ListCourse'));

const routes = [
    { path: '/chef-departement', exact: true, name: 'Chef Departement'},
    { path: '/chef-departement/dashboard', name: 'Dashboard', component: Dashboard},

    // Pedagogie
    { path: '/chef-departement/Enseignants', name: 'Dashboard', component: Enseignant},
    { path:'/chef-departement/maquette', name:"Maquette",component:Maquette},
    { path:'/chef-departement/Vacataires', name:"Vacataire",component: Vacataire},
    { path:'/chef-departement/AddEC', name:"AddEC",component: AddEC},
    { path:'/chef-departement/AddUE', name:"AddUE",component: AddUE},
    { path:'/chef-departement/AddCourse', name:"Nouveau Cours",component: AddCourse},
    { path:'/chef-departement/ListCourse', name:"ListCourse",component: ListCourse},
    
     //End Pedagogie
]    

export default routes;