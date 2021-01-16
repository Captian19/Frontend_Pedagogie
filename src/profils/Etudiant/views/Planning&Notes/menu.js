import { id_classe, id_eleve } from "../../../../constants/Planning&Notes/constants";

const planning_notes_menu = [
    {
        _tag: 'CSidebarNavDropdown',
        name: 'Planning',
        icon: 'cil-pencil',
        _children: [
          {
            _tag: 'CSidebarNavItem',
            name: "Voir Planning",
            to: '/etudiant/voirplanning/:id_classe',
            icon: 'cil-speedometer',
          },
    
        ],
      },
      {
        _tag: 'CSidebarNavDropdown',
        name: 'Cahier de Texte',
        icon: 'cil-pencil',
        _children: [
          {
            _tag: 'CSidebarNavItem',
            name: "Voir Progression",
            to: '/etudiant/voir-progression-cours/' + id_classe,
            icon: 'cil-speedometer',
          },
          {
            _tag: 'CSidebarNavItem',
            name: "Mes absences",
            to: '/etudiant/voir-absences/' + id_classe + "/" + id_eleve,
            icon: 'cil-speedometer',
          },
    
        ],
      },
      {
        _tag: 'CSidebarNavDropdown',
        name: 'Gestion Notes',
        icon: 'cil-pencil',
        _children: [
          {
            _tag: 'CSidebarNavItem',
            name: "Mes Notes",
            to: '/etudiant/voir-mes-notes/' + id_eleve,
            icon: 'cil-speedometer',
          },
          {
            _tag: 'CSidebarNavItem',
            name: "Mes bulletins",
            to: '/etudiant/voir-mes-bulletins/' + id_eleve,
            icon: 'cil-speedometer',
          },
    
        ],
      },
]

export default planning_notes_menu;