export default [
    {
      _tag: 'CSidebarNavItem',
      name: 'Dashboard',
      to: '/chef-departement/dashboard',
      icon: 'cil-speedometer',
      badge: {
        color: 'info',
        text: 'NEW',
      }
    },
    /********************  Pedagogie ******************/
    {
      _tag: 'CSidebarNavDropdown',
      name: 'Enseignants',
      icon: 'cil-people',
      _children: [
        {
          _tag: 'CSidebarNavItem',
          name: 'Liste des enseignants',
          to: '/chef-departement/Enseignants',
          icon: 'cil-people',
        },
        {
          _tag: 'CSidebarNavItem',
          name: 'Liste des vacataires',
          to: '/chef-departement/Vacataires',
          icon: 'cil-people',
        }
        
      ]
    },

    {
      _tag: 'CSidebarNavDropdown',
      name: 'Gestion Maquette',
      icon: 'cil-list',
      _children: [
        {
          _tag: 'CSidebarNavItem',
          name: 'Maquette',
          to: '/chef-departement/maquette',
          icon: 'cil-list',
        },
        {
          _tag: 'CSidebarNavItem',
          name: 'Ajouter EC',
          to: '/chef-departement/AddEC',
          icon: 'cil-list',
        },
        {
          _tag: 'CSidebarNavItem',
          name: 'Ajouter UE',
          to: '/chef-departement/AddUE',
          icon: 'cil-list',
        }
    ]},
    {
      _tag: 'CSidebarNavDropdown',
      name: 'Cours virtuels',
      icon: 'cil-list',
      _children: [
        {
          _tag: 'CSidebarNavItem',
          name: 'liste des Cours virtuels',
          to: '/chef-departement/ListCourse',
          icon: 'cil-list',
        },
        {
          _tag: 'CSidebarNavItem',
          name: 'Nouveau cours Virtuel',
          to: '/chef-departement/AddCourse',
          icon: 'cil-list',
          badge: {
            color: 'info',
            text: 'NEW',
          }
        }
    ]},
    
    /********************  Pedagogie ******************/
]


  