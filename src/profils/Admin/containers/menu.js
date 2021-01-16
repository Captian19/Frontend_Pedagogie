export default [
    {
      _tag: 'CSidebarNavItem',
      name: 'Dashboard',
      to: '/admin/dashboard',
      icon: 'cil-speedometer',
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Profil',
      to: '/admin/profil',
      icon: 'cil-speedometer',
    },
    {
      _tag: 'CSidebarNavTitle',
      _children: ['Users']
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'All Users',
      to: '/admin/users',
      icon: 'cil-people',
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Users inactifs',
      to: '/admin/inactifs',
      icon: 'cil-user-unfollow',
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Ajouter un user',
      to: '/admin/addUser',
      icon: 'cil-user-follow',
    },
    {
      _tag: 'CSidebarNavTitle',
      _children: ['Liste']
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Classe',
      to: '/admin/liste/classe',
      icon: 'cil-user-follow',
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Département',
      to: '/admin/liste/departement',
      icon: 'cil-user-follow',
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Role',
      to: '/admin/liste/role',
      icon: 'cil-user-follow',
    },
]


  