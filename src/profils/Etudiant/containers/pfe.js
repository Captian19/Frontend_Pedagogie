


export default [
    
     //PFE
     {
      _tag: 'CSidebarNavDropdown',
      name: 'PFE',
      icon: 'cilList-rich',
      _children: [
        {
          _tag: 'CSidebarNavItem',
          name: "Sujets de PFE",
          to: '/etudiant/pfe/sujets',
          icon: 'cil-star',
        },

        {
          _tag: 'CSidebarNavItem',
          name: "Mon PFE",
          to: '/etudiant/pfe/mon_pfe',
          icon: '',
        },
  
      ],
    },
    
  ]