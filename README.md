# Espace Numerique de Travail 

ENT, l'espace numérique de travail de l'EPT

## Architecture 

.
+-- _assets (css, fonts et img)
|
|
+-- _components(Les fichiers réutilisables)
|
|    +-- auth(Gestion des utilisateurs)
|    +-- ...
|    +-- _Footer
|
+-- _profils(Les différents espace de travail)
|
|    +-- _Etudiant
|    |   +-- _containers (Sidebar - Header - Content ... )
|    |   +-- _views (Les différentes views)
|    |   +-- router.js (Les différentes sous-routes du module)
|    |   +-- _index.js (Le dashboard complet)
|    |
|    +-- _Enseignant
|    |   +-- _containers (Sidebar - Header - Content ... )
|    |   +-- _views (Les différentes views)
|    |   +-- router.js (Les différentes sous-routes module)
|    |   +-- _index.js (Le dashboard complet)
|    |
|    +-- ...
|
+-- _App.js (Les différentes routes du projet)
|
|
+-- _index.js (fichier de base du projet)

### `npm start`

Démarrer le serveur en local 
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `npm install`

Pour installer les dépendances au niveau du package.json. 



