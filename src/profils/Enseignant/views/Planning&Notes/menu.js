
import { id_progression } from '../../../../constants/Planning&Notes/constants';

const planning_notes_menu = [
    {
        _tag: 'CSidebarNavDropdown',
        name: 'Planning',
        icon: 'cil-pencil',
        _children: [
          {
            _tag: 'CSidebarNavItem',
            name: "Definir Planning",
            to: '/enseignant/definirplanning/',
            icon: 'cil-speedometer',
          },
    
        ],
      },
      {
        _tag: 'CSidebarNavDropdown',
        name: 'Cahiers de Texte',
        icon: 'cil-pencil',
        _children: [
          {
            _tag: 'CSidebarNavItem',
            name: "Mes cours",
            to: '/enseignant/mes-cours/prof',
            icon: 'cil-speedometer',
          },
    
        ],
      },
      {
        _tag: 'CSidebarNavDropdown',
        name: 'Gestion des Notes',
        icon: 'cil-pencil',
        _children: [
          {
            _tag: 'CSidebarNavItem',
            name: "Entrer Notes",
            to: '/enseignant/entrer-note/' + id_progression,
            icon: 'cil-speedometer',
          },
    
        ],
      },
];

export default planning_notes_menu;