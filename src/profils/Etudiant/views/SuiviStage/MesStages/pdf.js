import React from "react";
import { CCard  } from '@coreui/react'

import "../../../../../assets/SuiviStage/css/lettre.css";

import icone_ept from "../../../../../assets/SuiviStage/img/favicon.ico"


import generer from "./jspdf"
const today = new Date()
const day = today.getDate()
const month = today.getMonth()
const year = today.getFullYear()

const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"];


function PDF({match}) {
  return (
    <>
    <h3>Lettre de stage</h3>
    <button className="btn btn-pill btn-danger" onClick={e=>generer(match.params.entreprise)}>  +Télécharger le PDF</button>
      <CCard style={{width:"60rem", margin:"1% 10%"}}> 
      
          
        <div  id="lettre_stage">
          

          <div id="header">
            <div id="entete">

              <div id="gauche">
                <img src={icone_ept} alt="icone_ept" style={{width:'100%'}}/>
              </div>

            <div id="ministere">
              <span style={{marginLeft:'14em'}}><b>République du Sénégal</b></span><br/>

              <span><b>Ministère de l'Enseignement Supérieur, de la Recherche et de l'Innovation</b></span>

            </div>

              <div id="contact">
                <span style={{marginLeft:'4em'}}>  <b>ECOLE POLYTECHNIQUE DE THIES</b> </span> <br/>

                <span style={{marginLeft:'6.3em'}}> <b>DIRECTION DES ETUDES</b> </span> <br/>

                <span style={{marginLeft:'2em'}}>
                  <b> BP A-10 Thiès   <u>Tel :</u> 221 76 223 61 63</b>
                </span>
                <br/>

                <span><b>web:</b> <u style={{color:'blue'}}>www.ept.sn</u></span>

                <span style={{marginLeft:'5em'}}><b>Email:</b> <u style={{color:'blue'}}>ept@ept.sn</u></span>
                </div>
            </div>

            <div id="droite">
                <img src={icone_ept} alt="icone_ept" style={{width:'100%'}}/>
              </div>

            <div id="expediteur"><b>Le DIRECTEUR DES ETUDES</b></div>
            <div id="numero"><b>Nº......................... MESRI/EPT/DE</b></div>
            <div id="jour"><b>Thies, le {day} {monthNames[month]} {year}</b></div>
            <div id="destinataire">
              <div>Monsieur le Directeur Général</div>
              <div style={{marginLeft:'15px'}}> de {match.params.entreprise} </div>
            </div>
          </div>

          <div id="corps">
            <div id="objet">
              <span>
                <b>
                  <u>OBJET</u> : 
                </b>{" "}
                Demande de stage
              </span>
            </div>
            <div id="cher">
              <b>Monsieur le Directeur Général,</b>
            </div>

            <div id="contenu">
              
                <p>
                <span style={{marginLeft:'3rem'}}> Je viens, par la présente, solliciter auprès de votre
                  bienveillance, des postes de</span>
                  <br />
                  stages maitrise et ouvrier pour nos étudiants en quatrième et
                  en deuxième année du
                  <br />
                  cycle de formation d’ingénieurs en Génie Civil ou Génie
                  Electromécanique. <br />
                </p>
             


                <p>
                <span style={{marginLeft:'3rem'}}>
                  L’Ecole Polytechnique de Thiès forme des ingénieurs de
                  conception qui reçoivent</span>
                  <br />
                  une formation théorique approfondie qui doit être complétée
                  par des stages pratiques.
                  <br />
                </p>

              
                <p>
                <span style={{marginLeft:'3rem'}}>
                  Le stage d’une durée de quarante cinq (45) jours pour les
                  étudiants en</span>
                  <br />
                  quatrième année et de trente (30) jours pour les étudiants en
                  deuxième année, pourrait
                  <br />
                  être effectué à partir du 01 Janvier 2021. <br />
                </p>
             
                <p>
                <span style={{marginLeft:'3rem'}}>
                  Le programme de stage pourra être défini par l’entreprise.
                  </span>
                </p>

                <p>
                <span style={{marginLeft:'3rem'}}>
                  Nous vous remercions de votre collaboration et vous prions de
                  croire, <b>Monsieur</b> </span>
                  <br />
                  <b>le Directeur Général</b>, à l’assurance de notre
                  considération distinguée.
                </p>

            </div>

            <div id="signature">
              <b>Pr. Mamadou WADE</b>
            </div>
          </div>
        </div>
      </CCard> 


      

     
    </>
  );
}

export default PDF;
