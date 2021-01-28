import React from 'react';
import Dossier from '../Communication/views/Dossier';
import SousDossier from '../Communication/views/SousDossier';
import CarteE from './views/CarteE';
import CarteEtudiant from './views/CarteEtudiant';
import Com from './views/Com';
import Liste from './views/Liste';
import ListeDoc from './views/ListeDoc';

const Profile = React.lazy(() => import('../../components/auth/Profile'));
const ChangePassword = React.lazy(() => import('./../../components/auth/ChangePassword'));

const routes = [
    { path: '/communication', name: 'Communication',exact: true, component: Com},
    { path: '/communication/liste-des-etudiants/:classe', name: 'Communication',exact: true, component: Liste},
    { path: '/communication/liste-des-etudiants-docs/:classe', name: 'Communication',exact: true, component: ListeDoc},
    { path: '/communication/carte-etudiant/:id', name: 'Carte Etudiant', component: CarteEtudiant},
    { path: '/communication/dossier', name: 'Dossier Etudiant', component: Dossier},
    { path: '/communication/dossier-etudiant-fichiers/:email', name: 'Dossier Etudiant Fichiers', component: SousDossier},
    { path: '/communication/dossier-etudiant-fichiers-carte', name: 'Dossier Etudiant Fichiers', component: CarteE},

    // Page profil 
    {path: '/communication/profil',name:'Mon profil',component:Profile},
    { path: '/communication/changer-de-mot-de-passe',exact:true,name:'changerMotDePasse',component:ChangePassword},
]   

export default routes;