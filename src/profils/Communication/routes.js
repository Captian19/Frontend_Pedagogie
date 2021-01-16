import React from 'react';
import Dossier from '../Communication/views/Dossier';
import SousDossier from '../Communication/views/SousDossier';
import CarteE from './views/CarteE';
import CarteEtudiant from './views/CarteEtudiant';
import Com from './views/Com';

const routes = [
    { path: '/communication', name: 'Communication',exact: true, component: Com},
    { path: '/communication/carte-etudiant', name: 'Carte Etudiant', component: CarteEtudiant},
    { path: '/communication/dossier', name: 'Dossier Etudiant', component: Dossier},
    { path: '/communication/dossier-etudiant-fichiers', name: 'Dossier Etudiant Fichiers', component: SousDossier},
    { path: '/communication/dossier-etudiant-fichiers-carte', name: 'Dossier Etudiant Fichiers', component: CarteE},


]    

export default routes;