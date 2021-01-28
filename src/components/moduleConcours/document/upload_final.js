// services/reportGenerator.js

import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
import { format } from "date-fns";
import all from "../../../constants/moduleConcours/someConstants";
import logo from '../../../assets/img/Logept.png'

// define a generatePDF function that accepts a data argument
const generatePDF = (data, filename, title) => {
    // initialize jsPDF
    const doc = new jsPDF("p", "mm", "a4");
    doc.setFontSize(11);
    doc.setFont("times", "normal");
    doc.text("République du Sénégal", 100, 15, null, null, "center");
    doc.text("Ministère de l'Enseignement Supérieur de la Recherche et de l'Innovation", 100, 20, null, null, "center");
    doc.text("ECOLE POLYTECHNIQUE DE THIES", 100, 25, null, null, "center");
    doc.text("DIRECTION DES ÉTUDES", 100, 30, null, null, "center");
    doc.text("BP A10, Thiès, Tel: 221 76 223 61 63", 100, 35, null, null, "center");
    doc.text("Site Web: www.ept.sn                     E-mail: dir.etudes@ept.sn", 100, 40, null, null, "center");
    //Ligne
    doc.setLineWidth(1.12);
    doc.line(15, 50, 185, 50);


    doc.addImage(logo, "PNG", 5, 9, 25, 25);
    doc.addImage(logo, "PNG", 170, 9, 25, 25);
    doc.setFontSize(20)
    doc.text(title, 100, 70, null, null, "center")

    // define the columns we want and their titles
    const tableColumn = ["N°", 'N° Table', "Prenom", "Nom", 'Date de naiss.', 'Lieu de naiss.', "Série", 'Etablissement', "Mention"];
    // define an empty array of rows
    const tableRows = [];

    // for each element pass all its data into an array
    data.forEach(element => {
        const elementData = [
            element.Num,
            element.num_table,
            element.prenom,
            element.nom,
            element.date_naissance,
            element.lieu_naissance,
            element.serie,
            element.lycee,
            element.mention
        ];
        // push each tickcet's info into a row
        tableRows.push(elementData);
    });


    // startY is basically margin-top
    doc.autoTable(tableColumn, tableRows, {
        startY: 80,
        theme: 'grid',
        fontSize: 8,
        backgroundColor: 'white',
        margins: { right: 3, left: 3, top: 3, bottom: 3 },
        renderHeader: function (doc, pageNumber, settings) {}, // Called before every page
        renderFooter: function (doc, lastCellPos, pageNumber, settings) {},


        // false, ellipsize or linebreak (false passes the raw text to renderCell)
        overflowColumns: false, // Specify which colums that gets subjected to the overflow method chosen. false indicates all
        avoidPageSplit: false, // Avoid splitting table over multiple pages (starts drawing table on fresh page instead). Only relevant if startY option is set.
        extendWidth: true,

        columnStyles: {
            0: {
                cellWidth: 15,
            },
            1: {
                cellWidth: 15,
            },
            2: {
                cellWidth: 25,
            },
            3: {
                cellWidth: 20,
            },
            4: {
                cellWidth: 25,
            },
            5: {
                cellWidth: 35,
            },
            6: {
                cellWidth: 11,
            },
            7: {
                cellWidth: 35,
            },
            8: {
                cellWidth: 24,
            }
        },
        styles: {
            minCellHeight: 8
        }  });

    doc.save(`${filename}.pdf`);
};

export default generatePDF;