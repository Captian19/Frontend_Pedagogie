import React from 'react';
import Validation from './views/Validation';
import Success from './views/Success';
import Dossier from './views/Dossier';
import SousDossier from './views/SousDossier';
import RecuInscription from '../../components/moduleInscription/RecuInscription';
import RecuEleve from './views/RecuEleve';
import Imprimer from './views/Imprimer';
import Liste from './views/Liste';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const ChangePassword = React.lazy(() => import('./../../components/auth/ChangePassword'));
const Profile = React.lazy(() => import('../../components/auth/Profile'));

// import finance 
const financeDashboard = React.lazy(() => import('./views/Finance/DossierEnCours'));
const financeDashboardBc = React.lazy(() => import('./views/Finance/DossierEnCoursBc'));
const mandatviewbc = React.lazy(()=> import('./views/Finance/mandat_views/mandat_viewsBC/MandatViewsAllBC'))
const mandatviewac = React.lazy(()=> import('./views/Finance/mandat_views/mandat_viewsAC/MandatViewsAllAC'))


const routes = [
    { path: '/comptable/paiement', name: "Frais D'inscription", component: Dashboard},
    { path: '/comptable/validation-paiement/:id', name: "Validation Du Paiement", component: Validation},
    { path: '/comptable/validation-réussie', name: "Validation Du Paiement Réussie", component: Success},
    { path: '/comptable/validation/imprimer-reçu', name: "Validation Du Paiement Réussie", component: Imprimer},

    { path: '/comptable/dossier-etudiant', name: "Dossier Etudiant", component: Dossier},
    { path: '/comptable/liste-des-etudiants/:classe', name: "Dossier Etudiant", component: Liste},
    { path: '/comptable/dossier-etudiant-fichiers/:email', name: "Fichiers", component: SousDossier},
    { path: '/comptable/dossier-etudiant-fichiers-reçu/:anneeScolaire/:email', name: "Recu", component: RecuEleve },

    //Route finance 
    { path: '/comptable/MandatEnCours', name: "Mandatement AC en cours", component: financeDashboard },
    { path: '/comptable/MandatEnCoursBc', name: "Mandatement BC en cours", component: financeDashboardBc },
    { path: '/comptable/mandatviewbc/:id_Bc', name: 'MandatView_bon_caisse', component: mandatviewbc},
    { path: '/comptable/mandatviewac/:id_Ac', name: 'MandatView_avis_credit', component: mandatviewac},

    { path: '/comptable/profil',name:'Mon profil',component:Profile},
    { path: '/comptable/changer-de-mot-de-passe',exact:true,name:'changerMotDePasse',component:ChangePassword},

]    

export default routes;