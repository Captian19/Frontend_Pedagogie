import React from 'react';
const Dashboard = React.lazy(() => import('./views/Dashboard'));

const routes = [
    { path: '/departement', exact: true, name: 'AssistantDpt'},
    { path: '/departement/dashboard', name: 'Dashboard', component: Dashboard},
]    

export default routes;