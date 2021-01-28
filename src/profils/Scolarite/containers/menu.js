export default [
  {
    _tag: 'CSidebarNavItem',
    name: "Accueil",
    to: '/scolarite/concours/accueil',
    icon: 'cil-speedometer',
  },


        {
          _tag: 'CSidebarNavTitle',
          _children: ['Inscription Administrative']
        },

  
        {
          _tag: 'CSidebarNavItem',
          name: "Inscrire un Etudiant",
          to: '/scolarite/inscription-administrative-recherche/',
          icon: 'cil-list',
    
        },
        {
          _tag: 'CSidebarNavItem',
          name: "Dossier Etudiant",
          to: '/scolarite/recherche',
          icon: 'cil-list',
    
        },
        {
          _tag: 'CSidebarNavItem',
          name: "Statistiques",
          to: '/scolarite/inscription-administrative-statistiques',
          icon: 'cil-list',
        },
  
  

        {
          _tag: 'CSidebarNavTitle',
          _children: ['Session Concours']
        },
          

            {
              _tag: 'CSidebarNavItem',
              name: "Validation",
              to: '/scolarite/concours/validation_candidat',
              icon: 'cil-list',
            },
            {
              _tag: 'CSidebarNavItem',
              name: "Candidats",
              to: '/scolarite/concours/liste_candidat',
              icon: 'cil-list',
            },
            {
              _tag: 'CSidebarNavItem',
              name: "Centres",
              to: '/scolarite/concours/liste_centre',
              icon: 'cil-list',
            },
            {
              _tag: 'CSidebarNavItem',
              name: "Emargement+",
              to: '/scolarite/concours/liste_emargement',
              icon: 'cil-list',
            },
            {
              _tag: 'CSidebarNavItem',
              name: "Corrections",
              to: '/scolarite/concours/liste_correcteur',
              icon: 'cil-list',
            },
            {
              _tag: 'CSidebarNavItem',
              name: "Resultat",
              to: '/scolarite/concours/liste_globale',
              icon: 'cil-list',
            },
          
        
        
]




