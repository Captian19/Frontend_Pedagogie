export default [
    {
      _tag: 'CSidebarNavItem',
      name: 'Directeur',
      to: '/directeur/dashboard',
      icon: 'cil-speedometer',
      badge: {
        color: 'info',
        text: 'NEW',
      }
    },
   
    {
      _tag: 'CSidebarNavDropdown',
      name: 'Mandatement AC',
      icon: 'cil-list',
      _children: [
        {
          _tag: 'CSidebarNavItem',
          name: "En cours",
          to: '/directeur/MandatEnCours',
          icon: 'cilDollar',
        },
        {
          _tag: 'CSidebarNavItem',
          name: "Validé",
          to: '/directeur/MandatValide',
          icon: 'cilDollar',
        
        },
      ]
    },
    {
      _tag: 'CSidebarNavDropdown',
      name: 'Mandatement BC',
      icon: 'cil-list',
      _children: [
        {
          _tag: 'CSidebarNavItem',
          name: "En cours",
          to: '/directeur/MandatEnCoursBc',
          icon: 'cilDollar',
        },
        {
          _tag: 'CSidebarNavItem',
          name: "Validé",
          to: '/directeur/MandatValideBc',
          icon: 'cilDollar',
        
        },
      ]
    },
    
]


  