
export function getCourseFromId(courses, id){
    console.log(courses)
    for(var i = 0; i < courses.length; i++){
        if (courses[i].id == id) {
            console.log(courses[i]);
            return courses[i]
        };
    }
}

export function getStudentFromId(liste=[], id) {
    for (let i = 0; i < liste.length; i++) {
        if(liste[i].id == id) {
            return liste[i];
        }      
    }
}