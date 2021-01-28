import axios from "axios";

/**
 * A function for loading all the notes of the eleve from the database
 * @param {*} id_eleve 
 */
export async function loadNotesEleve(id_eleve) {
    var response = [];
    await axios.get("http://localhost:8000/api/notes/eleve/" + id_eleve).then(res => {
        response = res.data;
    });
    return response;
}

/**
 * This is a service for getting all the notes of a given Progression Cours
 * @param {*} id_progression 
 */
export async function loadNoteCours(id_progression) {
    // console.log(id_progression);
    var response = {};
    await axios.get("http://localhost:8000/api/notes/progression/" + id_progression).then(res => {
        response = res.data;
        if (res.status > 400) {
            alert("Il y a eu un problème lors du chargement des notes.");
        }
    })

    return response;
}

export async function saveNotes(id_progression, notes, ponderations) {
    var status = 0;
    await axios.post("http://localhost:8000/api/notes/add/" + id_progression + "/", { 'notes_eleves': notes, 'ponderations': ponderations }).then(response => status = response.status);

    return status;
}

export async function updatePonderations(id_progression, ponderations) {
    var status = 0;

    await axios.put("http://localhost:8000/api/notes/progression/ponderations/" + id_progression + "/", { 'ponderations': ponderations }).then(response => status = response.status);

    return status;
}

export async function loadResultatAnnuelClasse(id_classe) {

    var response = {};

    await axios.get("http://localhost:8000/api/notes/bulletins/" + id_classe).then(res => {
        if (res.status < 400) response = res.data;
        else alert("Problème lors de la récupération des données");
    })
    return response;
}

export async function loadResultatAnnuelEleve(id_eleve) {

    var response = {};

    await axios.get("http://localhost:8000/api/notes/bulletin/" + id_eleve).then(res => {
        if (res.status < 400) response = res.data;
        else alert("Problème lors de la récupération des données");
    })
    return response;
}

/**
 * This methos is for getting the notes in the table of deliberation
 * This table is used to deliberate and we see it every semester's end
 * @param {String} id_classe 
 */
export async function loadTableauNotesSemestriel(id_classe = "5ff103a2e821857dd4c3b50f", semestre) {
    var response = [];

    await axios.get("http://localhost:8000/api/notes/tableau-deliberation/" + id_classe).then(res => {
        if (res.status < 400) response = res.data;
        else alert("Problème lors de la récupération des données");
    })
    return response;
}

export async function deleteEvaluation(id_progression, type_evaluation) {
    var status = 401;
    try {
        await axios.put("http://localhost:8000/api/notes/supprimer-evaluation/" + id_progression + "/", { "type_evaluation": type_evaluation }).then(res => status = res.status)

    } catch (e) { console.log(e) }
    return status;
}

export async function changeNoteFinale(id_note, new_value){
    var status = 401;
    try {
        await axios.put("http://localhost:8000/api/notes/tableau-deliberation/" + id_note + "/", { "note_finale": new_value }).then(res => status = res.status)

    } catch (e) { console.log(e) }
    return status;
}

// export async function createBulletins(id_classe="5feb904d9388d767440b1708", semestre=1, notes, deliberations){
export async function createBulletins(id_classe, semestre, notes, deliberations, annee){

    var response = [];
    try {
        await axios.post("http://localhost:8000/api/notes/bulletins/" + id_classe + "/" + semestre + "/", { notes: notes, deliberations: deliberations , annee: annee}).then(res => response = res.data)

    } catch (e) { console.log(e) }
    return response;
}

export async function loadBulletins(id_classe, annee, semestre=1){

    var response = [];
    try {
        await axios.get("http://localhost:8000/api/notes/bulletins/" + id_classe + "/" + annee  + "/" + semestre + "/").then(res => response = res.data)
    } catch (e) { console.log(e) }
    return response;
}

export async function loadBulletinEleve(id_eleve){
    var response = {};
    await axios.get("http://localhost:8000/api/notes/bulletin/eleve/" + id_eleve).then(res => response = res.data)

    return response;
}

export async function loadAllBulletinsEleve(id_user){
    var response = [];
    await axios.get("http://localhost:8000/api/notes/all-bulletins/eleve/" + id_user).then(res => response = res.data)

    return response;
}

export async function loadClasses(departement){
    var response = [];
    try {
        await axios.get("http://localhost:8000/api/notes/classes/" + departement ).then(res => response = res.data)
    } catch (e) { console.log(e) }
    return response;
}

export async function simulerBulletin(niveau, departement, id_eleve){
    var response = {};
    await axios.get(`http://localhost:8000/api/notes/simuler-bulletin/${niveau}/${departement}/${id_eleve}`).then(res => response = res)
    return response;
}
