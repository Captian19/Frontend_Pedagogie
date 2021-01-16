import axios from 'axios';

export function convertIdCourseToLibelle(courses, id_course) {
    /**
     * Take the courses and the Id of the course as argument and return the libele of the course as response 
     */
    for (var i = 0; i < courses.length; i++) {
        if (courses[i]._id == id_course) return courses[i].libelle;
    }
}
export async function loadCourses(classe) {
    var response = [];
    await axios.get("http://localhost:8000/api/plannings/cours/" + classe, { baseURL: "http://127.0.0.1:8000/" }).then(res => response = res.data);
    return response;
}

export async function loadSeance(id_progression) {
    var response = [];
    await axios.get("http://localhost:8000/api/cahier/seances/" + id_progression + "/", { baseURL: "http://127.0.0.1:8000/" }).then(res => response = res.data);
    return response;
}

export async function loadSeanceAbsents(id_classe, id_eleve) {
    var response = [];
    await axios.get("http://localhost:8000/api/cahier/voirabsences/" + id_classe + "/" + id_eleve, { baseURL: "http://127.0.0.1:8000/" }).then(res =>
        response = res.data
    );
    return response;
}