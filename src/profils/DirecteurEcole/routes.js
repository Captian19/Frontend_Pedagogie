import React from 'react';
const Dashboard = React.lazy(() => import('./views/Dashboard'));

const routes = [
    { path: '/directeur', exact: true, name: 'Directeur'},
    { path: '/directeur/dashboard', name: 'Dashboard', component: Dashboard},
]    

export default routes;