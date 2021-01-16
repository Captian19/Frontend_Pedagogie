import React from "react"

const RoleItem = (props) => {
    return(
        <div class="item">
            <div class="item-heading row align-items-center mb-2">
                <h4 class="item-title col-12 col-md-6 col-lg-8 mb-2 mb-md-0">{props.role_type}</h4>
                <div class="item-meta col-12 col-md-6 col-lg-4 text-muted text-left text-md-right">{props.date_debut} - {props.date_fin}</div>
                                    
                </div>
                <div class="item-content">
                    <p>{props.classe} {props.departement}</p>
                </div>
        </div>
    )
}

export default RoleItem