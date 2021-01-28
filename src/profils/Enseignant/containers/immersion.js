


export default [
  {
    
  
    _tag: 'CSidebarNavTitle',
    _children: ['Immersion']
},
  {
    _tag: 'CSidebarNavDropdown',
    name:'Stages',
    //icon: 'cilStar',
     _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Entreprises',
        to: '/enseignant/immersion',
        icon: 'cilDollar',
      },

      {
        _tag: 'CSidebarNavItem',
        name: 'Stagiaires',
        to: '/enseignant/immersion/stagiaires',
      },

      {
        _tag: 'CSidebarNavItem',
        name: 'Maitres de Stages',
        to: '/enseignant/immersion/maitre',
      },


    ]
  } 
  
]