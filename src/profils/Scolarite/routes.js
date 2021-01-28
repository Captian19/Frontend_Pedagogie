import React from 'react';

// Module Inscription
import Inscription from './views/moduleInscription/Inscription';
import Statistiques from './views/moduleInscription/Statistiques';
import Home from './views/moduleInscription/Home';
import Paiement from './views/moduleInscription/Paiement';
import Recherche from './views/moduleInscription/Recherche';
import Liste from './views/moduleInscription/Liste';
import Visite from './views/moduleInscription/Visite';
import UnderCreatePage from './views/moduleInscription/createU_folder.js';
import UnderList from './views/moduleInscription/afficherUnder';
import SearchDossier from './views/moduleInscription/rechercheDossier';

import InscriptionAncien from './views/moduleInscription/InscriptionAncien';
import StatDetails from './views/moduleInscription/StatDetails';

import ListeDossier from './views/moduleInscription/ListeDossier';
import fichiersEtudiant from './views/moduleInscription/fichiersEtudiant';
import afficherReçu from './views/moduleInscription/afficherReçu';
import afficherCertificat from './views/moduleInscription/afficherCertificat';
import AfficheInscription from './views/moduleInscription/afficherFormIns';
import afficherMedical from './views/moduleInscription/afficherMedical';
import afficherCarte from './views/moduleInscription/afficherCarte';

// Module Concours
import View_Ajout_Candidat from './views/moduleConcours/view_ajout_candidat';
import View_Liste_Candidat from './views/moduleConcours/view_liste_candidat';
import View_Liste_Centre from './views/moduleConcours/view_liste_centre';
import View_Liste_Globale from './views/moduleConcours/view_liste_globale_resultat';
import View_Liste_Emargement from './views/moduleConcours/view_liste_emargement';
import View_Session from './views/moduleConcours/view_session';
import View_Liste_Correcteur from './views/moduleConcours/view_liste_correcteur';
import View_Liste_Rapport from './views/moduleConcours/view_liste_rapport';
import View_Liste_Communique from './views/moduleConcours/view_liste_communique';
import View_Liste_Lots from './views/moduleConcours/view_liste_lots';
import View_Liste_Sujets from './views/moduleConcours/view_liste_sujet';
import View_Validaton_Candidat from './views/moduleConcours/view_validation_candidat';




// Planning & Notes
import ListeDeClasseResultatsAnnuels from './views/Plannings&Notes/gestion_notes/voir_classe_resultats_annuels';
import VoirResultAnnuelEleve from '../Etudiant/views/Planning&Notes/gestion_notes/mes_bulletins';

const ChangePassword = React.lazy(() => import('./../../components/auth/ChangePassword'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Profile = React.lazy(() => import('../../components/auth/Profile'));

const routes = [
    { path: '/scolarite', exact: true, name:"Scolarite"},
    { path: '/scolarite/dashboard', name: 'Dashboard', component: Dashboard},
    { path: '/scolarite/inscription-administrative-statistiques', name: 'Inscription Administrative Statistiques', component: Statistiques},
    { path: '/scolarite/inscription-administrative-statistiques-details/:classe/:departement', name: 'Inscription Administrative Statistiques Details', component: StatDetails},
    { path: '/scolarite/inscription-administrative-recherche', name: 'Inscription Administrative Recherhce', component: Recherche },
    { path: '/scolarite/inscription-administrative/classe/:classe', name: 'Inscription Administrative ', component: Liste },

    { path: '/scolarite/inscription-administrative/:prenom/:nom/:email/:classe/:departement/:anneeDebut/:anneeFin/:IDE', name: 'Inscription Administrative Accueil', component: Home },
    { path: '/scolarite/inscription-administrative/:prenom/:nom/:email/:classe/:departement/:anneeDebut/:anneeFin/:IDE', name: 'Inscription Administrative TC1', component: Inscription },
    { path: '/scolarite/inscription-administrative/:prenom/:nom/:email/:classe/:departement/:anneeDebut/:anneeFin/:IDE', name: 'Inscription Administrative Ancien', component: InscriptionAncien },

    { path: '/scolarite/LesDosssiers/classe/:classe', name: 'Dossiers Etudiants ', component: ListeDossier },

    { path: '/scolarite/inscription-administrative-paiement/:id', name: 'Inscription Administrative Paiement', component: Paiement },
    { path: '/scolarite/inscription-administrative-visite-medicale', name: 'Inscription Administrative Visite Medicale', component: Visite },
    { path: '/scolarite/UnderCreation', name: "Création sous dossier ", component: UnderCreatePage},
    { path: '/scolarite/dossier/:prenom/:nom/:email/:classe/:departement/:anneeDebut/:anneeFin/:IDE', name: "Affichage sous dossier ", component: UnderList},
    { path: '/scolarite/recherche', name: "Affichage les dossier ", component: SearchDossier},
    { path: '/scolarite/fichiers/:email/:anneeScolaire',name:"les fichiers de l'etudiant",component:fichiersEtudiant},
    { path: '/scolarite/reçu/:email/:anneeScolaire',name :"reçu",component:afficherReçu},
    { path: '/scolarite/certificat/:email/:anneeScolaire',name :"certificat",component:afficherCertificat},
    { path: '/scolarite/fiche/:email/:anneeScolaire',name :"fiche",component:AfficheInscription},
    { path: '/scolarite/medical/:email/:anneeScolaire',name :"medical",component:afficherMedical},
    { path: '/scolarite/carte/:email/:anneeScolaire',name :"medical",component:afficherCarte},

    // Routes Concours d'Entree
    { path: '/scolarite/concours/ajout_candidat', name: "Ajouter Candidat", component: View_Ajout_Candidat},
    { path: '/scolarite/concours/liste_candidat', name: 'Candidats', component: View_Liste_Candidat},
    { path: '/scolarite/concours/liste_centre', name: 'Centres', component: View_Liste_Centre},
    { path: '/scolarite/concours/liste_globale', name: 'Resultats', component: View_Liste_Globale},
    { path: '/scolarite/concours/liste_emargement', name: "Emargement+", component: View_Liste_Emargement},
    { path: '/scolarite/concours/accueil', name: "Accueil", component: View_Session},
    { path: '/scolarite/concours/liste_correcteur', name: "Correction", component: View_Liste_Correcteur},
    { path: '/scolarite/concours/rapports/*', name: "Rapports", component: View_Liste_Rapport},
    { path: '/scolarite/concours/communiques/*', name: "Communiques", component: View_Liste_Communique},
    { path: '/scolarite/concours/lots_candidats', name: "Lots Candidats", component: View_Liste_Lots},
    { path: '/scolarite/concours/sujets/*', name: "Sujets", component: View_Liste_Sujets},
    { path: '/scolarite/concours/validation_candidat', name: "Validation", component: View_Validaton_Candidat},

    // Page Profil
    { path: '/scolarite/profil', exact:true, name:'Mon profil', component:Profile},
    { path: '/scolarite/changer-de-mot-de-passe',exact:true,name:'changerMotDePasse',component:ChangePassword},

    // Planning & Gestion des Notes
    { path: '/scolarite/voir-resultats-annuels', name: "Résultats Annuels", component: ListeDeClasseResultatsAnnuels },
    { path: '/scolarite/voir-resultats-annuels-eleve/:eleve/:user', name: "Résultat annuels", component: VoirResultAnnuelEleve },
]    

export default routes;