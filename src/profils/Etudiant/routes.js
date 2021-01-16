import React from 'react';
import FraisIns from './views/moduleInscription/FraisIns';
import Home from './views/moduleInscription/Home';
import VisiteMed from './views/moduleInscription/VisiteMed';
import planning_notes_routes from './views/Planning&Notes/routes';
import UnderCreatePage from './views/moduleInscription/createU_Folder.js';
import UnderList from './views/moduleInscription/afficherUnder';
import ListeFichiers from './views/moduleInscription/fichiers';
import AfficheReçu from './views/moduleInscription/afficherReçu';
import AfficheMed from './views/moduleInscription/afficherMedical';
import AfficheInscription from './views/moduleInscription/afficherFormIns';
import AfficheCertificat from './views/moduleInscription/afficherCertificat';

//Bibliotheque Import
import BibliothequeHome from './views/module_bibliotheque/bibliothequeHome';
import SingleBookView from './views/module_bibliotheque/SingleBookView';
import Recu from './views/module_bibliotheque/Recu';
import Quittance from './views/module_bibliotheque/Quittance';
import EndPage from './views/moduleInscription/InscriptionEnd';
//End Bibliotheaue import


const Dashboard = React.lazy(() => import('./views/Dashboard'));
const FormulaireIns = React.lazy(() => import('./views/moduleInscription/FormulaireIns'));
const Offres = React.lazy(() => import("./views/SuiviStage/Offre/offres"));
const MesStages = React.lazy(() => import("./views/SuiviStage/MesStages/stages"));


//Pedagogie

const ListeClasse = React.lazy(() => import('./views/ma_classe/ListeClasse')); // pedagogie = ma_classe
const Maquette = React.lazy(() => import('./views/ma_classe/Maquette'));
const ClasseVirtuelle = React.lazy(() => import('./views/ma_classe/ClasseVirtuelle'));
const MesCours = React.lazy(() => import('./views/ma_classe/ClasseVirtuelle/Cours/mesCours'));
const DetailCours = React.lazy(() => import('./views/ma_classe/ClasseVirtuelle/Cours/detailCours'));
//End Pedagogie

const routes = [
    { path: '/etudiant', exact: true, name: 'Etudiant'},
    { path: '/etudiant/dashboard', name: 'Dashboard', component: Dashboard},
    { path: '/etudiant/inscription-administrative-formulaire', name: "Formulaire d'Inscription", component: Home},
    { path: '/etudiant/inscription-administrative-visite-medicale', name: "Visite Médicale", component: VisiteMed},
    { path: '/etudiant/inscription-administrative-frais-inscription', name: "Frais d'Inscription ", component: FraisIns},
    ...planning_notes_routes,
    { path: '/etudiant/UnderCreation', name: "Création sous dossier ", component: UnderCreatePage},
    { path: '/etudiant/UnderList', name: "Affichage sous dossier ", component: UnderList},
    {path: '/etudiant/fichiers',name: "afficher fichiers", component:ListeFichiers},
    {path: '/etudiant/reçu',name: "afficher reçu", component:AfficheReçu},
    {path: '/etudiant/medical',name: "afficher certificat medical", component:AfficheMed},
    {path: '/etudiant/fiche',name: "afficher fiche inscription", component:AfficheInscription},
    {path: '/etudiant/certificat',name: "afficher certificat inscription", component:AfficheCertificat},
    // routes Suivi de Stage
    {path: '/etudiant/stage/:id/offres', exact:true ,name: "Offres", component:Offres},
    {path: '/etudiant/stage/:id/mes_stages',name: "Mes Stages", component:MesStages},

     //Bibliotheque
     { path: '/etudiant/bibliotheque/home', name: "accueil-bibliotheque", component: BibliothequeHome},
     { path: '/etudiant/bibliotheque/recu', name: "recu-etudiant", component: Recu},
     { path: '/etudiant/bibliotheque/quittance', name: "quitance-etudiant", component: Quittance},
     //End Bibliotheque

     // Pedagogie
    { path:'/etudiant/classe/liste', name:"Liste Classe",component:ListeClasse},
    { path:'/etudiant/classe/maquette', name:"Maquette",component:Maquette},
    { path: '/etudiant/classe/virtuelle', name:"Classe Virtuelle", component:ClasseVirtuelle},
    { path: '/etudiant/finInscription',name:"fin inscription",component:EndPage},
    { path: '/etudiant/ma_classe/ClasseVirtuelle/mesCours', name: 'MesCours', component: MesCours},
    { path: '/etudiant/ClasseVirtuelle/detailCours/**', name: 'DetailCours', component: DetailCours}, 

     // End Pedagogie
]    

export default routes;