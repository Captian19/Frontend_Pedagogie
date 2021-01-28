export default [
    {
      _tag: 'CSidebarNavItem',
      name: 'Dashboard',
      to: '/assistant-departement',
      icon: 'cil-speedometer',
      badge: {
        color: 'info',
        text: 'NEW',
      }
    },

    {
      _tag: 'CSidebarNavTitle',
      _children: ['Assistant département']
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Liste des vacataires',
      to: '/assistant-departement/Vacataires',
      icon: 'cil-people',
    },
    {
      _tag: 'CSidebarNavDropdown',
      name: 'Gestion Maquette',
      icon: 'cil-list',
      _children: [
        {
          _tag: 'CSidebarNavItem',
          name: 'Maquette',
          to: '/assistant-departement/maquette',
          icon: 'cil-list',
        },
        {
          _tag: 'CSidebarNavItem',
          name: 'Ajouter EC',
          to: '/assistant-departement/AddEC',
          icon: 'cil-list',
        },
        {
          _tag: 'CSidebarNavItem',
          name: 'Ajouter UE',
          to: '/assistant-departement/AddUE',
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
          to: '/assistant-departement/ListCourse',
          icon: 'cil-list',
        },
        {
          _tag: 'CSidebarNavItem',
          name: 'Nouveau cours Virtuel',
          to: '/assistant-departement/AddCourse',
          icon: 'cil-list',
          badge: {
            color: 'info',
            text: 'NEW',
          }
        }
    ]},
    {
      _tag: 'CSidebarNavItem',
      name: "Plannings",
      to: '/assistant-departement/plannings-departement',
      icon: 'cil-calendar',
    },
    {
      _tag: 'CSidebarNavItem',
      name: "Justifier absence",
      to: '/assistant-departement/liste-de-classe/',
      icon: 'cil-user-unfollow',
    },
    {
      _tag: 'CSidebarNavItem',
      name: "Résultats Annuels",
      to: '/assistant-departement/voir-resultats-annuels',
      icon: 'cil-list-numbered',
    },
    {
      _tag: 'CSidebarNavItem',
      name: "Entrer Notes",
      to: '/assistant-departement/liste-des-classes',
      icon: 'cil-pencil',
    },
]


  