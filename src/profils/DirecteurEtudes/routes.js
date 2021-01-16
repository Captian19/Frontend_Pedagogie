import React from 'react';
const Dashboard = React.lazy(() => import('./views/Dashboard'));

const routes = [
    { path: '/directeur-etudes', exact: true, name: 'DE'},
    { path: '/directeur-etudes/dashboard', name: 'Dashboard', component: Dashboard},
]    

export default routes;