import React,{ Component } from "react"
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Etudiant from "./profils/Etudiant/index"
import Enseignant from "./profils/Enseignant/index"
import Finance from "./profils/Finance/index"
import Medecin from "./profils/Medecin/index"
import Communication from "./profils/Communication/index"
import Comptable from "./profils/Comptable/index"
import Bibliotheque from "./profils/Bibliotheque/index"
import Admin from "./profils/Admin/index"
import AssistantDpt from "./profils/AssistantDpt/index"
import Scolarite from "./profils/Scolarite/index"
import MaitreStage from "./profils/Maitre_stage/index"

import DirecteurEcole from "./profils/DirecteurEcole/index"
import DirecteurEtudes from "./profils/DirecteurEtudes/index"
import ChefDepartement from "./profils/ChefDepartement/index";
import Page404 from "./components/auth/404";

import Login from "./auth/login";
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from "./auth/PrivateRoute";
import Guide from "./components/auth/Guide";
import {loadUser} from "./actions/auth";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

class App extends Component{

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render(){
    return(
      <Provider store={store}>
      <BrowserRouter>
          <React.Suspense fallback={loading}>
            <Switch>
            <Route exact path="/" component={Login} />      
            <PrivateRoute path="/etudiant" component={Etudiant} pass="ETUDIANT" />
            <PrivateRoute path="/scolarite" component={Scolarite} pass="MEMBRE_SCOLARITE" />
            <PrivateRoute path="/bibliotheque" component={Bibliotheque} pass="GERANT_BIBLIOTHEQUE" />
            <PrivateRoute path="/finance" component={Finance} pass="MEMBRE_FINANCE" />
            <PrivateRoute path="/medecin" component={Medecin} pass="MEDECIN" />
            <PrivateRoute path="/admin" component={Admin} pass="ADMIN" />
            <PrivateRoute path="/enseignant" component={Enseignant} pass="ENSEIGNANT" />
            <PrivateRoute path="/departement" component={AssistantDpt} />
            <PrivateRoute path="/comptable" component={Comptable} pass="COMPTABLE" />
            <PrivateRoute path="/chef-departement" component={ChefDepartement} pass="CHEF_DE_DEPARTEMENT" />
            <PrivateRoute path="/directeur" component={DirecteurEcole} pass="DIRECTEUR_DE_L_ECOLE" />
            <PrivateRoute path="/directeur-etudes" component={DirecteurEtudes} pass="DIRECTEUR_DES_ETUDES" />
            <PrivateRoute path="/communication" component={Communication} pass="COMMUNICATION" />
            <PrivateRoute path="/maitre_stage" component={MaitreStage} pass="MAITRE_STAGE" />
            <PrivateRoute path="/assistant-departement" component={AssistantDpt} pass="ASSISTANT_CHEF_DEPARTEMENT" />
            <Route path="/guide" component={Guide} />
            <Route path='*' component={Page404} />
            </Switch>
          </React.Suspense>
      </BrowserRouter>
      </Provider>
    )
  }
}

export default App