import React from 'react';
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const MaitreStage = React.lazy(() => import('./views/SuiviStage/mes_stagiaires'));
const Profile = React.lazy(() => import('../../components/auth/Profile'));
const ChangePassword = React.lazy(() => import('./../../components/auth/ChangePassword'));


const routes = [
    
    { path: '/maitre_stage/dashboard', exact: true, name: 'Dashboard', component: Dashboard},
    { path: '/maitre_stage/:id' ,exact:true,name: 'Maitre_de_Stage',component: MaitreStage},
    { path: '/maitre_stage/profil',exact:true, name:'Mon profil', component:Profile},
    { path: '/maitre_stage' ,exact:true,name: 'Maitre_de_Stage',component: MaitreStage},
    { path: '/maitre_stage/changer-de-mot-de-passe',exact:true,name:'changerMotDePasse',component:ChangePassword},


]    

export default routes;