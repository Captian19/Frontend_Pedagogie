import VoirPlanning from './planning/voir_planning';
import RemplirCahierDeTexte from './cahier_de_texte/remplir';
import VoirProgressions from './cahier_de_texte/voir_progressions';
import VoirCahierCours from './cahier_de_texte/voir_cahier_cours';
import VoirAbsences from "./cahier_de_texte/voir_absences";
import VoirNotes from "./gestion_notes/eleve_voir_notes";

const planning_notes_routes = [
    { path: '/etudiant/voirplanning/:id_classe', name: "Voir Planning", component: VoirPlanning},
    { path: '/etudiant/remplir-cahier-de-texte/:id_planning/:id_seance', name: "Remplir Cahier de Texte", component: RemplirCahierDeTexte},
    { path: '/etudiant/voir-progression-cours/:id_classe', name: "Voir progression", component: VoirProgressions},
    { path: '/etudiant/voir-cahier-cours/:id_progression', name: "Voir Cahier Cours", component:  VoirCahierCours},
    { path: '/etudiant/voir-absences/:id_classe/:id_eleve', name: "Mes absences", component:  VoirAbsences},
    { path: '/etudiant/voir-mes-notes/:id_eleve', name: "Mes notes", component:  VoirNotes},
    
];

export default planning_notes_routes;