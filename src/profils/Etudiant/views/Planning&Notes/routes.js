import VoirPlanning from './planning/voir_planning';
import RemplirCahierDeTexte from './cahier_de_texte/remplir';
import VoirProgressions from './cahier_de_texte/voir_progressions';
import VoirCahierCours from './cahier_de_texte/voir_cahier_cours';
import VoirAbsences from "./cahier_de_texte/voir_absences";
import VoirNotes from "./gestion_notes/eleve_voir_notes";
import VoirBulletins from './gestion_notes/mes_bulletins';

const planning_notes_routes = [
    { path: '/etudiant/voirplanning', name: "Voir Planning", component: VoirPlanning},
    { path: '/etudiant/remplir-cahier-de-texte/:id_planning/:id_seance', name: "Remplir Cahier de Texte", component: RemplirCahierDeTexte},
    { path: '/etudiant/voir-progression-cours', name: "Voir progression", component: VoirProgressions},
    { path: '/etudiant/voir-cahier-cours/:id_progression', name: "Voir Cahier Cours", component:  VoirCahierCours},
    { path: '/etudiant/voir-absences', name: "Mes absences", component:  VoirAbsences},
    { path: '/etudiant/voir-mes-notes', name: "Mes notes", component:  VoirNotes},
    { path: '/etudiant/voir-mes-bulletins', name: "Mes bulletins", component:  VoirBulletins},
    
];

export default planning_notes_routes;