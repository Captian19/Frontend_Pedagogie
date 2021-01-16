import React from 'react';
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Users = React.lazy(() => import('./views/Users'));
const Inactifs = React.lazy(() => import('./views/Inactifs'));
const AddUser = React.lazy(() => import('./views/AddUser'));
const Profile = React.lazy(() => import('./views/Profile'));
const User = React.lazy(() => import('./views/User'));
const ListClasse = React.lazy(() => import('./views/ListClasse'));
const ListDepartement = React.lazy(() => import('./views/ListDepartement'));
const ListRole = React.lazy(() => import('./views/ListRole'));

const routes = [
    { path: '/admin', exact: true, name: 'Admin'},
    { path: '/admin/dashboard', name: 'Dashboard', component: Dashboard},
    { path: '/admin/users',exact:true,name:"Users", component: Users},
    { path: '/admin/inactifs',exact:true,name:"Inactifs", component: Inactifs},
    { path: '/admin/addUser',exact:true,name:"AddUser", component: AddUser},
    { path: '/admin/profil',exact:true,name:"Profil", component: Profile},
    { path: '/admin/users/:id',exact: true,name:"User", component: User},
    { path: '/admin/liste/classe',exact:true,name:"",component:ListClasse},
    { path: '/admin/liste/departement',exact:true,name:"",component:ListDepartement},
    { path: '/admin/liste/role',exact:true,name:"",component:ListRole}

]    

export default routes;