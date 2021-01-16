import React from 'react';
import Inscription from './views/moduleInscription/Inscription';
import Paiement from './views/moduleInscription/Paiement';
import Recherche from './views/moduleInscription/Recherche';
import Visite from './views/moduleInscription/Visite';
import CreatePage from './views/moduleInscription/createFolder.js';
import UnderCreatePage from './views/moduleInscription/createU_folder.js';
import UnderList from './views/moduleInscription/afficherUnder';
import SearchDossier from './views/moduleInscription/rechercheDossier';
const Dashboard = React.lazy(() => import('./views/Dashboard'));

const routes = [
    { path: '/scolarite', exact: true, name:"Scolarite"},
    { path: '/scolarite/dashboard', name: 'Dashboard', component: Dashboard},
    { path: '/scolarite/inscription-administrative-recherche', name: 'Inscription Administrative Recherhce', component: Recherche },
    { path: '/scolarite/inscription-administrative', name: 'Inscription Administrative', component: Inscription },
    { path: '/scolarite/inscription-administrative-paiement', name: 'Inscription Administrative Paiement', component: Paiement },
    { path: '/scolarite/inscription-administrative-visite-medicale', name: 'Inscription Administrative Visite Medicale', component: Visite },
    { path: '/scolarite/FolderCreation', name: "Creation dossier", component: CreatePage},
    { path: '/scolarite/UnderCreation', name: "Création sous dossier ", component: UnderCreatePage},
    { path: '/scolarite/UnderList', name: "Affichage sous dossier ", component: UnderList},
    { path: '/scolarite/recherche', name: "Affichage les dossier ", component: SearchDossier},

]    

export default routes;