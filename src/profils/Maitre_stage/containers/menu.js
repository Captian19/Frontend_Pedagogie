import { id_maitre } from "../../../constants/SuiviStage/constant";


export default [
    {
      _tag: 'CSidebarNavItem',
      name: 'Dashboard',
      to: '/maitre_stage/dashboard',
      icon: 'cil-speedometer',
      badge: {
        color: 'info',
        text: 'NEW',
      }
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Mes Stagiaires',
      to: '/maitre_stage/'+ id_maitre,
      icon: 'cil-speedometer',
      badge: {
        color: 'danger',
        text: '+',
      }
    },
    
]


  