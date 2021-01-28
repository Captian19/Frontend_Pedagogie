export default [
    {
      _tag: 'CSidebarNavItem',
      name: 'Tableau de bord',
      to: '/admin/dashboard',
      icon: 'cil-home',
    },
    {
      _tag: 'CSidebarNavTitle',
      _children: ['UTILISATEURS']
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Tous les utilisateurs',
      to: '/admin/users',
      icon: 'cil-people',
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Les utilisateurs inactifs',
      to: '/admin/inactifs',
      icon: 'cil-user-unfollow',
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Ajouter un utilisateur',
      to: '/admin/addUser',
      icon: 'cil-user-follow',
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Nouveau role',
      to: '/admin/nouveau-role',
      icon: 'cil-plus',
    },
    {
      _tag: 'CSidebarNavTitle',
      _children: ['Rechercher une Liste']
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Classe',
      to: '/admin/liste/classe',
      icon: 'cil-list',
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Département',
      to: '/admin/liste/departement',
      icon: 'cil-list',
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Role',
      to: '/admin/liste/role',
      icon: 'cil-list',
    },
    {
      _tag: 'CSidebarNavTitle',
      _children: ['STATISTIQUES']
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Année Scolaire',
      to: '/admin/statistiques/annee-scolaire',
      icon: 'cil-list',
    },
]


  