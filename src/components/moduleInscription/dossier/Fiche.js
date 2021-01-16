import React, { Component } from 'react';
import {html2canvas} from 'html2canvas';
import jsPDF from 'jspdf';
import html2PDF from 'jspdf-html2canvas';
import { element } from 'prop-types';
import Entete from '../Entete';


class FicheInscription extends Component {
    
    print = () =>{
        
        let page = document.getElementById('page');
    html2PDF(page, {
        jsPDF: {
        format: 'a4',
        },
        imageType: 'image/jpeg',
        output: './pdf/generate.pdf'
    });
    }

    displayMatrimoniale = (eta) =>{
        let a = null;
              if(eta==="Marié(e)"){
                a = "visible border mt-3"
              }
              else{
                a = "d-none"
              }
    
              return a
      }

    displayConjoint = (eta) =>{
        let a = null;
              if(eta==="Célibataire"){
                a = "d-none"
              }
              else{
                a = "visible border mt-3"
              }
    
              return a
      }

      displayLequel = (eta) =>{
        let a = null;
              if(eta==="Oui"){
                a = "visible border mt-3"
              }
              else{
                a = "d-none"
              }
    
              return a
      }
      displayLequel2 = (eta) =>{
        let a = null;
              if(eta==="Oui"){
                a = "visible ml-5"
              }
              else{
                a = "d-none"
              }
    
              return a
      }

      displayTempsNon = (eta) =>{
        let a = null;
              if(eta==="Non"){
                a = "visible ml-5"
              }
              else{
                a = "d-none"
              }
    
              return a
      }
      displayTempsOui = (eta) =>{
        let a = null;
              if(eta==="Oui"){
                a = "d-none"
              }
              else{
                a = "visible ml-5"
              }
    
              return a
      }

      displayBourse = eta =>{
        let a = null;
        if(eta==="Oui"){
          a = "visible ml-3"
        }
        else{
          a = "d-none"
        }

        return a

      }




    


  




render() { 
                
return (

<div>
    <div id="page"  className="mt-5 container mb-5 border">
        <div class="col-lg-12 text-right">
            <p className="mt-5">Année Universitaire : <label className="font-weight-bold"> {this.props.Etudiant.anneeScolaire}</label></p>
        </div>
        <Entete/>
        <div class="mt-3">
            <div className=" row">
                <div className="col-lg-3  mt-4">
                    <label>N° Carte d'Etudiant : <label className="font-weight-bold">{this.props.Etudiant.numeroCarteEtudiant}</label></label>
                </div>
                <div className="col-lg-3  mt-3">
                    <label>Classe : <label className="font-weight-bold">{this.props.Etudiant.classe}</label></label>
                </div>
                <div className="col-lg-3 mt-3">
                    <label>Département : <label className="font-weight-bold">{this.props.Etudiant.departement}</label></label>
                </div>
            </div>
        </div>
        <div className="mt-3  border">
            <div className="row mt-3 ">
                <div className="col-lg-3 ">
                    <label>Nom : <label className="font-weight-bold">{this.props.Etudiant.nom}</label></label>
                </div>
                <div className="col-lg-3">
                    
                </div>
                <div className="col-lg-3">
                    <label>Prénom : <label className="font-weight-bold">{this.props.Etudiant.prenom}</label></label>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-3 ">
                    <label>Né(e) le <label className="font-weight-bold">{this.props.Etudiant.dateNaissance}</label></label>
                </div>
                <div className="col-lg-3">
                    
                </div>
                <div className="col-lg-3 ">
                    <label>à  : <label className="font-weight-bold">{this.props.Etudiant.lieuNaissance}</label></label>
                </div>
            </div>
            <div className="row ">
                <div className="col-lg-3 ">
                    <label>Pays D'origine : <label className="font-weight-bold">{this.props.Etudiant.paysOrigine}</label></label>
                </div>
                <div className="col-lg-3 ml-5">
                    
                </div>
                <div className="ccol-lg-3 ml-5">
                    <label>Nationalité : <label className="font-weight-bold">{this.props.Etudiant.nationalite}</label></label>
                </div>
            </div>
        </div>

        <div className="mt-3 border">
            <div className="row mt-3">
                <div className="col-lg-3">
                    <label>Sexe : <label className="font-weight-bold sexe" >{this.props.Etudiant.sexe} </label></label>
                </div>
                <div className="col-lg-3 ml-5">
                    
                    </div>
                <div className="col-lg-3 ">
                    <label>Situation Matrimoniale : <label className="font-weight-bold sexe" >{this.props.Etudiant.situationMatrimoniale} </label> </label>
                </div>
            </div>
        </div>
        <div className="mt-3 border" className={this.displayMatrimoniale(this.props.Etudiant.situationMatrimoniale)}>
            <div className="row mt-3 ml-5">
                <label>SI VOUS ETES MARIE (E) VOTRE CONJOINT EST-IL ETUDIANT ? : <label className="font-weight-bold sexe" >{this.props.Etudiant.conjointEtudiant} </label></label>
            </div>
            <div className="row">
                <div className="col-lg-3">
                    <label>Exerce t-il une profession ? : <label className="font-weight-bold sexe" >{this.props.Etudiant.professionConjoint} </label></label>
                </div>
                <div className="col-lg-3 ml-5">
                    
                </div>
                <div className="col-lg-3" className={this.displayLequel2(this.props.Etudiant.lequelProfessionEtudiant)}>
                    <label>&nbsp; &nbsp; Laquelle ? : <label className="font-weight-bold sexe" >{this.props.Etudiant.lequelProfessionEtudiant} </label> </label>
                </div>
            </div>
        </div>
        <div className="mt-3 border">
            <div className="row mt-3">
                <div className="col-lg-3">
                    <label>Adresse de l'Etudiant : <label className="font-weight-bold">{this.props.Etudiant.adresseEtudiant}</label></label>
                </div>
                <div className="col-lg-3">
                    
                </div>
                <div className="col-lg-3">
                    <label>Adresse de Vacance : <label className="font-weight-bold">{this.props.Etudiant.adresseVacance}</label></label>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-3 ">
                    <label>Téléphone :  <label className="font-weight-bold"></label></label>
                </div>
                <div className="col-lg-3">
                    
                </div>
                <div className="col-lg-3">
                    <label >Email : <label className="font-weight-bold">{this.props.Etudiant.email}</label></label>
                </div>
            
            </div>
  
        </div>

        <div className="mt-3 border" className={this.displayLequel(this.props.Etudiant.emploiRetribue)} >
            <div className="row mt-3 ">
                <div className="col-lg-3">
                    <label>Avez-vous un emploie retribué ?  <label className="font-weight-bold">{this.props.Etudiant.emploiRetribue}</label></label>
                </div>

                <div className="col-lg-3"  className={this.displayTempsOui(this.props.Etudiant.tempsPartiel)}>
                    <label > &nbsp; &nbsp;A temps complet ? <label className="font-weight-bold" >{this.props.Etudiant.tempsComplet}</label></label>
                </div>
                <div className="col-lg-3"  className={this.displayTempsNon(this.props.Etudiant.tempsComplet)}>
                    <label > &nbsp; &nbsp;A temps partiel <label className="font-weight-bold" >{this.props.Etudiant.tempsPartiel}</label></label>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-lg-3">
                    <label>Lequel : <label className="font-weight-bold">{this.props.Etudiant.lequelEmploi}</label></label>
                </div>
                <div className="col-lg-3">
                    
                </div>
                <div className="col-lg-3">
                    <label>Lieu D'exercice : <label className="font-weight-bold">{this.props.Etudiant.lieuEmploi}</label></label>
                </div>
            </div>
        </div>

        <div className="mt-3 border">
            <div className="row mt-3 ">
                    <div className="col-lg-3">
                        <label> BACCALAUREAT Série : <label className="font-weight-bold">{this.props.Etudiant.diplomesObtenues}</label></label>
                    </div>
                    <div className="col-lg-3 ">
                        <label>Année : <label className="font-weight-bold">{this.props.Etudiant.anneeDiplome}</label></label>
                    </div>
                    <div className="col-lg-3">
                        <label>Mention : <label className="font-weight-bold">{this.props.Etudiant.mentionDiplome}</label></label>
                    </div>
            </div>
        </div>
        <div className="mt-3 border">
            <div className="row mt-3">
                    <div className="col-lg-3">
                        <label>Dernier Etablissement Fréquenté : <label className="font-weight-bold">{this.props.Etudiant.dernierEtablissementFreq}</label></label>
                    </div>
                    <div className="col-lg-3">
                    
                    </div>
                    <div className="col-lg-3">
                        <label>Année : <label className="font-weight-bold">{this.props.Etudiant.anneeDernierEtablissementFreq}</label></label>
                    </div>
            </div>
        </div>

        <div className="mt-3 border">
            <div className="row mt-3 ">
                    <div className="col-lg- 3 ml-5">
                        <label>Etes-vous inscrit dans un autre Etablissement ? <label className="font-weight-bold">{this.props.Etudiant.inscritAutreEtablissement}</label> </label>
                    </div>    
                    <div className="col-lg-3 ">
                    
                    </div>
                    <div className="col-lg-3" className={this.displayLequel2(this.props.Etudiant.inscritAutreEtablissement)}>
                        <label>&nbsp;&nbsp;&nbsp;Lequel (Faculté ou Institut) : <label className="font-weight-bold"> {this.props.Etudiant.dernierEtablissementFreq}</label></label>
                    </div>        
            </div>

        </div>

        <div className="mt-3 border" className={this.displayConjoint(this.props.Etudiant.situationMatrimoniale)}>
            <div className="row mt-3 ">
                    <div className="col-lg-3 ">
                        <label>Si vous êtes marié(e) votre conjoint est-il etudiant?  <label className="font-weight-bold">{this.props.Etudiant.conjointEtudiant}</label> </label>
                    </div>     
                    <div className="col-lg-3 ">
                    
                    </div> 
                    <div className="col-lg-3 ">
                        <label>Exerce t-il une profession ?  <label className="font-weight-bold">{this.props.Etudiant.professionConjoint} </label>  </label>
                    </div>      
            </div>
            <div className="row ml-5">
                <label>Laquelle ? <label  className="font-weight-bold " >{this.props.Etudiant.professionConjoint}</label></label>
            </div>
        </div>

        <div className="mt-3 border">
            <div className="row mt-3 ">
                    <div className="col-lg-12">
                        <label>Aviez vous une bourse ou une allocation d'etude l'an passé ? <label className="font-weight-bold">{this.props.Etudiant.bourseAnPasse}</label> </label>
                    </div>       
            </div>
            <div className="row mt-3 ">
                    <div className="col-lg-12">
                        <label>Avez vous déposé cette année une demande de bourse ? <label className="font-weight-bold">{this.props.Etudiant.depotDemandeBourse}</label></label>
                    </div>
            </div>
            <div className="row mt-3 " className={this.displayBourse(this.props.Etudiant.depotDemandeBourse)}>
                    <div className="col-lg-12">
                        <label> &nbsp;&nbsp; &nbsp;&nbsp;Si vous avez une bourse ou une allocation indiquez le montant par mois : <label className="font-weight-bold">{this.props.Etudiant.montantBourseParMois}  <label ></label></label> </label>
                    </div>         
            </div>
        </div>

        <div className="mt-3 border mb-3">

            <div className="row mt-3">
                    <div className="col-lg-3">
                        <label>Nom Tuteur : <label className="font-weight-bold">{this.props.Etudiant.nomTuteur}</label></label>
                    </div>
                    <div className="col-lg-3">
                        <label>Adresse du Tuteur : <label className="font-weight-bold">{this.props.Etudiant.adresseTuteur}</label></label>
                    </div>
                    <div className="col-lg-3">
                        <label>Téléphone du Tuteur : <label className="font-weight-bold">{this.props.Etudiant.telephoneTuteur}</label></label>
                    </div>
            </div>
        </div>
        <div className="row mt-5">
            <div className="col-lg-3 text-left">
                <label >Thies le, <label className="font-weight-bold">{this.props.Etudiant.date}</label></label>
            </div>
            <div className="col-lg-3">
                    
            </div>
            <div className="col-lg-3  text-right">
                <label >Signature  de l'Etudiant <label className="font-weight-bold"></label></label>
            </div>
        </div>
    </div>
    <div className="col-lg-12 text-center">
        <button type="submit" className="btn btn-primary mt-5 col-lg-4 ml-3 " onClick={this.print} id="btn">Imprimer le Document</button>
    </div>
</div>



);
    }

}
export default FicheInscription;