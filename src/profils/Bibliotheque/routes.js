import React from 'react';
const Dashboard = React.lazy(() => import('./views/Dashboard'));

const routes = [
    { path: '/bibliotheque', exact: true, name: 'Bibliotheque'},
    { path: '/bibliotheque/dashboard', name: 'Dashboard', component: Dashboard},
]    

export default routes;