import axios from 'axios';

export function saveCahier(id_planning, id_seance, cahierDeTexte) {
    var response = "";
    axios.put("http://localhost:8000/api/cahier/" + id_planning + "/" + id_seance +"/", cahierDeTexte).then(res => response = res.data);
    return response;
}

export async function loadProgressions(id_classe) {
    var progressions = [];
    await axios.get("http://localhost:8000/api/cahier/progressions/classe/" + id_classe + "/").then(response => {
        progressions = JSON.parse(response.data);
    });
    return progressions;
}

export async function loadProgressionsProf(id_prof) {
    var progressions = [];
    await axios.get("http://localhost:8000/api/cahier/progressions/prof/" + "aaa" + "/").then(response => {
        console.log(progressions);
        progressions = response.data;
    });

    return progressions;
}