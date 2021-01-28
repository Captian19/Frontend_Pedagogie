import {enseignant_planning_notes_menu} from "../views/Planning&Notes/menu";

export default [
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
  {
    _tag: 'CSidebarNavItem',
    name: 'Mes Cours Virtuels',
    to: '/enseignant/ClasseVirtuelle/mesCours',
    icon: 'cil-task',
  },
  
  ...enseignant_planning_notes_menu,


];