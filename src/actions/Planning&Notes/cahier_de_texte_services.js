import axios from 'axios';

export async function saveCahier(id_planning, id_seance, cahierDeTexte) {
    var response = "";
    axios.put("http://localhost:8000/api/cahier/" + id_planning + "/" + id_seance +"/", cahierDeTexte).then(res => response = res.data);
    return response;
}

export async function loadProgressionsClasse(niveau, departement, annee) {
    var progressions = [];
    await axios.get("http://localhost:8000/api/cahier/progressions/classe/" + niveau + "/" + departement + "/" + annee).then(response => {
        progressions = response.data;
    });
    return progressions;
}


export async function loadProgressionsProf(id_prof) {
    var progressions = [];
    await axios.get("http://localhost:8000/api/cahier/progressions/prof/" + id_prof + "/").then(response => {
        console.log(progressions);
        progressions = response.data;
    });

    return progressions;
}

export async function updateProgression(id_progression, progression){
    var status = 400;
    try{
        await axios.put("http://localhost:8000/api/cahier/progression/" + id_progression + "/", {progression:progression}).then(response => status=response.status);
    }catch(e){console.log(e)}
    
    return status;
}

export async function liste_de_classe(classe, departement){
    var response = [];
    await axios.get("https://users-ent.herokuapp.com/api/auth/ETUDIANT/" + classe + "/" + departement + "/").then(res => {
        if (res.status < 400) response = res.data;
        else alert("Problème lors de la récupération de la liste de classe");
    })
    return response;

}

export async function anulerAbsenceEleve(id_planning, id_seance, id_eleve){
    var status = 400;
    await axios.delete("http://localhost:8000/api/cahier/annuler-absence-eleve/" + id_planning + "/" + id_seance + "/" + id_eleve).then(res => {
        if (res.status < 400) status = res.status;
        else alert("Problème lors de la récupération de la liste de classe");
    })
    return status;

}

export async function getUserRoleById(id_role){
    var response = {};
    await axios.get("https://users-ent.herokuapp.com/api/auth/users/user-role/" + id_role).then(res => response=res.data)
    // console.log(response);
    return response;
}