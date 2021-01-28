import axios from 'axios';

/**
 * Fuction for sending a new planning to the server
 * @param {String} classe 
 * @param {Date} dateDebut 
 * @param {Date} dateFin 
 * @param {Array} seances
 * @param {String} annee 
 */
export async function save(classe, departement, dateDebut, dateFin, seances, annee){

    var response = "";
    const planning = {
        dateDebut: dateDebut,
        dateFin: dateFin,
        seances: seances,
    }
    await axios.post("http://localhost:8000/api/plannings/", {planning : planning, classe: classe, departement: departement, annee: annee}).then(res => {
        response = res;
    })

    return response;
}

/**
 * It is a function for loading all the last plannings of a given prof 
 * @param {Str} id_prof
 * @param {Boolean} current 
 */
export async function loadPlanningsProf(id_prof, annee){
    var response = [];

    await axios.get("http://localhost:8000/api/plannings/allplannings/" + id_prof + "/" + annee).then(res => {
        if (res.status < 400) response = res.data;
        else alert("Problème lors du chargement des données");
    })
    return response;
}

export async function loadProgression(id_progression){
    var response = {};

    await axios.get("http://localhost:8000/api/cahier/progression/" + id_progression).then(res => {
        if (res.status < 400) response = res.data;
        else alert("Problème lors du chargement des données");
    })
    return response;

}

export async function loadPlanningsClasse(niveau, departement, annee){
    var response = [];

    await axios.get("http://localhost:8000/api/plannings/planning/" + niveau + "/" + departement + "/" + annee).then(res => {
        if (res.status < 400) response = res.data;
        else alert("Problème lors du chargement des données");
    })
    return response;
}