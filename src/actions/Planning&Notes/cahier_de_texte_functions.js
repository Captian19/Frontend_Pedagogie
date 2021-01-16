
export function getCourseFromId(courses, id){
    for(var i = 0; i < courses.length; i++){
        if (courses[i]._id == id) {
            console.log(courses[i]);
            return courses[i]
        };
    }
}

export function getStudentFromId(liste=[], id) {
    for (let i = 0; i < liste.length; i++) {
        if(liste[i]._id == id) {
            return liste[i];
        }      
    }
}