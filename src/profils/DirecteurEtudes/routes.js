import React from 'react';
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Profile = React.lazy(() => import('../../components/auth/Profile'));
const Vacataire = React.lazy(() => import('./views/Liste_vacataires'));

const routes = [
    { path: '/directeur-etudes', exact: true, name: 'DE'},
    { path: '/directeur-etudes/dashboard', name: 'Dashboard', component: Dashboard},

    { path: '/directeur-etudes/profil',name:'Mon profil',component:Profile},
    { path:'/directeur-etudes/Vacataires', name:"Vacataire",component: Vacataire},
    
]    

export default routes;