import React from 'react';
import SousDossier from '../Medecin/views/SousDossier';
import DossierMedical from '../Medecin/views/DossierMedical';
import Consultation from './views/Consultation';
import SuccessVisite from './views/SucessVisite';
import DocVisite from './views/DocVisite';
import Liste from './views/Liste';
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Profile = React.lazy(() => import('../../components/auth/Profile'));
const ChangePassword = React.lazy(() => import('./../../components/auth/ChangePassword'));

const routes = [
 
    { path: '/medecin', name: 'Dashboard',exact: true, component: Dashboard},
    { path: '/medecin/consultation/:id', name: 'Consultation ', component: Consultation},
    { path: '/medecin/consultation-effectuée', name: 'Consultation Effectue ', component: SuccessVisite},
    { path: '/medecin/dossiers-etudiants', name: 'Dossiers Etudiants ', component: DossierMedical},
    { path: '/medecin/liste-des-etudiants/:classe', name: 'Dossiers Etudiants ', component: Liste},
    { path: '/medecin/dossier-etudiant-fichiers/:email', name: "Fichiers", component: SousDossier},
    { path: '/medecin/dossier-etudiant-fichiers-certifical-medical/:anneeScolaire/:email', name: "Certificat Medical", component: DocVisite},

    { path: '/medecin/profil',exact:true,name:'Mon profil', component:Profile},
    { path: '/medecin/changer-de-mot-de-passe',exact:true,name:'changerMotDePasse',component:ChangePassword},
]    

export default routes;