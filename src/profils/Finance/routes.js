import React from 'react';

const Dashboard = React.lazy(() => import('./views/mandatement/Mandatement'));
const initAC = React.lazy(() => import('./views/mandatement/madantementAC/initAC'));
const initBC = React.lazy(() => import('./views/mandatement/mandatementBC/initBC'));
const mandatviewbc = React.lazy(()=> import('./views/mandatement/mandat_views/mandat_viewsBC/MandatViewsAllBC'))
const mandatviewac = React.lazy(()=> import('./views/mandatement/mandat_views/mandat_viewsAC/MandatViewsAllAC'))
const mandatementac = React.lazy(()=> import('./views/mandatement/madantementAC/mandatementAC'))
const mandatementbc = React.lazy(()=> import('./views/mandatement/mandatementBC/mandatementBC'))


const routes = [
    { path: '/finance', exact: true, name:"Finance"},
    { path: '/finance/mandatement', name: 'Mandatement', component: Dashboard},
    { path: '/finance/mandatac', name: 'initAC', component: initAC},
    { path: '/finance/mandatbc', name: 'initBC', component: initBC},
    { path: '/finance/mandatviewbc', name: 'MandatView_bon_caisse', component: mandatviewbc},
    { path: '/finance/mandatviewac', name: 'MandatView_avis_credit', component: mandatviewac},
    { path: '/finance/mandatementac', name: 'Mandatement_Avis_Credit', component: mandatementac},
    { path: '/finance/mandatementbc', name: 'Mandatement_Bon_Caise', component: mandatementbc},
]

export default routes;