import React, { useState, useEffect } from "react";
import axios from "axios";

import { CDataTable } from "@coreui/react";

import { connect } from "react-redux";




function Test(props) {
    useEffect(() => {
        // console.log("role", props.role);
        // console.log("user", props.user);
        refreshLists();
    }, []);

    
    let url_offre =
        props.role.departement == "GIT"
            ? `http://localhost:8000/api/stage/entreprises/immersion/`
            : `http://localhost:8000/api/stage/entreprises/`;

    const [entreprises, setEntreprises] = useState([]);
    const refreshLists = () => {
        axios.get(url_offre)
            .then((res) => {
                setEntreprises(res.data);
            })
            .catch((err) => console.log(err));
    };

    //A lier avec les utilisateurs en ligne
    const postuler = (donnees, postulant, slug_entreprise) => {
        donnees["eleve_postulant"] = postulant;
        console.log("donnees ", donnees);
        axios.post(`http://localhost:8000/api/stage/entreprises/immersion/postulants/${slug_entreprise}/`,donnees)
            .then((res) => {
                console.log("res.data", res.data);
                if (typeof res.data[0] == "string") {
                    alert(res.data);
                } else {
                    alert(`vous avez postulé pour l'entreprise ${slug_entreprise.split("-")[0]}`);
                }
            })
            .catch((e) => console.log(e));
    };

    return (
        <div style={{ fontWeight: "bold" }}>
            <div className="btn-lg btn-primary text-center">
                <h2>Offres de stage</h2>
            </div>
            {entreprises.length > 0 ? (
                <>
                    <CDataTable
                        items={entreprises}
                        fields={[
                            { key: "nom_entreprise", _style: { textAlign: "center" } },
                            { key: "adresse_entreprise", label: "Adresse" },
                           // "type_stage",
                            "telephone_entreprise",
                            "Actions",
                        ]}
                        tableFilter
                        itemsPerPageSelect
                        itemsPerPage={7}
                        hover
                        pagination
                        // onRowClick={(item) =>history.push(`/enseignant/entreprises/single/${item.slug}`) }

                        scopedSlots={{
                            // type_stage: (item) =>
                            //     item.type_stage == "Stage ouvrier" ? (
                            //         <td style={{ color: "blue" }}>{item.type_stage}</td>
                            //     ) : (
                            //             <td style={{ color: "red" }}>{item.type_stage}</td>
                            //         ),
                            Actions: (item) => (
                                <>
                                    {item !== "undefined" ? (
                                        <td>
                                            <button
                                                className="btn btn-pill btn-info"
                                                onClick={() => {postuler({}, props.role.id, item.slug);}}
                                                id={item.slug}
                                            >
                                                Postuler
                                             </button>
                                        </td>
                                    ) : null}
                                </>
                            ),
                        }}
                    />
                </>
            ) : (
                    <h3>Aucune Entreprise</h3>
                )}
        </div>
    );
}




const MapToState = (state) => ({
    role: state.auth.user.CurrentRoles[0],
    user: state.auth.user,
});

export default connect(MapToState, null)(Test);
