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