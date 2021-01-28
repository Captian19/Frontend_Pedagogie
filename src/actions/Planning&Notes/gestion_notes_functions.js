/**
 * A function for getting the prenom and the nom of a eleve from it's _is and the liste of the classe
 * @param {*} eleves 
 * @param {*} id 
 */
export function getPrenomNom(eleves, id) {
    for (let index = 0; index < eleves.length; index++) {
        const eleve = eleves[index];
        if (eleve.id == id) return eleve.user;
    }
}

export function getColor(value){  // danger, warning, success
    if (value < 33) return "danger";
    if (value < 66) return "warning";
    return "success";
}