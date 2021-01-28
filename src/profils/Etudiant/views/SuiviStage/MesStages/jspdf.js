import jsPDF from "jspdf"

import icone_ept from "../../../../../assets/img/Logept.png"

const generatePDF = (entreprise) => {
  const doc = new jsPDF("p", "mm", "a4")


  const today = new Date()
  const day = today.getDate()
  const month = today.getMonth()
  const year = today.getFullYear()

  const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"];

  doc.setFontSize(11)
  doc.setFont("times", "bold")
  doc.text("République du Sénégal", 100, 15, null, null, 'center')
  doc.text("Ministère de l'Enseignement Supérieur, de la Recherche et de l'Innovation", 100, 20, null, null, 'center')
  doc.text("ECOLE POLYTECHNIQUE DE THIES", 100, 25, null, null, 'center')
  doc.text("DIRECTION DES ETUDES", 100, 30, null, null, 'center')
  doc.text(" BP A-10 Thiès   Tel: 221 76 223 61 63", 100, 35, null, null, 'center')
  doc.text(`web: www.ept.sn         Email: ept@ept.sn`, 100, 40, null, null, 'center')


  //logo
  doc.addImage(icone_ept, "PNG", 17, 9, 20, 25)
  doc.addImage(icone_ept, "PNG", 164, 9, 20, 25);
  

  //Ligne
  doc.setLineWidth(1.5);
  doc.line(21, 50, 188, 50);


  doc.text("LE DIRECTEUR DES ETUDES", 21, 55, null, null, "left");
  doc.text("Nº......................... MESRI/EPT/DE", 170, 60, null, null, "right");
  doc.text(`Thies, le ${day} ${monthNames[month]} ${year}`, 175, 67, null, null, "right");
  doc.setFont("times", "bold");
  doc.text("Monsieur le Directeur Général", 170, 80, null, null, "right");
  doc.text(`de ${entreprise}`, 160, 85, null, null, "right");


  //objet
  doc.text("Objet  :", 23, 100, null, null, "left");
  doc.setLineWidth(0.5)
  doc.line(23, 101, 34, 101);
  doc.setFont("times", "normal");
  doc.text("Demande de Stage", 37, 100, null, null, "left");

  //cher Monsieur
  doc.setFont("times", "bold");
  doc.text("Monsieur le Directeur Général," , 36, 110, null, null, "left");
  doc.setFont("times", "normal");

  //corps
  doc.text("Je viens, par la présente, solliciter auprès de votre bienveillance, des postes de", 35, 120, null, null, "left")
  doc.text("stages maitrise et ouvrier pour nos étudiants en quatrième et en deuxième année du",24,125,null,null,"left")
  doc.text("cycle de formation d'ingénieurs en Génie Civil ou Génie Electromécanique",24,130,null,null,"left")

  doc.text("L'Ecole Polytechnique de Thiès forme des ingénieurs de conception qui reçoivent", 35, 140, null, null, "left")
  doc.text("une formation théorique approfondie qui doit être complétée par des stages pratiques.",24,145,null,null,"left")

  doc.text("Le stage d'une durée de quarante cinq (45) jours pour les étudiants en",35,155,null,null,"left")
  doc.text("quatrième année et de trente (30) jours pour les étudiants en deuxième année, pourrait",24,160,null,null,"left")
  doc.text("être effectué du 01 Janvier 2021.",24,165,null,null,"left")

  doc.text("Le programme de stage pourra être défini par l'entreprise", 35, 175,null,null,"left")

  doc.text("Nous vous remercions de votre collaboration et vous prions de croire, Monsieur",35,185,null,null,"left")
  // doc.text("le Directeur Général, à l’assurance de notre considération distinguée.",24,190,null,null,"left")
  doc.text("le Directeur Général, à l'assurance de notre considération distinguée",24,190,null,null,"left")

  doc.setFont("times", "bold");
  doc.text("Pr. Mamadou WADE", 170, 210, null, null, "right");











doc.save(`lettre.pdf`);

}


export default generatePDF;