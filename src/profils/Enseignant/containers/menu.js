import planning_notes_menu from "../views/Planning&Notes/menu";

export default [
  {
    _tag: 'CSidebarNavItem',
    name: 'Mes Cours Virtuels',
    to: '/enseignant/ClasseVirtuelle/mesCours',
    icon: 'cil-task',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/enseignant/dashboard',
    icon: 'cil-speedometer',
    badge: {
      color: 'info',
      text: 'NEW',
    }
  },
  
  ...planning_notes_menu,

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Stages',
    icon: 'cilStar',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Entreprises',
        to: '/enseignant/entreprises',
        icon: 'cilDollar',
      }
    ]
  },

];