import React from 'react';
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Profile = React.lazy(() => import('../../components/auth/Profile'));
const ChangePassword = React.lazy(() => import('./../../components/auth/ChangePassword'));

/********** Pedagogie *********/
const Enseignant = React.lazy(() => import('./views/gestionEnseignants/ListeEnseignants'));
const Maquette = React.lazy(() => import('./views/ma_classe/Maquette'));
const AddCourse = React.lazy(() => import('./views/ma_classe/Cours/AddCourse'));
const AddUE = React.lazy(() => import('./views/ma_classe/AddUE'));
const AddEC = React.lazy(() => import('./views/ma_classe/AddEC'));
const ListCourse = React.lazy(() => import('./views/ma_classe/Cours/ListCourse'));

/********** END Pedagogie *********/

const routes = [
    { path: '/assistant-departement', exact: true, name: 'AssistantDpt'},
    { path: '/assistant-departement/dashboard', name: 'Dashboard', component: Dashboard},
    { path: '/assistant-departement/profil',name:'Mon profil',component:Profile},
    { path: '/assistant-departement/changer-de-mot-de-passe',exact:true,name:'changerMotDePasse',component:ChangePassword},

    // Pedagogie
    { path: '/chef-departement/gestionEnseignants', name: 'Dashboard', component: Enseignant},
    { path:'/chef-departement/maquette', name:"Maquette",component:Maquette},
    { path:'/chef-departement/AddEC', name:"AddEC",component: AddEC},
    { path:'/chef-departement/AddUE', name:"AddUE",component: AddUE},
    { path:'/chef-departement/AddCourse', name:"Nouveau Cours",component: AddCourse},
    { path:'/chef-departement/ListCourse', name:"ListCourse",component: ListCourse},
     //End Pedagogie
]    

export default routes;