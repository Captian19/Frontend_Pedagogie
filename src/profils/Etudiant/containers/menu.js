import planning_notes_menu from "../views/Planning&Notes/menu";
import { id_etudiant } from "../../../constants/SuiviStage/constant";

export default [
    // {
    //   _tag: 'CSidebarNavItem',
    //   name: 'Dashboard',
    //   to: '/etudiant/dashboard/',
    //   icon: 'cil-speedometer',
    //   badge: {
    //     color: 'info',
    //     text: 'NEW',
    //   }
    // },
    // {
    //   _tag: 'CSidebarNavTitle',
    //   _children: ['Theme']
    // },
    // {
    //   _tag: 'CSidebarNavItem',
    //   name: 'Colors',
    //   to: '/theme/colors',
    //   icon: 'cil-drop',
    // },
    // {
    //   _tag: 'CSidebarNavItem',
    //   name: 'Typography',
    //   to: '/theme/typography',
    //   icon: 'cil-pencil',
    // },

    {
        _tag: 'CSidebarNavTitle',
        _children: ['Classe']
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Classe virtuelle',
      to: '/etudiant/ma_classe/ClasseVirtuelle/mesCours',
      icon: 'cil-task',
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Maquette',
      to: '/etudiant/classe/maquette',
      icon: 'cil-list',
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Liste Classe',
      to: '/etudiant/classe/liste',
      icon: 'cil-people',
    },

      {
        _tag: 'CSidebarNavTitle',
        _children: ['Inscription Administrative']
    },
  {
          _tag: 'CSidebarNavItem',
          name: "S'inscrire",
          to: '/etudiant/inscription-administrative-formulaire/',
          icon: 'cil-list',
    
  },
  {
          _tag: 'CSidebarNavItem',
          name: "Consulter Mon Dossier",
          to: '/etudiant/UnderList',
          icon: 'cil-list',
    
  },
  
      
    ,
    
    ...planning_notes_menu,
    
    {
      _tag: 'CSidebarNavDropdown',
      name: 'Stages',
      icon: 'cil-pencil',
      _children: [
        {
          _tag: 'CSidebarNavItem',
          name: "Offre de Stages",
          to: '/etudiant/stage/'+ id_etudiant+'/offres',
          icon: 'cil-speedometer',
        },

        {
          _tag: 'CSidebarNavItem',
          name: "Mes Stages",
          to: '/etudiant/stage/'+ id_etudiant+'/mes_stages',
          icon: '',
        },
  
      ],
    },

     //Bibliotheque
     {
      _tag: 'CSidebarNavDropdown',
      name: 'Espace Bibliothéque',
      icon: 'cil-pencil',
      _children: [
        {
          _tag: 'CSidebarNavItem',
          name: "Emprunt",
          to: '/etudiant/bibliotheque/home/',
          icon: 'cil-speedometer',
    
        },
        {
          _tag: 'CSidebarNavItem',
          name: "Reçu",
          to: '/etudiant/bibliotheque/recu/',
          icon: 'cil-speedometer',
    
        },
        {
          _tag: 'CSidebarNavItem',
          name: "Quitance",
          to: '/etudiant/bibliotheque/quittance/',
          icon: 'cil-speedometer',
    
        },
  
      ],
    },


]


  