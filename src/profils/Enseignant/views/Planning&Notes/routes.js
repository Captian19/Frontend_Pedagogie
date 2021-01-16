import ProgressionProf from "./cahier_de_texte/voir_progressions_prof";
import DefinirPlanning from "./planning/definir_planning";
import CahierCours from "../../../Etudiant/views/Planning&Notes/cahier_de_texte/voir_cahier_cours";
import EntrerNote from "./gestion_notes/entrer_notes";

const planning_notes_routes = [
    { path: '/enseignant/definirplanning', name: 'Definir planning', component: DefinirPlanning },
    { path: '/enseignant/mes-cours/:id_prof', name: "Mes cours", component: ProgressionProf },
    { path: '/enseignant/voir-cahier-cours/:id_progression', name: "Cahier de Cours", component: CahierCours },
    { path: '/enseignant/entrer-note/:id_progression', name: "Enter Note", component: EntrerNote },
];

export default planning_notes_routes;