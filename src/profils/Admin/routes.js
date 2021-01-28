import React from 'react';
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Users = React.lazy(() => import('./views/Users'));
const Inactifs = React.lazy(() => import('./views/Inactifs'));
const AddUser = React.lazy(() => import('./views/AddUser'));
const Profile = React.lazy(() => import('../../components/auth/Profile'));
const User = React.lazy(() => import('./views/User'));
const ListClasse = React.lazy(() => import('./views/ListClasse'));
const ListDepartement = React.lazy(() => import('./views/ListDepartement'));
const ListRole = React.lazy(() => import('./views/ListRole'));
const AddNewRole = React.lazy(() => import('./views/AddNewRole'));
const StatYear = React.lazy(() => import('./views/StatYear'));
const DetailsYear = React.lazy(() => import('./views/DetailsYear'));
const ChangePassword = React.lazy(() => import('./../../components/auth/ChangePassword'));

const routes = [
    { path: '/admin', exact: true, name: 'Admin'},
    { path: '/admin/dashboard', name: 'Dashboard', component: Dashboard},
    { path: '/admin/users',exact:true,name:"Users", component: Users},
    { path: '/admin/inactifs',exact:true,name:"Inactifs", component: Inactifs},
    { path: '/admin/addUser',exact:true,name:"AddUser", component: AddUser},
    { path: '/admin/profil',exact:true,name:"Profil", component: Profile},
    { path: '/admin/users/:id',exact: true,name:"User", component: User},
    { path: '/admin/liste/classe',exact:true,name:"Liste par classe",component:ListClasse},
    { path: '/admin/liste/departement',exact:true,name:"Liste par département",component:ListDepartement},
    { path: '/admin/liste/role',exact:true,name:"Liste par role",component:ListRole},
    { path: '/admin/nouveau-role',exact:true,name:"Ajout de nouveau role",component:AddNewRole},
    { path: '/admin/statistiques/annee-scolaire',exact:true,name:"Statistiques par année",component:StatYear},
    { path: '/admin/statistiques/annee-scolaire/:id',exact:true,name:"",component:DetailsYear},
    { path: '/admin/changer-de-mot-de-passe',exact:true,name:'changerMotDePasse',component:ChangePassword},

]    

export default routes;