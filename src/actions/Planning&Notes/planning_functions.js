import axios from 'axios';
import { url } from '../../constants/Planning&Notes/constants';

export function convertIdCourseToLibelle(courses, id_course) {
    /**
     * Take the courses and the Id of the course as argument and return the libele of the course as response 
     */
    for (var i = 0; i < courses.length; i++) {
        if (courses[i].id == id_course) return courses[i].nom;
    }
}
export function getProfFromId(profs, id_prof) {
    /**
     * Take the profs of the department and the Id of the prof as argument and return the corresponding prof 
     */
    for (var i = 0; i < profs.length; i++) {
        if (profs[i].id == id_prof) return profs[i].user.first_name + " " + profs[i].user.last_name;
    }
}
export async function loadCourses(classe, departement) {
    var response = [];
    const local = "http://127.0.0.1:8000/api/plannings/ECs/"
    // await axios.get(url + "EC/departement/" + departement + "/classe/" + classe, ).then(res => response = res.data);
    await axios.get(local, ).then(res => response = res.data);
    return response;
}

export async function loadProfs(departement){
    var response = [];
    await axios.get("https://users-ent.herokuapp.com/api/auth/ENSEIGNANT/" + departement +"/").then(res => {
        response = res.data;
    })
    return response;
}
export async function loadSeance(id_progression) {
    var response = [];
    await axios.get("http://localhost:8000/api/cahier/seances/" + id_progression + "/", { baseURL: "http://127.0.0.1:8000/" }).then(res => response = res.data);
    return response;
}

export async function loadSeanceAbsents(classe, departement, id_eleve) {
    var response = [];
    await axios.get("http://localhost:8000/api/cahier/voirabsences/" + classe + "/" + departement + "/"+ id_eleve, { baseURL: "http://127.0.0.1:8000/" }).then(res =>
        response = res.data
    );
    return response;
}