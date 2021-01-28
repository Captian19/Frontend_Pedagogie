import React from 'react';
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Profile = React.lazy(() => import('../../components/auth/Profile'));
const ChangePassword = React.lazy(() => import('./../../components/auth/ChangePassword'));

const routes = [
    { path: '/bibliotheque', exact: true, name: 'Bibliotheque'},
    { path: '/bibliotheque/dashboard', name: 'Dashboard', component: Dashboard},
    { path: '/bibliotheque/profil', name:'Mon profil', component:Profile},
    { path: '/bibliotheque/changer-de-mot-de-passe',exact:true,name:'changerMotDePasse',component:ChangePassword},
]    

export default routes;