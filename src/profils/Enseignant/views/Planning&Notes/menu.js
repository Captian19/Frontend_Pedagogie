const de_chef_deptmt_planning_notes_menu = [
  {
    _tag: 'CSidebarNavItem',
    name: "Progressions Classe",
    to: '/enseignant/liste-des-classes',
    icon: 'cil-bar-chart',
  },
];
const res_peda_planning_notes_menu = [
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Responsable Pedagogique']
  },
  {
    _tag: 'CSidebarNavItem',
    name: "Progressions Classe",
    to: '/enseignant/liste-des-classes',
    icon: 'cil-bar-chart',
  },
  {
    _tag: 'CSidebarNavItem',
    name: "Definir Planning",
    to: '/enseignant/definirplanning/',
    icon: 'cil-featured-playlist',
  },
  {
    _tag: 'CSidebarNavItem',
    name: "Tous les Plannings",
    to: '/enseignant/voir-tous-les-plannings',
    icon: 'cil-view-quilt',
    // cil-list-rich 
  },

]

const enseignant_planning_notes_menu = [
  {
    _tag: 'CSidebarNavItem',
    name: "Planning",
    to: '/enseignant/voir-mes-plannings/',
    icon: 'cil-calendar',
  },
  {
    _tag: 'CSidebarNavItem',
    name: "Mes cours",
    to: '/enseignant/mes-cours/',
    icon: 'cil-contact',
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Gestion des Notes',
    icon: 'cil-pencil',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: "Entrer Notes",
        to: '/enseignant/liste-cours',
        icon: 'cil-pencil',
      },
      {
        _tag: 'CSidebarNavItem',
        name: "Délibérer",
        to: '/enseignant/voir-classes-deliberations',
        icon: 'cil-featured-playlist',
      },
      {
        _tag: 'CSidebarNavItem',
        name: "Voir Résultats Annuels",
        to: '/enseignant/voir-classes-resultats-annuels',
        icon: 'cil-list-numbered',
      },
    ],
  },
];
export { de_chef_deptmt_planning_notes_menu, res_peda_planning_notes_menu, enseignant_planning_notes_menu};