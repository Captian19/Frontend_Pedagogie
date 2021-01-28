import React from 'react'
import Button from 'react-bootstrap/Button';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export const ExportCSV = ({csvData, fileName}) => {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData, fileName) => {
        console.log(csvData)
        csvData.map(el => {
            delete el.id;
            delete el.id_lycee;
            delete el.telephone;
            delete el.pays;
            delete el.moy_gen_bac;
            delete el.moy_gen_premiere;
            delete el.moy_gen_seconde;
            delete el.moy_gen_terminale;
            delete el.moy_gen_secondaire;
            delete el.moyenne_generale;
            delete el.moyenne_ponderee;
            delete el.mention;
            delete el.id_lot;
            delete el.anonymat_candidat;
            delete el.has_confirmed;
            delete el.type_candidat;
            delete el.filieres;
            delete el.moy_concours;
            delete el.annee_obtention_bac;
        })
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <button className="btn btn-pill btn-success" onClick={(e) => exportToCSV(csvData,fileName)}>Télécharger Excel</button>
    )
}