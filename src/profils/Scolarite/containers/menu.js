export default [
    {
      _tag: 'CSidebarNavItem',
      name: 'Dashboard',
      to: '/scolarite/dashboard',
      icon: 'cil-speedometer',
      badge: {
        color: 'info',
        text: 'NEW',
      }
    },

    {
      _tag: 'CSidebarNavDropdown',
      name: 'Inscription Administrative',
      icon: 'cil-pencil',
      _children: [
        {
          _tag: 'CSidebarNavItem',
          name: "Inscrire un Etudiant",
          to: '/scolarite/inscription-administrative-recherche/',
          icon: 'cil-speedometer',
    
        },
        {
          _tag: 'CSidebarNavItem',
          name: "Dossier Etudiant",
          to: '/scolarite/recherche',
          icon: 'cil-speedometer',
    
        },
  
      ],
    },
    
]


  