import React, { Component } from "react";
import axios from 'axios';
class Profil extends Component {
    state = { 
        numeroCarteEtudiant : '',
        paysOrigine : '',
        nationalite : '',
        sexe : '',
        situationMatrimoniale : '',
        nombreEnfants : '', 
        adresseEtudiant : '',
        adresseVacance : '',
        emploiRetribue : '',
        tempsComplet : '',
        tempsPartiel : '',
        lequelEmploi : '',
        lieuEmploi : '',
        diplomesObtenues : '', 
        anneeDiplome : '',
        mentionDiplome : '',
        dernierEtablissementFreq : '',
        anneeDernierEtablissementFreq : '',
        inscritAutreEtablissement : '',
        lequelEtablissement : '',
        conjointEtudiant : '',
        professionConjoint : '',
        lequelProfessionEtudiant : '',
        bourseAnPasse : '',
        depotDemandeBourse : '',
        montantBourseParMois : '',
        nomTuteur : '',
        adresseTuteur : '',
        telephoneTuteur : '',
        exactitudeRenseignements : '',
        validationMedecin : '',
        validationComptable : true
};


handleNumeroCarteEtudiantChange = (e) => {
    this.setState({
        numeroCarteEtudiant: e.target.value
    })
};


handleValidationMedecinChange = (e) => {
    this.setState({
        validationMedecin: e.target.checked
    })
};

handleValidationComptableChange = (e) => {
    this.setState({
        validationComptable: e.target.checked
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

handleExactitudeRenseignementsChange = (e) => {
    this.setState({
        exactitudeRenseignements : e.target.checked
    })
};

componentDidMount(){

    // const id = this.props.match.params.id;
    let url = 'http://127.0.0.1:8000/api/InfoEtudiantDetail/1';
    axios.get(url, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then(response => {
        this.setState({

            numeroCarteEtudiant : response.data.numeroCarteEtudiant,
            paysOrigine : response.data.paysOrigine,
            nationalite : response.data.nationalite,
            sexe : response.data.sexe,
            situationMatrimoniale : response.data.situationMatrimoniale,
            nombreEnfants : response.data.nombreEnfants, 
            adresseEtudiant : response.data.adresseEtudiant,
            adresseVacance : response.data.adresseVacance,
            emploiRetribue : response.data.emploiRetribue,
            tempsComplet : response.data.tempsComplet,
            tempsPartiel : response.data.tempsPartiel,
            lequelEmploi : response.data.lequelEmploi,
            lieuEmploi : response.data.lieuEmploi,
            diplomesObtenues : response.data.diplomesObtenues, 
            anneeDiplome : response.data.anneeDiplome,
            mentionDiplome : response.data.mentionDiplome,
            dernierEtablissementFreq : response.data.dernierEtablissementFreq,
            anneeDernierEtablissementFreq : response.data.anneeDernierEtablissementFreq,
            inscritAutreEtablissement : response.data.inscritAutreEtablissement,
            lequelEtablissement : response.data.lequelEtablissement,
            conjointEtudiant : response.data.conjointEtudiant,
            professionConjoint : response.data.professionConjoint,
            lequelProfessionEtudiant : response.data.lequelProfessionEtudiant,
            bourseAnPasse : response.data.bourseAnPasse,
            depotDemandeBourse : response.data.depotDemandeBourse,
            montantBourseParMois : response.data.montantBourseParMois,
            nomTuteur : response.data.nomTuteur,
            adresseTuteur : response.data.adresseTuteur,
            telephoneTuteur : response.data.telephoneTuteur,
            exactitudeRenseignements : response.data.exactitudeRenseignements,
            validationMedecin : response.data.validationMedecin
            
        })
        console.log(response.data)

        
    })
    .catch(e =>{
        console.log(e)
        console.log("Error")
    })
 
}


handleSubmit = (e) => {
    e.preventDefault();

    let form_data = new FormData();
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
    form_data.append('validationMedecin', this.state.validationMedecin);
    form_data.append('validationComptable', this.state.validationComptable);
    form_data.append('exactitudeRenseignements ', this.state.exactitudeRenseignements );

    
    let url = 'http://127.0.0.1:8000/api/InfoEtudiantUpdate/1';
    axios.put(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
        .then(res => {
          
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


    render() { 
        return ( 
            <div class="col-md-3 mt-3 container ">
                <form  onSubmit={this.handleSubmit} className="container shadow mt-5">

                    <div className="d-none">
                    <button class="btn btn-primary col-lg-12 mt-3  mb-3 text-center bold" >ECOLE POLYTECHNIQUE DE THIES FICHE D'INSCRIPTION ADMINISTRATIVE</button>

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
            <input  value={this.state.anneeDiplome} onChange={this.handleAnneeDiplomeChange} type="date" class="form-control"/>
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

<div class="form-row">
    <div class="form-group col-md-6">
        <label for="inputEmail4">Dernier Etablissement fréquenté (Pour les nouveaux)</label>
        <input value={this.state.dernierEtablissementFreq} onChange={this.handleDernierEtablissementFreqChange} type="text" class="form-control"  />
    </div>
    <div class="form-group col-md-6">
        <label for="inputPassword4">Année</label>
        <input value={this.state.anneeDernierEtablissementFreq} onChange={this.handleAnneeDernierEtablissementFreqChange} type="date" class="form-control"  />
    </div>
</div>

<div class="form-row">
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

<div class="form-group col-md-4">
            <label for="inputPassword4">Medecin</label>
            <input checked={this.state.validationMedecin} onChange={this.handleValidationMedecinChange} type="checkbox" class="form-control"   />
</div>
<div class="form-group col-md-4">
            <label for="inputPassword4">Comptable</label>
            <input checked={this.state.validationComptable} onChange={this.handleValidationComptableChange} type="checkbox" class="form-control"   />
</div>


    <div class="form-check text-center">
        <input value={this.state.exactitudeRenseignements} onChange={this.handleExactitudeRenseignementsChange} class="form-check-input" type="checkbox" id="gridCheck"/>
        <label class="form-check-label" for="gridCheck">
        JE CERTIFIE L'EXACTITUDE DES RENSEIGNEMENTS CI-DESSUS
        </label>
    </div>
                    </div>
                        

            <div class="testimonial text-center">
            
            <div class="avatar mx-auto mt-3">
            <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(26).jpg" class="rounded-circle img-fluid mt-3" width="100px"/>
            </div>
        
            <h4 class="font-weight-bold mt-4 text-center">{this.props.etudiant.sexe}</h4>
            <h6 class="blue-text font-weight-bold my-3 text-center">DIC1 GIT</h6>
            <button type="submit" class="btn btn-primary justify-content-center">Consulter</button>

        </div>

                </form>
        
            </div>
         );
    }
}
 
export default Profil;