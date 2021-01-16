import React from 'react';
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const MaitreStage = React.lazy(() => import('./views/SuiviStage/mes_stagiaires'));




const routes = [
    
    { path: '/maitre_stage/dashboard', exact: true, name: 'Dashboard', component: Dashboard},
    { path: '/maitre_stage/:id' ,exact:true,name: 'Maitre_de_Stage',component: MaitreStage},


]    

export default routes;