
const planning_notes_menu = [
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Panning & Notes']
  },
  {
    _tag: 'CSidebarNavItem',
    name: "Mon Planning",
    to: '/etudiant/voirplanning',
    icon: 'cil-calendar',
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Cahier de Texte',
    icon: 'cil-book',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: "Voir Progression",
        to: '/etudiant/voir-progression-cours',
        icon: 'cil-bar-chart',
      },
      {
        _tag: 'CSidebarNavItem',
        name: "Mes absences",
        to: '/etudiant/voir-absences',
        icon: 'cil-user-unfollow',
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
        to: '/etudiant/voir-mes-notes',
        icon: 'cil-notes',
      },
      {
        _tag: 'CSidebarNavItem',
        name: "Mes bulletins",
        to: '/etudiant/voir-mes-bulletins',
        icon: 'cil-copy',
      },

    ],
  },
]

export default planning_notes_menu;