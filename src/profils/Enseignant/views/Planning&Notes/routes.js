import DefinirPlanning from "./planning/definir_planning";
import RedefinirPlanning from './planning/redefinir_planning';
import VoirTousLesPlannings from './planning/voir_tous_les_plannings';

import CahierCours from "../../../Etudiant/views/Planning&Notes/cahier_de_texte/voir_cahier_cours";
import EntrerNote from "./gestion_notes/entrer_notes";
import VoirPlanning from './planning/voir_planning';
import RemplirCahierDeTexte from '../../../Etudiant/views/Planning&Notes/cahier_de_texte/remplir';
import FaireLAppel from './cahier_de_texte/faire_l_appel';
import VoirNotes from './gestion_notes/voir_notes';
import VoirMesPlannings from './planning/mes_planning';
import ListeCours from './gestion_notes/list_cours'
import VoirResultAnnuel from './gestion_notes/voir_resultats_annuels';
import VoirTableauSemestriel from './gestion_notes/voir_tableau_semestriel';
import VoirClassesDeliberations from './gestion_notes/voir_classe_deliberations';
import VoirClassesResultatsAnnuels from '../../../Scolarite/views/Plannings&Notes/gestion_notes/voir_classe_resultats_annuels';
import ProgressionProf from "./cahier_de_texte/voir_progressions_prof";

import VoirClasses from './cahier_de_texte/voir_classes'; // Voir la liste des classes pour en selectionner une
import VoirProgressionsClasse from './cahier_de_texte/voir_progressions_classe'; // Voir la liste des progressions des cours d'une classe


const planning_notes_routes = [
    
    { path: '/enseignant/definirplanning', name: 'Definir planning', component: DefinirPlanning },
    { path: '/enseignant/redefinir-planning/:id_planning', name: 'Redéfinir planning', component: RedefinirPlanning },
    { path: '/enseignant/voir-planning/:id_planning', name: 'Voir planning', component: VoirPlanning },
    { path: '/enseignant/voir-tous-les-plannings', name: 'Voir les planning', component: VoirTousLesPlannings },

    { path: '/enseignant/mes-cours/', name: "Mes cours", component: ProgressionProf },
    { path: '/enseignant/remplir-cahier-de-texte/:id_planning/:id_seance', name: "Remplir Cahier de Texte", component: RemplirCahierDeTexte},
    { path: '/enseignant/faire-l-appel/:id_planning/:id_seance', name: "Faire l'appel", component: FaireLAppel},
    { path: '/enseignant/voir-cahier-cours/:id_progression', name: "Cahier de Cours", component: CahierCours },
    { path: '/enseignant/liste-cours', name: "Liste Cours", component: ListeCours },
    { path: '/enseignant/entrer-notes/:id_progression', name: "Entrer Note", component: EntrerNote },
    { path: '/enseignant/voir-notes/:id_progression', name: "Voir notes", component: VoirNotes },
    { path: '/enseignant/voir-mes-plannings/', name: "Mes plannings", component: VoirMesPlannings },
    { path: '/enseignant/voir-tableau-semestriel/:id_classe', name: "Délibérer", component: VoirTableauSemestriel },
    { path: '/enseignant/voir-classes-deliberations', name: "Délibérer", component: VoirClassesDeliberations },
    { path: '/enseignant/voir-classes-resultats-annuels', name: "Resultats Annuels", component: VoirClassesResultatsAnnuels },
    { path: '/enseignant/voir-resultats-annuels/:id_classe', name: "Voir Resultats", component: VoirResultAnnuel },
    
    // Pour le DE, le chef de département et le responsable pedagogique
    { path: '/enseignant/liste-des-classes', name: "Liste des classes", component: VoirClasses },
    { path: '/enseignant/voir-progressions-classe/:niveau/:departement', name: "Progression des cours", component: VoirProgressionsClasse },
];

export default planning_notes_routes;