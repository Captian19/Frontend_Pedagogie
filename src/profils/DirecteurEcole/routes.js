import React from 'react';
const Dashboard = React.lazy(() => import('./views/Dashboard'));

// import finance 
const financeDashboard = React.lazy(() => import('./views/Finance/DossierEnCours'));
const financeDashboardBc = React.lazy(() => import('./views/Finance/DossierEnCoursBc'));
const financeDashboardValide = React.lazy(() => import('./views/Finance/DossierValide'));
const financeDashboardValideBc = React.lazy(() => import('./views/Finance/DossierValideBc'));
const mandatviewbc = React.lazy(()=> import('./views/Finance/mandat_views/mandat_viewsBC/MandatViewsAllBC'))
const mandatviewac = React.lazy(()=> import('./views/Finance/mandat_views/mandat_viewsAC/MandatViewsAllAC'))
const Profile = React.lazy(() => import('../../components/auth/Profile'));

const routes = [
    { path: '/directeur', exact: true, name: 'Directeur'},
    { path: '/directeur/dashboard', name: 'Dashboard', component: Dashboard},
    //Route finance 
    { path: '/directeur/MandatEnCours', name: "Mandatement AC en cours", component: financeDashboard },
    { path: '/directeur/MandatEnCoursBc', name: "Mandatement BC en cours", component: financeDashboardBc },
    { path: '/directeur/MandatValide', name: "Mandatement AC valide", component: financeDashboardValide },
    { path: '/directeur/MandatValideBc', name: "Mandatement BC valide", component: financeDashboardValideBc },
    { path: '/directeur/mandatviewbc/:id_Bc', name: 'MandatView_bon_caisse', component: mandatviewbc},
    { path: '/directeur/mandatviewac/:id_Ac', name: 'MandatView_avis_credit', component: mandatviewac},
    // Page Profil
    { path: '/directeur/profil',name:'Mon profil', component:Profile}
]    


export default routes;