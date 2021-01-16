import axios from 'axios';

export function save(classe, dateDebut, dateFin, seances){
    /*
        Fuction for sending a new planning to the server
    */
    var response = "";
    const planning = {
        dateDebut: dateDebut,
        dateFin: dateFin,
        seances: seances,
        classe: classe,
    }
    console.log("Saving the  planning ...");
    console.log(planning);
    axios.post("http://localhost:8000/api/plannings/", planning).then(res => {
        response = res;
        console.log(res);
    })

    if(response.status > 400) return false;

    return planning;
}