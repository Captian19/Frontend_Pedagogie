export default [

      {
        icon: 'cil-list',
        _tag: 'CSidebarNavTitle',
        _children: ['Inscription Administrative']
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Paiement',
      to: '/comptable/dashboard',
      icon: 'cil-list',
   
    },
      {
      _tag: 'CSidebarNavItem',
      name: "Dossiers Etudiants",
      to: '/comptable/dossier-etudiant',
      icon: 'cil-list',
    
    },
    {
      icon: 'cil-list',
      _tag: 'CSidebarNavTitle',
      _children: ['Gestion des mandatements']
  },
    {
      _tag: 'CSidebarNavItem',
      name: "Mandatement AC en cours",
      to: '/comptable/MandatEnCours',
      icon: 'cil-list',
    
    },
    {
      _tag: 'CSidebarNavItem',
      name: "Mandatement BC en cours",
      to: '/comptable/MandatEnCoursBc',
      icon: 'cil-list',
    
    },

    
]


  