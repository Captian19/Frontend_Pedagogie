import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import localization from 'moment/locale/fr';

import axios from 'axios';
import {
    CCard,
    CCardBody,
    CCol,
    CRow,
  } from '@coreui/react'
  moment.updateLocale('fr', localization);

class InscriptionAncien extends Component {
     
    state = { 
        IDE:this.props.IDE,
        nom:this.props.nom, 
        prenom:this.props.prenom,
        email:this.props.email, 
        classe:this.props.classe, 
        departement:this.props.departement, 
        anneeScolaire:this.props.anneeScolaire,
        dateNaissance : '',
        lieuNaissance : '',
        numeroCarteEtudiant : '',
        paysOrigine : 'SENEGAL',
        nationalite : 'SENEGALAISE',
        sexe : 'Masculin',
        situationMatrimoniale : 'Célibataire',
        nombreEnfants : 0, 
        adresseEtudiant : '',
        adresseVacance : '',
        emploiRetribue : 'Non',
        tempsComplet : 'Non',
        tempsPartiel : 'Non',
        lequelEmploi : 'Non',
        lieuEmploi : 'Non',
        diplomesObtenues : 'S1', 
        anneeDiplome : '',
        mentionDiplome : 'BIEN',
        dernierEtablissementFreq : 'EPT',
        anneeDernierEtablissementFreq : moment().format("YYYY"),
        inscritAutreEtablissement : 'Non',
        lequelEtablissement : '',
        conjointEtudiant : 'Non',
        professionConjoint : 'Non',
        lequelProfessionEtudiant : 'Non',
        bourseAnPasse : 'Non',
        depotDemandeBourse : 'Non',
        montantBourseParMois : '0',
        nomTuteur : '',
        adresseTuteur : '',
        telephoneTuteur : '',
        validationComptable : false,
        validationMedecin : false,
        exactitudeRenseignements : false
};



handleDateNaissanceChange = (e) => {
    this.setState({
        dateNaissance: e.target.value
    })
};

handleLieuNaissanceChange = (e) => {
    this.setState({
        lieuNaissance: e.target.value
    })
};

handleNumeroCarteEtudiantChange = (e) => {
    this.setState({
        numeroCarteEtudiant: e.target.value
    })
};

handlePaysOrigineChange = (e) => {
    this.setState({
        paysOrigine: e.target.value
    })
};


handleNationaliteChange = (e) => {
    this.setState({
        nationalite: e.target.value
    })
};

handleSexeChange = (e) => {
    this.setState({
        sexe: e.target.value
    })
};

handleSituationMatrimonialeChange = (e) => {
    this.setState({
        situationMatrimoniale: e.target.value
    })
};

handleNombreEnfantsChange = (e) => {
    this.setState({
        nombreEnfants: e.target.value
    })
};

handleAdresseEtudiantChange = (e) => {
    this.setState({
        adresseEtudiant : e.target.value
    })
};


handleAdresseVacanceChange = (e) => {
    this.setState({
        adresseVacance : e.target.value
    })
};

handleEmploiRetribueChange = (e) => {
    this.setState({
        emploiRetribue : e.target.value
    })
};


handleTempsCompletChange = (e) => {
    this.setState({
        tempsComplet : e.target.value
    })
};

handleTempsPartielChange = (e) => {
    this.setState({
        tempsPartiel : e.target.value
    })
};

handleLequelEmploiChange = (e) => {
    this.setState({
        lequelEmploi : e.target.value
    })
};

handleLieuEmploiChange = (e) => {
    this.setState({
        lieuEmploi : e.target.value
    })
};

handleDiplomesObtenuesChange = (e) => {
    this.setState({
        diplomesObtenues : e.target.value
    })
};

handleAnneeDiplomeChange = (e) => {
    this.setState({
        anneeDiplome : e.target.value
    })
};

handleMentionDiplomeChange = (e) => {
    this.setState({
        mentionDiplome : e.target.value
    })
};

handleDernierEtablissementFreqChange = (e) => {
    this.setState({
        dernierEtablissementFreq : e.target.value
    })
};

handleAnneeDernierEtablissementFreqChange = (e) => {
    this.setState({
        anneeDernierEtablissementFreq : e.target.value
    })
};

handleInscritAutreEtablissementChange = (e) => {
    this.setState({
        inscritAutreEtablissement : e.target.value
    })
};

handleLequelEtablissementChange = (e) => {
    this.setState({
        lequelEtablissement : e.target.value
    })
};

handleConjointEtudiantChange = (e) => {
    this.setState({
        conjointEtudiant: e.target.value
    })
};

handleProfessionConjointChange = (e) => {
    this.setState({
        professionConjoint : e.target.value
    })
};

handleLequelProfessionEtudiantChange = (e) => {
    this.setState({
        lequelProfessionEtudiant : e.target.value
    })
};

handleBourseAnPasseChange = (e) => {
    this.setState({
        bourseAnPasse : e.target.value
    })
};


handleDepotDemandeBourseChange = (e) => {
    this.setState({
        depotDemandeBourse : e.target.value
    })
};


handleMontantBourseParMoisChange = (e) => {
    this.setState({
        montantBourseParMois : e.target.value
    })
};

handleNomTuteurChange = (e) => {
    this.setState({
        nomTuteur : e.target.value
    })
};

handleAdresseTuteurChange = (e) => {
    this.setState({
        adresseTuteur : e.target.value
    })
};

handleTelephoneTuteurChange = (e) => {
    this.setState({
        telephoneTuteur : e.target.value
    })
};

handleValidationMedecinChange = (e) => {
    this.setState({
        validationMedecin : e.target.checked
    })
};

handleValidationComptableChange = (e) => {
    this.setState({
        validationComptable : e.target.checked
    })
};

handleExactitudeRenseignementsChange = (e) => {
    this.setState({
        exactitudeRenseignements : e.target.checked
    })
};

handleSubmit = (e) => {
    e.preventDefault();

    let form_data = new FormData();
    form_data.append('IDE', this.state.IDE);
    form_data.append('nom', this.state.nom);
    form_data.append('prenom', this.state.prenom);
    form_data.append('email', this.state.email);
    form_data.append('classe', this.state.classe);
    form_data.append('departement', this.state.departement);
    form_data.append('anneeScolaire', this.state.anneeScolaire);
    form_data.append('dateNaissance', this.state.dateNaissance);
    form_data.append('lieuNaissance', this.state.lieuNaissance);
    form_data.append('paysOrigine', this.state.paysOrigine);
    form_data.append('numeroCarteEtudiant', this.state.numeroCarteEtudiant);
    form_data.append('nationalite', this.state.nationalite);
    form_data.append('sexe', this.state.sexe);
    form_data.append('situationMatrimoniale', this.state.situationMatrimoniale);
    form_data.append('nombreEnfants ', this.state.nombreEnfants );
    form_data.append('adresseEtudiant', this.state.adresseEtudiant);
    form_data.append('adresseVacance ', this.state.adresseVacance );
    form_data.append('emploiRetribue', this.state.emploiRetribue);
    form_data.append('tempsComplet', this.state.tempsComplet);
    form_data.append('tempsPartiel', this.state.tempsPartiel);
    form_data.append('lequelEmploi', this.state.lequelEmploi);
    form_data.append('lieuEmploi', this.state.lieuEmploi);
    form_data.append('diplomesObtenues ', this.state.diplomesObtenues );
    form_data.append('anneeDiplome', this.state.anneeDiplome);
    form_data.append('mentionDiplome ', this.state.mentionDiplome );
    form_data.append('dernierEtablissementFreq ', this.state.dernierEtablissementFreq );
    form_data.append('anneeDernierEtablissementFreq ', this.state.anneeDernierEtablissementFreq );
    form_data.append('inscritAutreEtablissement', this.state.inscritAutreEtablissement);
    form_data.append('lequelEtablissement', this.state.lequelEtablissement);
    form_data.append('conjointEtudiant', this.state.conjointEtudiant);
    form_data.append('professionConjoint', this.state.professionConjoint);
    form_data.append('lequelProfessionEtudiant', this.state.lequelProfessionEtudiant);
    form_data.append('bourseAnPasse', this.state.bourseAnPasse);
    form_data.append('depotDemandeBourse ', this.state.depotDemandeBourse);
    form_data.append('montantBourseParMois ', this.state.montantBourseParMois );
    form_data.append('nomTuteur', this.state.nomTuteur );
    form_data.append('adresseTuteur ', this.state.adresseTuteur );
    form_data.append('telephoneTuteur', this.state.telephoneTuteur);
    form_data.append('exactitudeRenseignements ', this.state.exactitudeRenseignements );
    form_data.append('validationComptable', this.state.validationComptable );
    form_data.append('validationMedecin', this.state.validationMedecin);


    
    let url = 'http://127.0.0.1:8000/api/InfoEtudiantCreate';
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
        .then(res => {
            this.props.history.push("/scolarite/inscription-administrative-visite-medicale");
        })
        .catch(err => console.log(err))
  };

  displayInput = (eta) =>{
      let a = null;
          if(eta==="Oui"){
            a = "visible row mt-3"
          }
          else{
            a = "d-none"
          }

          return a
}

displayInputEcole = (eta) =>{
    let a = null;

        if(eta==="Oui"){
          a = "visible col-lg-12"
         
        }
        else{
          a = "d-none"
        }

        return a
}

displayInputCol = (eta) =>{
    let a = null;
        if(eta==="Non"){
          a = "visible col-lg-12"
        }
        else{
          a = "d-none"
        }

        return a
    }

displayInputSituationMatrimoniale = (eta) =>{
        let a = null;
            if(eta==="Marié(e)"){
              a = "visible row"
            }
            else{
              a = "d-none"
            }
  
            return a
        }

displayInputProfession = (eta) =>{
            let a = null;
                if(eta==="Oui"){
                  a = "visible"
                }
                else{
                  a = "d-none"
                }
      
                return a
            }




    render(){
        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12">
                    <div>
                        <div class="progress mb-3" style={{height: "25px"}}>
                                <div class="progress-bar progress-bar-animated progress-bar-striped" role="progressbar" style={{width:"25%", backgroundColor:"green"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">Inscription Administrative en cours... 25%</div>
                        </div>
                            
                        <form onSubmit={this.handleSubmit} className="container shadow">
                            <button class="btn btn-primary col-lg-12  mb-3 text-center bold" >ECOLE POLYTECHNIQUE DE THIES FICHE D'INSCRIPTION ADMINISTRATIVE</button>
                            <div class="form-row">
                                <div class="form-group col-md-12">
                                    <label for="inputEmail4">Numéro Carte Etudiant</label>
                                    <input value={this.state.numeroCarteEtudiant} onChange={this.handleNumeroCarteEtudiantChange} type="text" class="form-control"  required />
                                </div>
    
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="inputEmail4">Date de naissance</label>
                                    <input value={this.state.dateNaissance} onChange={this.handleDateNaissanceChange} type="date" class="form-control"  required />
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="inputPassword4">Lieu de naissance</label>
                                    <input value={this.state.lieuNaissance} onChange={this.handleLieuNaissanceChange} type="text" class="form-control"  required />
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="inputEmail4">Pays D'origine</label>
                                    <input value={this.state.paysOrigine} onChange={this.handlePaysOrigineChange} type="text" class="form-control"  required />
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="inputPassword4">Nationalité</label>
                                    <input value={this.state.nationalite} onChange={this.handleNationaliteChange} type="text" class="form-control"  required />
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="inputEmail4">Adresse de l'Etudiant</label>
                                    <input value={this.state.adresseEtudiant} onChange={this.handleAdresseEtudiantChange} type="text" class="form-control"  required />
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="inputPassword4">Adresse de Vacances</label>
                                    <input value={this.state.adresseVacance} onChange={this.handleAdresseVacanceChange} type="text" class="form-control"  required />
                                </div>
                            </div>

                            <hr style={{border : "2px solid black"}}></hr>


                            <div class="form-row">
                                    <div class="form-group col-md-4">
                                        <label for="inputState">Sexe</label>
                                        <select value={this.state.sexe} onChange={this.handleSexeChange} id="inputState" class="form-control">
                                        <option value="Masculin" selected>Masculin</option>
                                        <option value="Féminin">Féminin</option>
                                        </select>
                                    </div>

                                    <div class="form-group col-md-4">
                                        <label for="inputState">Situation Matrimoniale</label>
                                        <select value={this.state.situationMatrimoniale} onChange={this.handleSituationMatrimonialeChange} id="inputState" class="form-control">
                                        <option value="Célibataire" selected>Célibataire</option>
                                        <option value="Marié(e)">Marié(e)</option>
                                        <option value="Divorcé(e)">Divorcé(e)</option>
                                        <option value="Veuf(ve)">Veuf(ve)</option>
                                        </select>
                                    </div>

                                    <div class="form-group col-md-4">
                                        <label for="inputState">Nombre D'enfants</label>
                                        <input value={this.state.nombreEnfants} onChange={this.handleNombreEnfantsChange} type="number" class="form-control"  />
                                    </div>
                            </div>

                            <div class="form-row" className={this.displayInputSituationMatrimoniale(this.state.situationMatrimoniale)}>
                                    <div class="form-group col-md-6">
                                        <label for="inputState">SI VOUS ETES MARIE (E) VOTRE CONJOINT EST-IL ETUDIANT ?</label>
                                        <select value={this.state.conjointEtudiant} onChange={this.handleConjointEtudiantChange} id="inputState" class="form-control">
                                        <option >Oui</option>
                                        <option selected>Non</option>
                                        </select>
                                    </div>

                                    <div class="form-group col-md-3">
                                        <label for="inputState">Exerce t-il une profession ? </label>
                                        <select value={this.state.professionConjoint} onChange={this.handleProfessionConjointChange} id="inputState" class="form-control">
                                        <option value="Oui" >Oui</option>
                                        <option value="Non" selected>Non</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-md-3" className={this.displayInputProfession(this.state.professionConjoint)}>
                                        <label for="inputState">Laquelle ? </label>
                                        <input type="text" value={this.state.lequelProfessionEtudiant} onChange={this.handleLequelProfessionEtudiantChange} id="inputState" class="form-control"/>
                                        
                                    </div>
                            </div>

                    

                        <hr style={{border : "2px solid black"}}></hr>

                            <div class="form-row">
                                    
                                        <label for="inputState">Avez-vous un emploi rétribué :</label>
                                        <select value={this.state.emploiRetribue} onChange={this.handleEmploiRetribueChange} id="inputState" class="form-control">
                                        <option value="Oui" >Oui</option>
                                        <option value="Non" selected>Non</option>
                                        </select>
                                
                            </div>

                            <div className="form-row" className={this.displayInput(this.state.emploiRetribue)} >
                                <div class="form-group col-md-12"   >
                                            <label for="inputState" >A temps partiel : </label>
                                            <select value={this.state.tempsPartiel} onChange={this.handleTempsPartielChange} id="inputState" class="form-control">
                                            <option >Oui</option>
                                            <option>Non</option>
                                            </select>
                                </div>
                                <div class="form-group col-md-12" className={this.displayInputCol(this.state.tempsPartiel)} >
                                            <label for="inputState">A temps complet : </label>
                                            <select value={this.state.tempsComplet} onChange={this.handleTempsCompletChange} id="inputState" class="form-control">
                                            <option value="Oui" >Oui</option>
                                            <option value="Non" selected>Non</option>
                                            </select>
                                </div>
                            </div>

                            
                            <div class="form-row" className={this.displayInput(this.state.emploiRetribue)}>
                                <div class="form-group col-md-6">
                                    <label for="inputEmail4">Lequel</label>
                                    <input value={this.state.lequelEmploi} onChange={this.handleLequelEmploiChange} type="text" class="form-control"  />
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="inputPassword4">Lieu D'exercice</label>
                                    <input value={this.state.lieuEmploi} onChange={this.handleLieuEmploiChange} type="text" class="form-control"  />
                                </div>
                            </div>

                            <hr style={{border : "2px solid black"}}></hr>

                            <div class="form-row">
                                    <div class="form-group col-md-4">
                                        <label for="inputState">BACCALAUREAT : Série</label>
                                        <select value={this.state.diplomesObtenues} onChange={this.handleDiplomesObtenuesChange} id="inputState" class="form-control">
                                        <option value="S1" selected>S1</option>
                                        <option value="S2" >S2</option>
                                        <option value="S3" >S3</option>
                                        </select>
                                    </div>

                                    <div class="form-group col-md-4">
                                        <label for="inputState">Année </label>
                                        <input  value={this.state.anneeDiplome} onChange={this.handleAnneeDiplomeChange} type="text" class="form-control"/>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label for="inputState">Mention </label>
                                        <select value={this.state.mentionDiplome} onChange={this.handleMentionDiplomeChange} id="inputState" class="form-control">
                                        <option value="Bien" selected>Bien</option>
                                        <option value="Trés Bien">Trés Bien</option>
                                        <option value="Assez Bien">Assez Bien</option>
                                        <option value="Passable">Passable</option>
                                        </select>
                                    </div>
                            </div>

                            <div class="form-row d-none">
                                <div class="form-group col-md-6">
                                    <label for="inputEmail4">Dernier Etablissement fréquenté (Pour les nouveaux)</label>
                                    <input value={this.state.dernierEtablissementFreq} onChange={this.handleDernierEtablissementFreqChange} type="text" class="form-control"  />
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="inputPassword4">Année</label>
                                    <input value={this.state.anneeDernierEtablissementFreq} onChange={this.handleAnneeDernierEtablissementFreqChange} type="text" class="form-control"  />
                                </div>
                            </div>

                            <div class="form-row d-none" >
                                <div class="form-group col-md-12">
                                    <label for="inputEmail4">ETES-VOUS INSCRIT DANS UN AUTRES ETABLISSEMENT ?</label>
                                    <select value={this.state.inscritAutreEtablissement} onChange={this.handleInscritAutreEtablissementChange} id="inputState" class="form-control">
                                        <option value="Oui" >Oui</option>
                                        <option value="Non" selected>Non</option>
                                        </select>
                                    </div>
                                <div class="form-group col-md-6" className={this.displayInputEcole(this.state.inscritAutreEtablissement)}>
                                    <label for="inputPassword4">Lequel (Faculté - Institut)</label>
                                    <input value={this.state.lequelEtablissement} onChange={this.handleLequelEtablissementChange} type="text" class="form-control"  />
                                </div>
                            </div>

                            <hr style={{border : "2px solid black"}}></hr>

                        
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="inputEmail4">Aviez-Vous une Bourse ou une Allocation D'etude l'an passé ?</label>
                                    <select value={this.state.bourseAnPasse} onChange={this.handleBourseAnPasseChange} id="inputState" class="form-control">
                                        <option value="Oui" >Oui</option>
                                        <option value="Non" selected>Non</option>
                                    </select>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="inputPassword4">Avez-vous déposé cette année une demande de bourse  ?</label>
                                    <select value={this.state.depotDemandeBourse} onChange={this.handleDepotDemandeBourseChange} id="inputState" class="form-control">
                                        <option value="Oui" >Oui</option>
                                        <option value="Non" selected>Non</option>
                                    </select>
                                </div>

                            
                            </div>
                            <div class="form-group col-md-12" className={this.displayInputEcole(this.state.bourseAnPasse)}>
                                    <label for="inputPassword4">Si vous avez une bourse ou une Allocation indiquez le montant ?</label>
                                    <input type="number" value={this.state.montantBourseParMois} onChange={this.handleMontantBourseParMoisChange} id="inputState" class="form-control"/>
                                </div>

                            <hr style={{border : "2px solid black"}}></hr>

                            <div class="form-row" >
                                <div class="form-group col-md-4">
                                        <label for="inputPassword4">Nom du Tuteur</label>
                                        <input value={this.state.nomTuteur} onChange={this.handleNomTuteurChange} type="text" class="form-control"  required />
                                </div>

                                <div class="form-group col-md-4">
                                        <label for="inputPassword4">Adresse du Tuteur</label>
                                        <input value={this.state.adresseTuteur} onChange={this.handleAdresseTuteurChange} type="text" class="form-control"  required />
                                </div>
                            
                                <div class="form-group col-md-4">
                                        <label for="inputPassword4">Téléphone du Tuteur</label>
                                        <input value={this.state.telephoneTuteur} onChange={this.handleTelephoneTuteurChange} type="text" class="form-control"  required />
                                </div>
                            
                            
                            </div>
            
                                <div class="form-check text-center">
                                    <input value={this.state.exactitudeRenseignements} onChange={this.handleExactitudeRenseignementsChange} class="form-check-input" required type="checkbox" id="gridCheck"/>
                                    <label class="form-check-label" for="gridCheck">
                                    JE CERTIFIE L'EXACTITUDE DES RENSEIGNEMENTS CI-DESSUS
                                    </label>
                                </div>
                        
                                <button type="submit" class="btn btn-primary col-lg-12 mt-3 mb-3 text-center" >Valider Le Formulaire D'inscription</button>
                    </form>
                </div>
                </CCol>
            </CRow>
            </CCardBody>
            </CCard>
        )
    }
}

export default withRouter(InscriptionAncien)