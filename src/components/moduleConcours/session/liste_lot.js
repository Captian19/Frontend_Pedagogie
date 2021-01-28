import React, { useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import { Button } from 'primereact/button';
import { Link } from "react-router-dom";
// import ProductService from '../service/ProductService';
import {get_SessionsAll} from "../../../actions/moduleConcours/action_session"; // with import

import logo from '../../../assets/moduleConcours/img/blue.png';
import {connect} from "react-redux"; // with import

function Liste_Lot(props) {

    const [sessions, setSessions] = useState([])
    const [checkIf, setCheckIf] = useState(false)

    const getListeSession = () => {
        props.get_SessionsAll().then(res => {
            setSessions(res.data.results)
            setCheckIf(true)
        }).catch(error => console.log(error.response.data))
    }

    useEffect(() => {
        getListeSession();
    }, [])


    let rapports = [];

    if (checkIf){
        sessions.map(session => {
            rapports.push({ name: `Lots Session ${session.annee_session}`, id: 'id-dossier', annee: session.annee_session })
        })

    }


    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '600px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '480px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    // const productService = new ProductService();

    // useEffect(() => {
    //      getListeCand()
    // }, []);


    const productTemplate = (rapport) => {
        return (
            <div className="product-item">
                <div className="product-item-content">
                    <div className="p-mb-3">
                        <img src={logo} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rapport.name} className="product-image" />
                    </div>
                    <div>
                        <h4 className="p-mb-1">{rapport.name}</h4>
                        
                        <div className="car-buttons p-mt-5">
                            <Link to={"/scolarite/concours/lots_candidats/" + rapport.annee}>
                                <Button icon="pi pi-search" className="p-button p-button-rounded p-mr-2" />
                            </Link>
                            <Button icon="pi pi-trash" className="p-button-danger p-button-rounded p-mr-2" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="carousel-demo">
            <div className="card">
                <Carousel value={rapports} numVisible={3} numScroll={1} responsiveOptions={responsiveOptions} className="custom-carousel" circular
                    autoplayInterval={3000} itemTemplate={productTemplate} header />
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps,{get_SessionsAll})(Liste_Lot);