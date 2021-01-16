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
          name: 'Liste des Enseignants',
          to: '/chef-departement/gestionEnseignants',
          icon: 'cil-list',
        },
        {
          _tag: 'CSidebarNavItem',
          name: 'Nouvel Ensignant',
          to: '/chef-departement/gestionEnseignants',
          icon: 'cil-people',
          badge: {
            color: 'info',
            text: 'NEW',
          }
        }
      ]
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Maquette',
      to: '/chef-departement/maquette',
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
      // _children: [
      //   {
      //     _tag: 'CSidebarNavItem',
      //     name: 'DIC1',
      //     to: '/chef-departement/gestionEnseignants',
      //     icon: 'cilNotes',
      //   },
      //   {
      //     _tag: 'CSidebarNavItem',
      //     name: 'DIC2',
      //     to: '/chef-departement/gestionEnseignants',
      //     icon: 'cilNotes',
      //   },
      //   {
      //     _tag: 'CSidebarNavItem',
      //     name: 'DIC3',
      //     to: '/chef-departement/gestionEnseignants',
      //     icon: 'cilNotes',
      //   }
      // ]
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Details',
      // to: '/chef-departement/CoursDetails',
      icon: 'cil-speedometer',
      
    },
    /********************  Pedagogie ******************/
    
]


  