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
import LivresContainer from './views/module_bibliotheque/LivresContainer';
import SingleBookView from './views/module_bibliotheque/SingleBookView';
import Recu from './views/module_bibliotheque/Recu';
import Quittance from './views/module_bibliotheque/Quittance';
import EndPage from './views/moduleInscription/InscriptionEnd';
import afficherCarte from './views/moduleInscription/afficherCarte';
//End Bibliotheaue import


const Dashboard = React.lazy(() => import('./views/Dashboard'));
const FormulaireIns = React.lazy(() => import('./views/moduleInscription/FormulaireIns'));
const ChangePassword = React.lazy(() => import('./../../components/auth/ChangePassword'));

//Suivi Stage
const Offres = React.lazy(() => import("./views/SuiviStage/Offre/offres"));
const MesStages = React.lazy(() => import("./views/SuiviStage/MesStages/stages"));
const Profile = React.lazy(() => import('../../components/auth/Profile'));
const LettreDeStage = React.lazy(() => import("./views/SuiviStage/MesStages/pdf"));

//PFE
const Sujets = React.lazy(() => import("./views/Pfe/Sujets/sujetPfe"));
const MonPFE = React.lazy(() => import("./views/Pfe/monPfe"));


//Pedagogie
const ListeClasse = React.lazy(() => import('./views/ma_classe/ListeClasse'));
const Maquette = React.lazy(() => import('./views/ma_classe/Maquette'));
const MaquetteVueDensemble = React.lazy(() => import('./views/ma_classe/MaquetteVueDensemble'));
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
    { path: '/etudiant/fichiers/:anneeScolaire',name: "afficher fichiers", component:ListeFichiers},
    { path: '/etudiant/reçu/:anneeScolaire',name: "afficher reçu", component:AfficheReçu},
    { path: '/etudiant/medical/:anneeScolaire',name: "afficher certificat medical", component:AfficheMed},
    { path: '/etudiant/fiche/:anneeScolaire',name: "afficher fiche inscription", component:AfficheInscription},
    { path: '/etudiant/certificat/:anneeScolaire',name: "afficher certificat inscription", component:AfficheCertificat},
    { path: '/etudiant/carte/:anneeScolaire',name: "afficher carte etudiant", component:afficherCarte},
    { path: '/etudiant/profil', name:'Mon profil', component: Profile},
    { path: '/etudiant/changer-de-mot-de-passe',exact:true,name:'changerMotDePasse',component:ChangePassword},
   
    // routes Suivi de Stage
    {path: '/etudiant/stage/offres', exact:true ,name: "Offres", component:Offres},
    {path: '/etudiant/stage/mes_stages',exact:true,name: "Mes Stages", component:MesStages},
    {path: '/etudiant/stage/mes_stages/lettre/:entreprise',name: "Lettre de Stage", component:LettreDeStage},

    //PFE
    {path: '/etudiant/pfe/sujets',name: "Sujets_PFE", component:Sujets},
    {path: '/etudiant/pfe/mon_pfe',name: "Mon PFE", component:MonPFE},


     //Bibliotheque
     { path: '/etudiant/bibliotheque/home', name: "livres", component: LivresContainer},
     { path: '/etudiant/bibliotheque/recu', name: "recu-etudiant", component: Recu},
     { path: '/etudiant/bibliotheque/quittance', name: "quitance-etudiant", component: Quittance},
     //End Bibliotheque

     // Pedagogie
    { path:'/etudiant/classe/liste', name:"Liste Classe",component:ListeClasse},
    { path:'/etudiant/classe/maquette', name:"Maquette",component:Maquette},
    { path: '/etudiant/finInscription',name:"fin inscription",component:EndPage},
    { path:'/etudiant/classe/maquetteVueDensemble', name:"MaquetteVueDensemble",component:MaquetteVueDensemble},
    { path: '/etudiant/ma_classe/ClasseVirtuelle/mesCours', name: 'MesCours', component: MesCours},
    { path: '/etudiant/ClasseVirtuelle/detailCours/**', name: 'DetailCours', component: DetailCours}, 
    { path: '/etudiant/classe/virtuelle', name:"Classe Virtuelle", component:ClasseVirtuelle},
    // End Pedagogie
]    

export default routes;