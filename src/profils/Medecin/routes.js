import React from 'react';
import SousDossier from '../Medecin/views/SousDossier';
import DossierMedical from '../Medecin/views/DossierMedical';
import Consultation from './views/Consultation';
import SuccessVisite from './views/SucessVisite';
import DocVisite from './views/DocVisite';
const Dashboard = React.lazy(() => import('./views/Dashboard'));

const routes = [
 
    { path: '/medecin', name: 'Dashboard',exact: true, component: Dashboard},
    { path: '/medecin/consultation/:id', name: 'Consultation ', component: Consultation},
    { path: '/medecin/consultation-effectuée', name: 'Consultation Effectue ', component: SuccessVisite},
    { path: '/medecin/dossiers-etudiants', name: 'Dossiers Etudiants ', component: DossierMedical},
    { path: '/medecin/dossier-etudiant-fichiers', name: "Fichiers", component: SousDossier},
    { path: '/medecin/dossier-etudiant-fichiers-certifical-medical', name: "Certificat Medical", component: DocVisite},


]    

export default routes;