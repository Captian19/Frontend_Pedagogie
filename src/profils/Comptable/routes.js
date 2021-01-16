import React from 'react';
import Validation from './views/Validation';
import Success from './views/Success';
import Dossier from './views/Dossier';
import SousDossier from './views/SousDossier';
import RecuInscription from '../../components/moduleInscription/RecuInscription';
import RecuEleve from './views/RecuEleve';
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Test = React.lazy(() => import('./views/Test'));

const routes = [
    { path: '/comptable/paiement', name: "Frais D'inscription", component: Dashboard},
    { path: '/comptable/validation-paiement/:id', name: "Validation Du Paiement", component: Validation},
    { path: '/comptable/validation-réussie', name: "Validation Du Paiement Réussie", component: Success},
    { path: '/comptable/dossier-etudiant', name: "Dossier Etudiant", component: Dossier},
    { path: '/comptable/dossier-etudiant-fichiers', name: "Fichiers", component: SousDossier},
    { path: '/comptable/dossier-etudiant-fichiers-reçu', name: "Recu", component: RecuEleve },



]    

export default routes;